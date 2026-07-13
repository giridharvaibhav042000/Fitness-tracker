# AI Nutrition Analysis — Design Spec
**Date:** 2026-07-13  
**Status:** Approved  
**Scope:** Nutrition page — new "AI Analyze" tab using Nutritionix API

---

## Goal

Allow users to describe a meal in natural language ("2 chapatis, 1 bowl dal, 1 glass milk") and receive a full macro breakdown per food item, which they can log to their daily totals with one tap.

---

## API Choice: Nutritionix

- **Endpoint:** `POST https://trackapi.nutritionix.com/v2/natural/nutrients`
- **Auth:** `x-app-id` + `x-app-key` headers (free developer account)
- **Free tier:** 500 requests/day
- **Why:** Purpose-built food NLP backed by USDA + brand database. Returns accurate per-item macros and micros — unlike general LLMs which estimate and can hallucinate nutritional values.
- **Sign up:** nutritionix.com/business/api (instant, free)

---

## Architecture

### Integration approach: Client-side direct call

React calls Nutritionix API directly from the browser. No backend proxy needed. Fits the existing PWA architecture (app already calls Supabase from client).

API key exposure risk is acceptable: free-tier keys have a 500 req/day hard cap that limits abuse potential.

### New files

| File | Purpose |
|------|---------|
| `src/services/nutritionixService.js` | Wraps Nutritionix API call, normalizes response |
| `.env.local` | Holds `VITE_NUTRITIONIX_APP_ID` + `VITE_NUTRITIONIX_API_KEY` (gitignored) |

### Modified files

| File | Change |
|------|--------|
| `src/pages/Nutrition.jsx` | Add tab switcher state + AI Analyze tab UI |

**No changes** to `nutritionService.js`, `useNutrition.js`, `nutrition.js`, `MacroBar.jsx`, or Supabase schema.

---

## Data Flow

```
User types: "2 chapatis 1 bowl dal 1 glass milk"
  → nutritionixService.analyzeText(text)
  → POST /v2/natural/nutrients { query: text }
  → Nutritionix returns array of food objects
  → normalize to { name, protein, carbs, fats, calories, fiber, sugar, sodium }
  → render food cards (macro + micro preview)
  → user taps "Log All"
  → nutritionService.logMeal() called per food (protein/carbs/fats/calories only)
  → useNutrition totals recompute → MacroBar re-renders
```

---

## Service: `nutritionixService.js`

```js
const BASE = 'https://trackapi.nutritionix.com/v2'
const HEADERS = {
  'x-app-id': import.meta.env.VITE_NUTRITIONIX_APP_ID,
  'x-app-key': import.meta.env.VITE_NUTRITIONIX_API_KEY,
  'Content-Type': 'application/json',
}

// Returns normalized array, throws on network/API error
export async function analyzeText(text) {
  const res = await fetch(`${BASE}/natural/nutrients`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query: text }),
  })
  if (!res.ok) throw new Error(res.status)
  const { foods } = await res.json()
  return foods.map(f => ({
    name:     `${f.food_name} (${f.serving_qty} ${f.serving_unit})`,
    protein:  f.nf_protein,
    carbs:    f.nf_total_carbohydrate,
    fats:     f.nf_total_fat,
    calories: f.nf_calories,
    // preview only — not persisted to log
    fiber:    f.nf_dietary_fiber,
    sugar:    f.nf_sugars,
    sodium:   f.nf_sodium,
  }))
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
| Network failure | "Can't reach Nutritionix — check connection" |
| 400 unrecognized food | "Couldn't identify foods — try being more specific" |
| 401 bad key | "API key invalid" (dev-facing only) |
| Offline (`!navigator.onLine`) | Button disabled, tooltip shown |

---

## Data Storage Decision

Nutritionix returns fiber, sugar, and sodium per food item. These are shown in the result card preview but **not persisted** to the meal log.

Meal log entries store: `protein`, `carbs`, `fats`, `calories` only — matching the existing `nutritionService` schema. No schema migration required.

---

## Env Setup (user does once)

```
# .env.local (gitignored)
VITE_NUTRITIONIX_APP_ID=your_app_id
VITE_NUTRITIONIX_API_KEY=your_api_key
```

---

## Out of Scope

- Photo/image food analysis
- Storing micronutrients (fiber, sugar, sodium) in the log
- Backend proxy for API key
- Barcode scanning
