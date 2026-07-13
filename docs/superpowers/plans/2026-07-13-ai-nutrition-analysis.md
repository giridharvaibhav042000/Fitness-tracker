# AI Nutrition Analysis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an "AI Analyze" tab to the Nutrition page that accepts natural language meal descriptions, calls Gemini Flash to extract per-food macros, and logs them to the existing nutrition tracking system.

**Architecture:** A new `aiNutritionService.js` handles all Gemini API communication and JSON parsing. `Nutrition.jsx` gains a two-tab layout (Search / AI Analyze) with AI-specific state. No other files change — existing `nutritionService.js`, `useNutrition`, and `MacroBar` are reused as-is.

**Tech Stack:** React 19, Vitest 4, Gemini Flash (`gemini-2.0-flash`), Vite env vars

---

## File Map

| Action | File |
|--------|------|
| CREATE | `fitness-app/src/services/aiNutritionService.js` |
| CREATE | `fitness-app/src/services/__tests__/aiNutritionService.test.js` |
| MODIFY | `fitness-app/src/pages/Nutrition.jsx` |
| CREATE (user) | `fitness-app/.env.local` |

---

## Task 1: Env Setup

**Files:**
- Create: `fitness-app/.env.local` (user must create — gitignored)

- [ ] **Step 1: Verify `.env.local` is gitignored**

Check `fitness-app/.gitignore` contains `.env.local`. If missing, add it:
```
.env.local
```

- [ ] **Step 2: Create `.env.local` with Gemini key**

Get a free API key at aistudio.google.com → "Get API key".

Create `fitness-app/.env.local`:
```
VITE_GEMINI_API_KEY=paste_your_key_here
```

- [ ] **Step 3: Verify Vite picks up the key**

In any component temporarily add `console.log(import.meta.env.VITE_GEMINI_API_KEY)`, run `npm run dev`, check browser console shows the key. Remove the log line after confirming.

---

## Task 2: Create `aiNutritionService.js` with tests (TDD)

**Files:**
- Create: `fitness-app/src/services/aiNutritionService.js`
- Create: `fitness-app/src/services/__tests__/aiNutritionService.test.js`

- [ ] **Step 1: Write the failing tests first**

Create `fitness-app/src/services/__tests__/aiNutritionService.test.js`:

```js
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { analyzeText } from '../aiNutritionService'

const SAMPLE_FOODS = [
  { name: 'Chapati (2 piece)', protein: 6, carbs: 30, fats: 0.8, calories: 152, fiber: 2, sugar: 0, sodium: 180 },
  { name: 'Dal (1 cup cooked)', protein: 18, carbs: 40, fats: 0.8, calories: 230, fiber: 8, sugar: 2, sodium: 400 },
]

function mockFetch(responseBody, ok = true, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => responseBody,
  }))
}

function geminiResponse(text) {
  return { candidates: [{ content: { parts: [{ text }] } }] }
}

describe('aiNutritionService', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key-123')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  test('analyzeText returns parsed food array on valid response', async () => {
    mockFetch(geminiResponse(JSON.stringify(SAMPLE_FOODS)))
    const result = await analyzeText('2 chapatis and 1 bowl dal')
    expect(result).toEqual(SAMPLE_FOODS)
  })

  test('analyzeText strips markdown code fences from response', async () => {
    const wrapped = '```json\n' + JSON.stringify(SAMPLE_FOODS) + '\n```'
    mockFetch(geminiResponse(wrapped))
    const result = await analyzeText('2 chapatis and 1 bowl dal')
    expect(result).toEqual(SAMPLE_FOODS)
  })

  test('analyzeText includes API key in request URL', async () => {
    mockFetch(geminiResponse(JSON.stringify(SAMPLE_FOODS)))
    await analyzeText('chapati')
    const [url] = vi.mocked(fetch).mock.calls[0]
    expect(url).toContain('key=test-key-123')
  })

  test('analyzeText throws with status code on non-ok response', async () => {
    mockFetch({}, false, 401)
    await expect(analyzeText('chapati')).rejects.toThrow('401')
  })

  test('analyzeText throws on malformed JSON in response', async () => {
    mockFetch(geminiResponse('not valid json at all'))
    await expect(analyzeText('chapati')).rejects.toThrow()
  })
})
```

- [ ] **Step 2: Run tests — confirm all 5 fail**

```bash
cd fitness-app
npm test -- src/services/__tests__/aiNutritionService.test.js
```

Expected: 5 failures with "Cannot find module '../aiNutritionService'"

- [ ] **Step 3: Create `aiNutritionService.js`**

Create `fitness-app/src/services/aiNutritionService.js`:

```js
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

function buildPrompt(text) {
  return `Analyze this meal description and return ONLY a valid JSON array.
No markdown, no explanation — raw JSON only.

Meal: "${text}"

Required format (numbers only, no units inside values):
[
  {
    "name": "Food name with serving (e.g. Chapati 2 piece)",
    "protein": 6,
    "carbs": 30,
    "fats": 0.8,
    "calories": 152,
    "fiber": 2,
    "sugar": 0,
    "sodium": 180
  }
]

Use standard nutritional values per the serving size described.
Return one object per distinct food item.`
}

export async function analyzeText(text) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(text) }] }],
    }),
  })
  if (!res.ok) throw new Error(String(res.status))
  const data = await res.json()
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  const json = raw.replace(/```json?|```/g, '').trim()
  return JSON.parse(json)
}
```

- [ ] **Step 4: Run tests — confirm all 5 pass**

```bash
npm test -- src/services/__tests__/aiNutritionService.test.js
```

Expected output:
```
✓ analyzeText returns parsed food array on valid response
✓ analyzeText strips markdown code fences from response
✓ analyzeText includes API key in request URL
✓ analyzeText throws with status code on non-ok response
✓ analyzeText throws on malformed JSON in response

Test Files  1 passed (1)
Tests  5 passed (5)
```

- [ ] **Step 5: Commit**

```bash
git add fitness-app/src/services/aiNutritionService.js \
        fitness-app/src/services/__tests__/aiNutritionService.test.js
git commit -m "feat(nutrition): add Gemini-powered aiNutritionService"
```

---

## Task 3: Add AI Analyze tab to Nutrition.jsx

**Files:**
- Modify: `fitness-app/src/pages/Nutrition.jsx`

- [ ] **Step 1: Add import at top of Nutrition.jsx**

After line 3 (`import MacroBar from '../components/MacroBar'`), add:

```js
import { analyzeText } from '../services/aiNutritionService'
```

- [ ] **Step 2: Add tab + AI state inside the `Nutrition` component**

After the existing `const [planDay, setPlanDay] = useState(...)` declaration (around line 103), add:

```js
const [activeTab, setActiveTab]   = useState('search')
const [query, setQuery]           = useState('')
const [aiResults, setAiResults]   = useState([])
const [aiLoading, setAiLoading]   = useState(false)
const [aiError, setAiError]       = useState(null)
const [loggedFlash, setLoggedFlash] = useState(false)
```

- [ ] **Step 3: Add handler functions inside the component**

After the state declarations, add these two functions:

```js
async function handleAnalyze() {
  if (!query.trim() || aiLoading) return
  setAiLoading(true)
  setAiError(null)
  setAiResults([])
  setLoggedFlash(false)
  try {
    const foods = await analyzeText(query)
    setAiResults(foods)
  } catch (err) {
    const status = err.message
    if (!navigator.onLine) {
      setAiError("Can't reach Gemini — check connection")
    } else if (status === '401' || status === '403') {
      setAiError('API key invalid')
    } else if (status === '429') {
      setAiError('Too many requests — wait a moment and retry')
    } else {
      setAiError("Couldn't parse food data — try rephrasing")
    }
  } finally {
    setAiLoading(false)
  }
}

async function handleLogAll() {
  for (const food of aiResults) {
    await addMeal({
      meal_name: food.name,
      protein:   food.protein,
      carbs:     food.carbs,
      fats:      food.fats,
      calories:  food.calories,
    })
  }
  setAiResults([])
  setQuery('')
  setLoggedFlash(true)
  setTimeout(() => setLoggedFlash(false), 2000)
}
```

- [ ] **Step 4: Replace the search `<div>` with a tabbed section**

In the JSX, find and **replace** the existing search section (the `<div>` containing the `<input type="text">` with `placeholder="Search food..."` and the filtered results dropdown). Replace it entirely with:

```jsx
{/* ── Tab switcher ── */}
<div className="flex gap-2">
  {['search', 'ai'].map(tab => (
    <button
      key={tab}
      onClick={() => { setActiveTab(tab); setAiResults([]); setAiError(null); setSearch('') }}
      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
        activeTab === tab
          ? 'bg-gym text-black border-gym'
          : 'bg-surface border-line text-muted'
      }`}
    >
      {tab === 'search' ? 'Search Food' : '✦ AI Analyze'}
    </button>
  ))}
</div>

{/* ── Search tab ── */}
{activeTab === 'search' && (
  <div>
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search food..."
      className="w-full bg-card border border-line rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gym"
    />
    {filtered.length > 0 && (
      <div className="mt-2 bg-card border border-line rounded-xl overflow-hidden">
        {filtered.map(([name, macros]) => (
          <button key={name} onClick={() => handleAdd(name, macros)}
            className="w-full text-left px-4 py-3 border-b border-line last:border-0 hover:bg-surface">
            <p className="text-white text-sm">{name}</p>
            <p className="text-muted text-xs">P:{macros.protein}g C:{macros.carbs}g F:{macros.fats}g</p>
          </button>
        ))}
      </div>
    )}
  </div>
)}

{/* ── AI Analyze tab ── */}
{activeTab === 'ai' && (
  <div className="space-y-3">
    <textarea
      value={query}
      onChange={e => setQuery(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleAnalyze() }}
      placeholder="Describe your meal... e.g. 2 chapatis, 1 bowl dal, 1 glass milk"
      rows={3}
      disabled={aiLoading}
      className="w-full bg-card border border-line rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gym resize-none disabled:opacity-50"
    />
    <button
      onClick={handleAnalyze}
      disabled={aiLoading || !query.trim() || !navigator.onLine}
      className="w-full py-3 rounded-lg bg-gym text-black font-semibold text-sm disabled:opacity-40"
    >
      {aiLoading ? 'Analyzing...' : !navigator.onLine ? 'No connection' : 'Analyze →'}
    </button>

    {aiError && (
      <div className="bg-warn/10 border border-warn/30 rounded-xl px-4 py-3 flex items-center justify-between">
        <p className="text-warn text-sm">{aiError}</p>
        <button onClick={handleAnalyze} className="text-warn text-xs underline ml-3">Retry</button>
      </div>
    )}

    {loggedFlash && (
      <p className="text-gym text-sm text-center font-semibold">✓ Meals logged</p>
    )}

    {aiResults.length > 0 && (
      <div className="space-y-2">
        {aiResults.map((food, i) => (
          <div key={i} className="bg-card border border-line rounded-xl p-3">
            <p className="text-white text-sm font-semibold">{food.name}</p>
            <p className="text-gym text-xs mt-0.5">
              P {food.protein}g · C {food.carbs}g · F {food.fats}g · {food.calories} kcal
            </p>
            <p className="text-muted text-xs mt-0.5">
              Fiber {food.fiber ?? '—'}g · Sugar {food.sugar ?? '—'}g · Sodium {food.sodium ?? '—'}mg
            </p>
          </div>
        ))}
        <button
          onClick={handleLogAll}
          className="w-full py-3 rounded-lg bg-cali/20 border border-cali/40 text-cali font-semibold text-sm"
        >
          Log All Meals
        </button>
      </div>
    )}
  </div>
)}
```

- [ ] **Step 5: Run the full test suite to check for regressions**

```bash
cd fitness-app
npm test
```

Expected: all pre-existing tests still pass. The new `aiNutritionService` tests pass. No failures.

- [ ] **Step 6: Commit**

```bash
git add fitness-app/src/pages/Nutrition.jsx
git commit -m "feat(nutrition): add AI Analyze tab with Gemini macro analysis"
```

---

## Task 4: Manual Verification

- [ ] **Step 1: Start dev server**

```bash
cd fitness-app
npm run dev
```

Open `http://localhost:5173` and log in.

- [ ] **Step 2: Navigate to Nutrition page**

Confirm two tabs appear: "Search Food" and "✦ AI Analyze". Existing Search tab should work exactly as before.

- [ ] **Step 3: Test AI Analyze tab — happy path**

Click "✦ AI Analyze". Type:
```
2 chapatis, 1 bowl dal, 1 glass milk
```
Click "Analyze →". Within 2-4 seconds, 3 food cards appear with macros and micros. Click "Log All Meals". Cards clear, "✓ Meals logged" flashes. Macro bars at top update to reflect the logged totals.

- [ ] **Step 4: Test error state**

Temporarily set an invalid key in `.env.local` (`VITE_GEMINI_API_KEY=bad`), restart dev server, try Analyze. Expect red error card with "API key invalid". Restore the real key and restart.

- [ ] **Step 5: Commit verification note**

```bash
git commit --allow-empty -m "chore: verify AI nutrition tab working end-to-end"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|-----------------|------|
| Natural language text input | Task 3 Step 4 (textarea) |
| Gemini Flash API call | Task 2 Step 3 |
| Per-food macro cards (P/C/F/calories) | Task 3 Step 4 |
| Per-food micro preview (fiber/sugar/sodium) | Task 3 Step 4 |
| Log All → nutritionService.logMeal() | Task 3 Step 3 (handleLogAll) |
| MacroBar updates after log | Task 3 Step 4 (useNutrition reacts) |
| Offline button disabled | Task 3 Step 4 (disabled attr) |
| Network error message | Task 3 Step 3 (handleAnalyze) |
| 429 rate limit message | Task 3 Step 3 (handleAnalyze) |
| Markdown fence stripping | Task 2 Step 3 (regex replace) |
| No schema changes | All tasks — only nutritionService.logMeal called |
| Single env var VITE_GEMINI_API_KEY | Task 1 |
