# AI Nutrition Analysis — Design Spec
**Date:** 2026-07-13  
**Status:** Approved  
**Scope:** Nutrition page — new "AI Analyze" tab using Gemini Flash API

---

## Goal

Allow users to describe a meal in natural language ("2 chapatis, 1 bowl dal, 1 glass milk") and receive a full macro breakdown per food item, which they can log to their daily totals with one tap.

---

## API Choice: Gemini Flash (Google AI Studio)

- **Model:** `gemini-2.0-flash`
- **Endpoint:** `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY`
- **Auth:** single `VITE_GEMINI_API_KEY` in `.env.local`
- **Free tier:** 1,500 requests/day, 15 RPM — more than enough for personal use
- **Sign up:** aistudio.google.com → Get API key (instant, free)
- **Accuracy note:** LLM estimation based on training data, not a food database. Values are reliable for common foods (chapati, dal, rice, chicken) but may vary slightly from exact lab measurements. Acceptable for personal macro tracking.

> **Why not Nutritionix:** Free personal-use tier unavailable. Gemini is the best free alternative with a generous daily limit.

---

## Architecture

### Integration approach: Client-side direct call

React calls Gemini API directly from the browser with a structured prompt that forces JSON output. No backend proxy needed. Fits the existing PWA architecture (app already calls Supabase from client).

API key exposure risk: Gemini free-tier keys are rate-limited at 15 RPM / 1500 req/day — limits abuse potential. Acceptable for personal PWA.

### New files

| File | Purpose |
|------|---------|
| `src/services/aiNutritionService.js` | Wraps Gemini API call, parses JSON response, normalizes output |
| `.env.local` | Holds `VITE_GEMINI_API_KEY` (gitignored) |

### Modified files

| File | Change |
|------|--------|
| `src/pages/Nutrition.jsx` | Add tab switcher state + AI Analyze tab UI |

**No changes** to `nutritionService.js`, `useNutrition.js`, `nutrition.js`, `MacroBar.jsx`, or Supabase schema.

---

## Data Flow

```
User types: "2 chapatis 1 bowl dal 1 glass milk"
  → aiNutritionService.analyzeText(text)
  → POST Gemini API with structured JSON prompt
  → Gemini returns JSON array of food objects
  → parse + normalize to { name, protein, carbs, fats, calories, fiber, sugar, sodium }
  → render food cards (macro + micro preview)
  → user taps "Log All"
  → nutritionService.logMeal() called per food (protein/carbs/fats/calories only)
  → useNutrition totals recompute → MacroBar re-renders
```

---

## Service: `aiNutritionService.js`

```js
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const PROMPT_TEMPLATE = (text) => `
Analyze this meal description and return ONLY a valid JSON array.
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
Return one object per distinct food item.
`

export async function analyzeText(text) {
  const res = await fetch(
    `${GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: PROMPT_TEMPLATE(text) }] }],
      }),
    }
  )
  if (!res.ok) throw new Error(res.status)
  const data = await res.json()
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  // Strip markdown code fences if Gemini wraps the JSON
  const json = raw.replace(/```json?|```/g, '').trim()
  return JSON.parse(json)
}
```

---

## UI: Nutrition Page Tab Structure

```
[ Search ] [ AI Analyze ]    ← tab switcher (existing Search tab unchanged)

AI Analyze tab:
┌─────────────────────────────────────────┐
│ textarea: "I ate 2 chapatis, dal..."    │
│                          [Analyze →]   │
└─────────────────────────────────────────┘

Results (one card per food):
┌─────────────────────────────────────────┐
│ Chapati (2 piece)                       │
│ P 6g · C 30g · F 0.8g · 152 kcal      │
│ Fiber 2g · Sugar 0g · Sodium 180mg     │
└─────────────────────────────────────────┘

               [ Log All Meals ]
```

---

## UI States

| State | Behaviour |
|-------|-----------|
| Idle | Empty textarea, Analyze button enabled |
| Loading | Button shows spinner, textarea disabled |
| Results | Food cards rendered + Log All button |
| Logged | Cards clear, macro bars update, success flash |
| API error | Inline red message + Retry button |
| Offline | Analyze button disabled, "No connection" label |

---

## Error Handling

| Scenario | Message shown |
|----------|---------------|
| Network failure | "Can't reach Gemini — check connection" |
| JSON parse failure | "Couldn't parse food data — try rephrasing" |
| 401 / 403 bad key | "API key invalid" (dev-facing only) |
| 429 rate limited | "Too many requests — wait a moment and retry" |
| Offline (`!navigator.onLine`) | Button disabled, label shown |

---

## Data Storage Decision

Gemini returns fiber, sugar, and sodium per food item. These are shown in the result card preview but **not persisted** to the meal log.

Meal log entries store: `protein`, `carbs`, `fats`, `calories` only — matching the existing `nutritionService` schema. No schema migration required.

---

## Env Setup (user does once)

```
# .env.local (gitignored)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Get key free at: aistudio.google.com → Get API key

---

## Out of Scope

- Photo/image food analysis
- Storing micronutrients (fiber, sugar, sodium) in the log
- Backend proxy for API key
- Barcode scanning
- Switching back to Nutritionix (revisit if personal free tier becomes available)
