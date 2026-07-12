import { useState } from 'react'
import { useNutrition } from '../hooks/useNutrition'
import { FOOD_DATABASE, MACRO_TARGETS, calcCalories } from '../data/nutrition'
import MacroBar from '../components/MacroBar'

export default function Nutrition() {
  const { meals, totals, addMeal, removeMeal } = useNutrition()
  const [search, setSearch] = useState('')

  const filtered = search.length > 1
    ? Object.entries(FOOD_DATABASE).filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase()))
    : []

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
    </div>
  )
}
