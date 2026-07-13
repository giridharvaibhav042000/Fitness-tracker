# Manual Macro Entry + Weekly Nutrition Analysis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Manual" macro entry tab to the Nutrition page and a `WeeklyNutritionSummary` component showing 7-day totals with cards and a summary table.

**Architecture:** `getWeekLogs()` added to `nutritionService.js` aggregates localStorage logs by date for the current Mon–Sun week. `WeeklyNutritionSummary.jsx` reads this data and renders day-tab cards + totals table. `Nutrition.jsx` gains a 3rd "Manual" tab with a P/C/F form and renders `WeeklyNutritionSummary` below Today's Meals.

**Tech Stack:** React 19, Vitest 4, @testing-library/react, localStorage, Tailwind CSS

---

## File Map

| Action | File |
|--------|------|
| MODIFY | `fitness-app/src/services/nutritionService.js` |
| CREATE | `fitness-app/src/services/__tests__/nutritionService.test.js` |
| CREATE | `fitness-app/src/components/WeeklyNutritionSummary.jsx` |
| CREATE | `fitness-app/src/components/__tests__/WeeklyNutritionSummary.test.jsx` |
| MODIFY | `fitness-app/src/pages/Nutrition.jsx` |

---

## Task 1: Add `getWeekLogs()` to nutritionService with tests (TDD)

**Files:**
- Modify: `fitness-app/src/services/nutritionService.js`
- Create: `fitness-app/src/services/__tests__/nutritionService.test.js`

- [ ] **Step 1: Write the failing tests**

Create `fitness-app/src/services/__tests__/nutritionService.test.js`:

```js
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { getWeekLogs } from '../nutritionService'

vi.mock('../supabase')

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

function mondayKey() {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  return monday.toISOString().split('T')[0]
}

describe('getWeekLogs', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('returns empty object when no logs exist', () => {
    expect(getWeekLogs()).toEqual({})
  })

  test('aggregates multiple logs on same day', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 30, carbs: 50, fats: 10, calories: 410 },
      { id: '2', date: key, protein: 20, carbs: 30, fats: 5,  calories: 245 },
    ]))
    const result = getWeekLogs()
    expect(result[key]).toEqual({ protein: 50, carbs: 80, fats: 15, calories: 655 })
  })

  test('omits days with no logs', () => {
    const key = mondayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 30, carbs: 50, fats: 10, calories: 410 },
    ]))
    const result = getWeekLogs()
    expect(Object.keys(result)).toHaveLength(1)
    expect(result[key]).toBeDefined()
  })

  test('ignores logs from outside current week', () => {
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: '2020-01-01', protein: 100, carbs: 200, fats: 50, calories: 1650 },
    ]))
    expect(getWeekLogs()).toEqual({})
  })

  test('returns all 7 possible dates in current week when all have data', () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
    const logs = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return { id: String(i), date: d.toISOString().split('T')[0], protein: 10, carbs: 20, fats: 5, calories: 165 }
    })
    localStorage.setItem('nutritionLogs', JSON.stringify(logs))
    expect(Object.keys(getWeekLogs())).toHaveLength(7)
  })
})
```

- [ ] **Step 2: Run tests — confirm all 5 fail**

```bash
cd "C:\Users\Kilowott\Downloads\fitness copy\fitness copy\fitness--development\fitness-app"
npx vitest run src/services/__tests__/nutritionService.test.js
```

Expected: 5 failures with "getWeekLogs is not a function"

- [ ] **Step 3: Add `getWeekLogs` to `nutritionService.js`**

Open `fitness-app/src/services/nutritionService.js` and add this function at the end of the file:

```js
export function getWeekLogs() {
  const all = JSON.parse(localStorage.getItem('nutritionLogs') || '[]')
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  const week = {}
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = d.toISOString().split('T')[0]
    const logs = all.filter(l => l.date === key)
    if (logs.length) {
      week[key] = logs.reduce(
        (acc, l) => ({
          protein:  acc.protein  + l.protein,
          carbs:    acc.carbs    + l.carbs,
          fats:     acc.fats     + l.fats,
          calories: acc.calories + l.calories,
        }),
        { protein: 0, carbs: 0, fats: 0, calories: 0 }
      )
    }
  }
  return week
}
```

- [ ] **Step 4: Run tests — confirm all 5 pass**

```bash
npx vitest run src/services/__tests__/nutritionService.test.js
```

Expected:
```
✓ returns empty object when no logs exist
✓ aggregates multiple logs on same day
✓ omits days with no logs
✓ ignores logs from outside current week
✓ returns all 7 possible dates in current week when all have data

Test Files  1 passed (1)
Tests  5 passed (5)
```

- [ ] **Step 5: Commit**

```bash
git add fitness-app/src/services/nutritionService.js \
        fitness-app/src/services/__tests__/nutritionService.test.js
git commit -m "feat(nutrition): add getWeekLogs to nutritionService"
```

---

## Task 2: Create `WeeklyNutritionSummary` component with tests (TDD)

**Files:**
- Create: `fitness-app/src/components/WeeklyNutritionSummary.jsx`
- Create: `fitness-app/src/components/__tests__/WeeklyNutritionSummary.test.jsx`

- [ ] **Step 1: Write the failing tests**

Create `fitness-app/src/components/__tests__/WeeklyNutritionSummary.test.jsx`:

```jsx
import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import WeeklyNutritionSummary from '../WeeklyNutritionSummary'

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

describe('WeeklyNutritionSummary', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders 7 day tabs', () => {
    render(<WeeklyNutritionSummary />)
    ;['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  test('shows "No meals logged" when selected day has no data', () => {
    localStorage.clear()
    render(<WeeklyNutritionSummary />)
    expect(screen.getByText('No meals logged this day.')).toBeInTheDocument()
  })

  test('shows correct totals for a day with logs', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 50, carbs: 80, fats: 15, calories: 655 },
    ]))
    render(<WeeklyNutritionSummary />)
    expect(screen.getByText('655 kcal')).toBeInTheDocument()
    expect(screen.getByText('50/125g')).toBeInTheDocument()
  })

  test('shows check mark when macro meets target', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 130, carbs: 250, fats: 75, calories: 2515 },
    ]))
    render(<WeeklyNutritionSummary />)
    // protein target is 125g, 130 >= 125 → ✓ appears
    expect(screen.getAllByText(/✓/).length).toBeGreaterThan(0)
  })

  test('avg row excluded when no days have logs', () => {
    render(<WeeklyNutritionSummary />)
    expect(screen.queryByText('Avg')).not.toBeInTheDocument()
  })

  test('avg row appears when at least one day has logs', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 100, carbs: 200, fats: 60, calories: 1740 },
    ]))
    render(<WeeklyNutritionSummary />)
    expect(screen.getByText('Avg')).toBeInTheDocument()
  })

  test('clicking a day tab changes selected day card', () => {
    render(<WeeklyNutritionSummary />)
    const tabs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    // Click a different tab and verify the card date label changes
    fireEvent.click(screen.getByText(tabs[0]))
    expect(screen.getByText(/Mon ·/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — confirm all 7 fail**

```bash
npx vitest run src/components/__tests__/WeeklyNutritionSummary.test.jsx
```

Expected: 7 failures with "Cannot find module '../WeeklyNutritionSummary'"

- [ ] **Step 3: Create `WeeklyNutritionSummary.jsx`**

Create `fitness-app/src/components/WeeklyNutritionSummary.jsx`:

```jsx
import { useState } from 'react'
import { getWeekLogs } from '../services/nutritionService'
import { MACRO_TARGETS } from '../data/nutrition'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getWeekDates() {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.toISOString().split('T')[0]
  })
}

function todayDayIndex() {
  return (new Date().getDay() + 6) % 7
}

function MacroRow({ label, current, target }) {
  const pct = Math.min(100, Math.round((current / target) * 100))
  const met = current >= target
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-soft">{label}</span>
        <span className={met ? 'text-gym font-semibold' : 'text-muted'}>
          {current}/{target}g {met ? '✓' : ''}
        </span>
      </div>
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <div className="h-full bg-gym rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function WeeklyNutritionSummary() {
  const weekDates = getWeekDates()
  const weekLogs  = getWeekLogs()
  const [selectedDay, setSelectedDay] = useState(todayDayIndex())

  const selectedDate = weekDates[selectedDay]
  const selectedData = weekLogs[selectedDate]

  const loggedDays = weekDates.filter(d => weekLogs[d])
  const avg = loggedDays.length
    ? (() => {
        const sum = loggedDays.reduce(
          (acc, d) => ({
            protein:  acc.protein  + weekLogs[d].protein,
            carbs:    acc.carbs    + weekLogs[d].carbs,
            fats:     acc.fats     + weekLogs[d].fats,
            calories: acc.calories + weekLogs[d].calories,
          }),
          { protein: 0, carbs: 0, fats: 0, calories: 0 }
        )
        const n = loggedDays.length
        return {
          protein:  Math.round(sum.protein  / n),
          carbs:    Math.round(sum.carbs    / n),
          fats:     Math.round(sum.fats     / n),
          calories: Math.round(sum.calories / n),
        }
      })()
    : null

  return (
    <div className="bg-card border border-line rounded-xl p-4 space-y-4">
      <h2 className="text-soft text-xs font-semibold uppercase tracking-wider">Weekly Nutrition Analysis</h2>

      {/* Day tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {DAY_NAMES.map((name, i) => (
          <button
            key={name}
            onClick={() => setSelectedDay(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              selectedDay === i
                ? 'bg-gym text-black border-gym'
                : weekLogs[weekDates[i]]
                  ? 'bg-surface border-gym/40 text-gym'
                  : 'bg-surface border-line text-muted'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Selected day card */}
      <div className="bg-surface border border-line rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-semibold">
            {DAY_NAMES[selectedDay]} · {selectedDate}
          </p>
          {selectedData && (
            <p className="text-muted text-xs font-mono">{Math.round(selectedData.calories)} kcal</p>
          )}
        </div>
        {selectedData ? (
          <div className="space-y-2">
            <MacroRow label="Protein" current={Math.round(selectedData.protein)} target={MACRO_TARGETS.protein} />
            <MacroRow label="Carbs"   current={Math.round(selectedData.carbs)}   target={MACRO_TARGETS.carbs}   />
            <MacroRow label="Fats"    current={Math.round(selectedData.fats)}    target={MACRO_TARGETS.fats}    />
          </div>
        ) : (
          <p className="text-muted text-xs">No meals logged this day.</p>
        )}
      </div>

      {/* Totals table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted">
              <th className="text-left py-1 pr-3 font-normal">Day</th>
              <th className="text-right py-1 px-2 font-normal">P(g)</th>
              <th className="text-right py-1 px-2 font-normal">C(g)</th>
              <th className="text-right py-1 px-2 font-normal">F(g)</th>
              <th className="text-right py-1 pl-2 font-normal">kcal</th>
            </tr>
          </thead>
          <tbody>
            {weekDates.map((date, i) => {
              const d = weekLogs[date]
              return (
                <tr
                  key={date}
                  className={`border-t border-line/50 ${selectedDay === i ? 'text-white' : 'text-soft'}`}
                >
                  <td className="py-1 pr-3">{DAY_NAMES[i]}</td>
                  <td className="text-right py-1 px-2">{d ? Math.round(d.protein)  : '—'}</td>
                  <td className="text-right py-1 px-2">{d ? Math.round(d.carbs)    : '—'}</td>
                  <td className="text-right py-1 px-2">{d ? Math.round(d.fats)     : '—'}</td>
                  <td className="text-right py-1 pl-2">{d ? Math.round(d.calories) : '—'}</td>
                </tr>
              )
            })}
            {avg && (
              <tr className="border-t-2 border-gym/40 text-gym font-semibold">
                <td className="py-1 pr-3">Avg</td>
                <td className="text-right py-1 px-2">{avg.protein}</td>
                <td className="text-right py-1 px-2">{avg.carbs}</td>
                <td className="text-right py-1 px-2">{avg.fats}</td>
                <td className="text-right py-1 pl-2">{avg.calories}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — confirm all 7 pass**

```bash
npx vitest run src/components/__tests__/WeeklyNutritionSummary.test.jsx
```

Expected:
```
✓ renders 7 day tabs
✓ shows "No meals logged" when selected day has no data
✓ shows correct totals for a day with logs
✓ shows check mark when macro meets target
✓ avg row excluded when no days have logs
✓ avg row appears when at least one day has logs
✓ clicking a day tab changes selected day card

Test Files  1 passed (1)
Tests  7 passed (7)
```

- [ ] **Step 5: Commit**

```bash
git add fitness-app/src/components/WeeklyNutritionSummary.jsx \
        fitness-app/src/components/__tests__/WeeklyNutritionSummary.test.jsx
git commit -m "feat(nutrition): add WeeklyNutritionSummary component"
```

---

## Task 3: Add Manual tab + integrate WeeklyNutritionSummary into Nutrition.jsx

**Files:**
- Modify: `fitness-app/src/pages/Nutrition.jsx`

- [ ] **Step 1: Add import at top of Nutrition.jsx**

After the existing imports (after `import MacroBar` and `import { analyzeText }`), add:

```js
import WeeklyNutritionSummary from '../components/WeeklyNutritionSummary'
```

- [ ] **Step 2: Add manual entry state inside the component**

After the existing `const [loggedFlash, setLoggedFlash] = useState(false)` line, add:

```js
const [manualLabel, setManualLabel] = useState('')
const [manualP, setManualP]         = useState('')
const [manualC, setManualC]         = useState('')
const [manualF, setManualF]         = useState('')
```

- [ ] **Step 3: Add `handleManualLog` function**

After the existing `handleLogAll` function, add:

```js
async function handleManualLog() {
  const p = parseFloat(manualP) || 0
  const c = parseFloat(manualC) || 0
  const f = parseFloat(manualF) || 0
  await addMeal({
    meal_name: manualLabel.trim() || 'Manual Entry',
    protein:   p,
    carbs:     c,
    fats:      f,
    calories:  Math.round(p * 4 + c * 4 + f * 9),
  })
  setManualLabel('')
  setManualP('')
  setManualC('')
  setManualF('')
}
```

- [ ] **Step 4: Update tab switcher to include Manual tab**

Find the tab switcher array `['search', 'ai']` and replace with `['search', 'ai', 'manual']`. Also update the button label logic:

```jsx
<div className="flex gap-2">
  {['search', 'ai', 'manual'].map(tab => (
    <button
      key={tab}
      onClick={() => { setActiveTab(tab); setAiResults([]); setAiError(null); setSearch('') }}
      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
        activeTab === tab
          ? 'bg-gym text-black border-gym'
          : 'bg-surface border-line text-muted'
      }`}
    >
      {tab === 'search' ? 'Search' : tab === 'ai' ? '✦ AI' : '✎ Manual'}
    </button>
  ))}
</div>
```

- [ ] **Step 5: Add Manual tab JSX**

After the closing `}` of the AI tab section (`{activeTab === 'ai' && (...)}`) and before the Today's Meals section, add:

```jsx
{/* ── Manual tab ── */}
{activeTab === 'manual' && (
  <div className="space-y-3">
    <div>
      <label className="text-soft text-xs mb-1 block">Label (optional)</label>
      <input
        type="text"
        value={manualLabel}
        onChange={e => setManualLabel(e.target.value)}
        placeholder="e.g. Lunch, Post-workout"
        className="w-full bg-card border border-line rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gym"
      />
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: 'Protein (g)', value: manualP, set: setManualP },
        { label: 'Carbs (g)',   value: manualC, set: setManualC },
        { label: 'Fats (g)',    value: manualF, set: setManualF },
      ].map(({ label, value, set }) => (
        <div key={label}>
          <label className="text-soft text-xs mb-1 block">{label}</label>
          <input
            type="number"
            min="0"
            value={value}
            onChange={e => set(e.target.value)}
            className="w-full bg-card border border-line rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-gym"
          />
        </div>
      ))}
    </div>
    <p className="text-muted text-xs text-right">
      Calories: {Math.round(
        (parseFloat(manualP) || 0) * 4 +
        (parseFloat(manualC) || 0) * 4 +
        (parseFloat(manualF) || 0) * 9
      )} kcal
    </p>
    <button
      onClick={handleManualLog}
      disabled={(parseFloat(manualP) || 0) + (parseFloat(manualC) || 0) + (parseFloat(manualF) || 0) === 0}
      className="w-full py-3 rounded-lg bg-gym text-black font-semibold text-sm disabled:opacity-40"
    >
      Log Macros
    </button>
  </div>
)}
```

- [ ] **Step 6: Add WeeklyNutritionSummary below Today's Meals section**

Find the closing `</div>` of the Today's Meals section (the `<div className="space-y-2">` block containing `h2 "Today's Meals"` and the meals list). After it, add:

```jsx
<WeeklyNutritionSummary />
```

- [ ] **Step 7: Run full test suite — confirm no regressions**

```bash
npx vitest run
```

Expected: all test files pass, total ≥ 30 tests (23 existing + 5 nutritionService + 7 WeeklyNutritionSummary).

- [ ] **Step 8: Commit**

```bash
git add fitness-app/src/pages/Nutrition.jsx
git commit -m "feat(nutrition): add Manual tab and WeeklyNutritionSummary to Nutrition page"
```

---

## Task 4: Manual Verification

- [ ] **Step 1: Start dev server**

```bash
cd fitness-app && npm run dev
```

Open `http://localhost:5173`, log in, navigate to Nutrition page.

- [ ] **Step 2: Verify 3 tabs appear**

Confirm tabs read: `Search` | `✦ AI` | `✎ Manual`

- [ ] **Step 3: Test Manual tab — happy path**

Click `✎ Manual`. Type `Lunch` in Label. Enter `42` Protein, `65` Carbs, `18` Fats. Verify calories preview shows `594 kcal`. Click `Log Macros`. Confirm fields reset to empty and MacroBar totals update.

- [ ] **Step 4: Test disabled state**

With all macro fields at 0 (or empty), verify `Log Macros` button is disabled (dimmed, not clickable).

- [ ] **Step 5: Test Weekly Analysis section**

Scroll down past Today's Meals. Confirm `Weekly Nutrition Analysis` card appears with 7 day tabs. Today's tab should be selected. If you just logged a meal, today's card should show the totals. Confirm Avg row appears. Click other day tabs to verify they show `—` in the table and "No meals logged this day." in the card.

---

## Spec Coverage Check

| Spec requirement | Task |
|-----------------|------|
| 3rd "Manual" tab on Nutrition page | Task 3 Step 4 |
| Label (optional) text input | Task 3 Step 5 |
| Protein/Carbs/Fats number inputs (min 0) | Task 3 Step 5 |
| Calories auto-calculated live | Task 3 Step 5 |
| Empty label → "Manual Entry" | Task 3 Step 3 (handleManualLog) |
| Log disabled when P+C+F = 0 | Task 3 Step 5 |
| Fields reset after submit | Task 3 Step 3 (handleManualLog) |
| MacroBar updates after log | Task 3 Step 3 (addMeal → useNutrition) |
| getWeekLogs() groups by Mon–Sun | Task 1 Step 3 |
| getWeekLogs() omits empty days | Task 1 Step 3 + tests |
| getWeekLogs() ignores past weeks | Task 1 tests |
| 7 day tabs Mon–Sun | Task 2 Step 3 |
| Selected day card with macro progress bars | Task 2 Step 3 |
| ✓ badge when macro ≥ target | Task 2 Step 3 (MacroRow) |
| "No meals logged" for empty days | Task 2 Step 3 |
| Weekly totals table with — for empty days | Task 2 Step 3 |
| Avg row excludes zero-log days | Task 2 Step 3 |
| WeeklyNutritionSummary rendered below Today's Meals | Task 3 Step 6 |
