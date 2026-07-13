import { useState } from 'react'
import { useNutrition } from '../hooks/useNutrition'
import { FOOD_DATABASE, MACRO_TARGETS, calcCalories } from '../data/nutrition'
import MacroBar from '../components/MacroBar'
import { analyzeText } from '../services/aiNutritionService'

// ── Weekly diet plan data ─────────────────────────────────────────────────────

const WEEKLY_DIET_PLAN = [
  {
    day: 'Mon', tag: 'High Protein',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Oats 50g dry', qty: 1 }, { name: 'Whole Eggs 1 egg', qty: 2 }, { name: 'Banana 1 medium', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 1 }, { name: 'Dal 100g cooked', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Whey Protein 1 scoop', qty: 1 }, { name: 'Almonds 30g', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }, { name: 'Sweet Potato 100g', qty: 1 }] },
    ],
  },
  {
    day: 'Tue', tag: 'Balanced',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Oats 50g dry', qty: 1 }, { name: 'Milk 250ml', qty: 1 }, { name: 'Banana 1 medium', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Paneer 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 1 }, { name: 'Dal 100g cooked', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Greek Yogurt 150g', qty: 1 }, { name: 'Almonds 30g', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }, { name: 'Sweet Potato 100g', qty: 1 }] },
    ],
  },
  {
    day: 'Wed', tag: 'Recovery',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Whole Eggs 1 egg', qty: 3 }, { name: 'Oats 50g dry', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Dal 100g cooked', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }, { name: 'Paneer 100g', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Greek Yogurt 150g', qty: 1 }, { name: 'Banana 1 medium', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'Sweet Potato 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 1 }] },
    ],
  },
  {
    day: 'Thu', tag: 'High Carb',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Oats 50g dry', qty: 1 }, { name: 'Banana 1 medium', qty: 1 }, { name: 'Milk 250ml', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 2 }, { name: 'Dal 100g cooked', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Whey Protein 1 scoop', qty: 1 }, { name: 'Banana 1 medium', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }, { name: 'Sweet Potato 100g', qty: 1 }] },
    ],
  },
  {
    day: 'Fri', tag: 'High Protein',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Whole Eggs 1 egg', qty: 2 }, { name: 'Oats 50g dry', qty: 1 }, { name: 'Whey Protein 1 scoop', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 1 }, { name: 'Dal 100g cooked', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Greek Yogurt 150g', qty: 1 }, { name: 'Almonds 30g', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Paneer 100g', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }, { name: 'Dal 100g cooked', qty: 1 }] },
    ],
  },
  {
    day: 'Sat', tag: 'Active Day',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Oats 50g dry', qty: 1 }, { name: 'Whole Eggs 1 egg', qty: 2 }, { name: 'Banana 1 medium', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 1 }, { name: 'Paneer 100g', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Peanut Butter 2 tbsp', qty: 1 }, { name: 'Milk 250ml', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'Sweet Potato 100g', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }] },
    ],
  },
  {
    day: 'Sun', tag: 'Rest Day',
    meals: [
      { time: 'Breakfast', items: [{ name: 'Whole Eggs 1 egg', qty: 2 }, { name: 'Oats 50g dry', qty: 1 }] },
      { time: 'Lunch',     items: [{ name: 'Dal 100g cooked', qty: 1 }, { name: 'Roti 1 piece', qty: 2 }, { name: 'Paneer 100g', qty: 1 }] },
      { time: 'Snack',     items: [{ name: 'Greek Yogurt 150g', qty: 1 }, { name: 'Almonds 30g', qty: 1 }] },
      { time: 'Dinner',    items: [{ name: 'Chicken Breast 100g', qty: 1 }, { name: 'White Rice 100g cooked', qty: 1 }, { name: 'Sweet Potato 100g', qty: 1 }] },
    ],
  },
]

function getMealMacros(items) {
  return items.reduce((acc, { name, qty }) => {
    const f = FOOD_DATABASE[name]
    if (!f) return acc
    return { protein: acc.protein + f.protein * qty, carbs: acc.carbs + f.carbs * qty, fats: acc.fats + f.fats * qty }
  }, { protein: 0, carbs: 0, fats: 0 })
}

function getDayMacros(dayPlan) {
  return dayPlan.meals.reduce((acc, meal) => {
    const m = getMealMacros(meal.items)
    return { protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fats: acc.fats + m.fats }
  }, { protein: 0, carbs: 0, fats: 0 })
}

function fmtItem(name, qty) {
  if (qty === 1) return name
  // Strip trailing unit from name and prepend qty
  return `${qty}× ${name}`
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Nutrition() {
  const { meals, totals, addMeal, removeMeal } = useNutrition()
  const [search, setSearch] = useState('')
  const [planDay, setPlanDay] = useState(() => {
    const d = new Date().getDay() // 0=Sun
    return d === 0 ? 6 : d - 1   // map to Mon=0 … Sun=6
  })
  const [activeTab, setActiveTab]     = useState('search')
  const [query, setQuery]             = useState('')
  const [aiResults, setAiResults]     = useState([])
  const [aiLoading, setAiLoading]     = useState(false)
  const [aiError, setAiError]         = useState(null)
  const [aiLogging, setAiLogging]     = useState(false)
  const [loggedFlash, setLoggedFlash] = useState(false)

  const filtered = search.length > 1
    ? Object.entries(FOOD_DATABASE).filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase()))
    : []

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
    if (aiLogging) return
    setAiLogging(true)
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
    setAiLogging(false)
    setLoggedFlash(true)
    setTimeout(() => setLoggedFlash(false), 2000)
  }

  async function handleAdd(name, macros) {
    await addMeal({
      meal_name: name,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
      calories: calcCalories(macros),
    })
    setSearch('')
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-white font-display text-xl font-bold">Nutrition</h1>

      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <MacroBar label="Protein" current={totals.protein} target={MACRO_TARGETS.protein} type="protein" />
        <MacroBar label="Carbs" current={totals.carbs} target={MACRO_TARGETS.carbs} type="carbs" />
        <MacroBar label="Fats" current={totals.fats} target={MACRO_TARGETS.fats} type="fats" />
        <p className="text-muted text-xs text-right">
          {Math.round(calcCalories(totals))} / {calcCalories(MACRO_TARGETS)} kcal
        </p>
      </div>

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
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAnalyze() }}
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
                <div key={`${food.name}-${i}`} className="bg-card border border-line rounded-xl p-3">
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
                disabled={aiLogging}
                className="w-full py-3 rounded-lg bg-cali/20 border border-cali/40 text-cali font-semibold text-sm disabled:opacity-40"
              >
                {aiLogging ? 'Logging...' : 'Log All Meals'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-soft text-xs uppercase tracking-wider">Today's Meals</h2>
        {meals.length === 0 && <p className="text-muted text-sm">No meals logged yet.</p>}
        {meals.map(meal => (
          <div key={meal.id} className="flex items-center justify-between bg-card border border-line rounded-xl px-4 py-3">
            <div>
              <p className="text-white text-sm">{meal.meal_name}</p>
              <p className="text-muted text-xs">P:{meal.protein}g C:{meal.carbs}g F:{meal.fats}g · {meal.calories}kcal</p>
            </div>
            <button onClick={() => removeMeal(meal.id)} className="text-warn text-xs ml-3">✕</button>
          </div>
        ))}
      </div>
      {/* ── Weekly Diet Plan ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <h2 className="text-soft text-xs font-semibold uppercase tracking-wider">Weekly Diet Plan</h2>

        {/* Day tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {WEEKLY_DIET_PLAN.map((d, i) => (
            <button key={d.day}
              onClick={() => setPlanDay(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                planDay === i ? 'bg-gym text-black border-gym' : 'bg-surface border-line text-muted'
              }`}>
              {d.day}
            </button>
          ))}
        </div>

        {(() => {
          const day = WEEKLY_DIET_PLAN[planDay]
          const dayMacros = getDayMacros(day)
          const dayKcal   = Math.round(calcCalories(dayMacros))
          return (
            <div className="space-y-3">
              {/* Tag + day totals */}
              <div className="flex items-center justify-between">
                <span className="text-gym text-xs font-semibold">{day.tag}</span>
                <span className="text-muted text-xs font-mono">
                  P{Math.round(dayMacros.protein)}·C{Math.round(dayMacros.carbs)}·F{Math.round(dayMacros.fats)} · {dayKcal} kcal
                </span>
              </div>

              {/* Meal cards */}
              {day.meals.map(meal => {
                const m = getMealMacros(meal.items)
                return (
                  <div key={meal.time} className="bg-surface border border-line rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-xs font-semibold">{meal.time}</p>
                      <p className="text-muted text-xs font-mono">
                        P{Math.round(m.protein)} C{Math.round(m.carbs)} F{Math.round(m.fats)} · {Math.round(calcCalories(m))} kcal
                      </p>
                    </div>
                    <ul className="space-y-0.5">
                      {meal.items.map((item, idx) => (
                        <li key={idx} className="text-soft text-xs">· {fmtItem(item.name, item.qty)}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
