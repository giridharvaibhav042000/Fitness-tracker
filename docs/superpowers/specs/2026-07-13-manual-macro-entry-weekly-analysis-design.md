# Manual Macro Entry + Weekly Nutrition Analysis — Design Spec
**Date:** 2026-07-13  
**Status:** Approved  
**Scope:** Nutrition page — new "Manual" tab for direct macro entry + `WeeklyNutritionSummary` component for 7-day analysis

---

## Goal

1. Allow users to log macros directly by typing protein/carbs/fats + an optional meal label (no food search, no AI required).
2. Show a weekly nutritional analysis: per-day macro cards with target indicators + a summary totals table with averages.

---

## Architecture

### Approach: 3rd tab + extracted weekly component (Option B)

Manual entry is a 3rd tab on the existing Nutrition page. Weekly analysis lives in a new `WeeklyNutritionSummary` component rendered below Today's Meals. No new routes, no nav changes.

### New files

| File | Purpose |
|------|---------|
| `src/components/WeeklyNutritionSummary.jsx` | 7-day cards + totals table, reads from localStorage via `getWeekLogs()` |

### Modified files

| File | Change |
|------|--------|
| `src/services/nutritionService.js` | Add `getWeekLogs()` function |
| `src/pages/Nutrition.jsx` | Add "Manual" 3rd tab; import + render `WeeklyNutritionSummary` |

**No changes** to `useNutrition`, `MacroBar`, `nutrition.js`, or Supabase schema.

---

## Data Flow

### Manual entry
```
User fills: label (optional) + protein + carbs + fats
  → calories auto-calc: protein×4 + carbs×4 + fats×9 (live preview)
  → submit → nutritionService.logMeal() [existing function]
  → useNutrition totals update → MacroBar re-renders
  → form fields reset
```

### Weekly analysis
```
WeeklyNutritionSummary mounts (or user navigates to Nutrition page)
  → nutritionService.getWeekLogs() reads localStorage
  → groups + sums logs by date for Mon–Sun of current week
  → returns { 'YYYY-MM-DD': { protein, carbs, fats, calories } }
  → renders 7 day-tab cards + totals table + avg row
```

---

## `getWeekLogs()` — nutritionService.js addition

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

Returns `{ 'YYYY-MM-DD': { protein, carbs, fats, calories } }`.  
Days with no logs are omitted from the result (not included as zero-rows).

---

## Manual Entry Tab UI

### Tab bar (3 tabs)
```
[ Search Food ] [ ✦ AI Analyze ] [ ✎ Manual ]
```

### Form layout
```
Label (optional)
[ Lunch                                     ]

Protein (g)    Carbs (g)      Fats (g)
[    42     ]  [    65     ]  [    18     ]

Calories: 594 kcal  ← auto-calculated, read-only

             [ Log Macros ]
```

### Behaviour
- Protein, Carbs, Fats: `<input type="number" min="0">` — browser prevents negatives
- Calories display: `protein*4 + carbs*4 + fats*9`, updates on every keystroke
- Label defaults to empty string; stored as `"Manual Entry"` if blank at submit
- Log button disabled when `protein + carbs + fats === 0`
- On submit: calls `nutritionService.logMeal()` → resets all fields to 0/empty → MacroBar updates
- No async loading state needed (localStorage write is synchronous)

---

## WeeklyNutritionSummary Component

### Layout
```
── Weekly Nutrition Analysis ──────────────

[ Mon ] [ Tue ] [ Wed ] [ Thu ] [ Fri ] [ Sat ] [ Sun ]
         ↑ selected — shows expanded card below

┌─────────────────────────────────────────┐
│ Monday · Jul 7                          │
│ P 142g · C 230g · F 68g · 2108 kcal   │
│ ████████████░░  Protein   142/125g  ✓  │
│ ██████████░░░░  Carbs     230/240g     │
│ ████████░░░░░░  Fats       68/70g      │
└─────────────────────────────────────────┘

── Week Totals ────────────────────────────
        P(g)   C(g)   F(g)   kcal
Mon      142    230     68   2108
Tue      118    195     55   1739
Wed        —      —      —      —   ← no logs
Thu       ...
Fri       ...
Sat       ...
Sun       ...
──────────────────────────────────────────
Avg      130    212     61   1947   ← excludes zero-log days
```

### Behaviour
- Day tabs default to today's weekday
- Days with no logs: card shows "No meals logged this day"; table shows `—`
- Target indicators use `MACRO_TARGETS` from `nutrition.js` (protein 125g, carbs 240g, fats 70g)
- ✓ badge on progress bar label when day total ≥ target
- Progress bar width capped at 100% (no overflow)
- Avg row: sum of logged days ÷ count of logged days (days with no logs excluded)
- Week is Mon–Sun of the current calendar week
- Data reads from localStorage only — instant, offline-safe, no Supabase call

---

## Testing

### `nutritionService.getWeekLogs()` — unit tests
- Returns empty object when no logs in localStorage
- Returns only current week's logs (ignores past weeks)
- Correctly sums multiple logs on the same date
- Days with no logs are omitted from result

### `WeeklyNutritionSummary` — component tests
- Renders 7 day tabs
- Shows "No meals logged" for empty days
- Displays correct totals for a day with logs
- Avg row excludes zero-log days
- ✓ badge appears when macro meets target

### Manual tab — component tests
- Calories auto-calculate from P/C/F inputs
- Log button disabled when all fields are 0
- Fields reset after submit
- Empty label submits as "Manual Entry"

---

## Out of Scope

- Historical weeks navigation (current week only)
- Charts or graphs
- Exporting weekly data
- Per-meal breakdown in the weekly view (day totals only)
- Editing or deleting individual logged entries from weekly view
