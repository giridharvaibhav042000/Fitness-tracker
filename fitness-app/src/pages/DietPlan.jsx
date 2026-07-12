import { FOOD_DATABASE, MACRO_TARGETS, calcCalories } from '../data/nutrition'

const MEALS = [
  { time: '7:00 AM', label: 'Pre-Workout', items: ['Banana 1 medium', 'Whole Eggs 1 egg', 'Whole Eggs 1 egg'] },
  { time: '10:00 AM', label: 'Post-Workout', items: ['Whey Protein 1 scoop', 'White Rice 100g cooked', 'Chicken Breast 100g'] },
  { time: '1:00 PM', label: 'Lunch', items: ['Chicken Breast 100g', 'White Rice 100g cooked', 'Dal 100g cooked'] },
  { time: '4:00 PM', label: 'Snack', items: ['Greek Yogurt 150g', 'Almonds 30g'] },
  { time: '7:00 PM', label: 'Dinner', items: ['Paneer 100g', 'Roti 1 piece', 'Roti 1 piece'] },
  { time: '9:30 PM', label: 'Before Bed', items: ['Milk 250ml', 'Peanut Butter 2 tbsp'] },
]

function mealTotals(items) {
  return items.reduce((acc, name) => {
    const m = FOOD_DATABASE[name] || { protein: 0, carbs: 0, fats: 0 }
    return { protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fats: acc.fats + m.fats }
  }, { protein: 0, carbs: 0, fats: 0 })
}

export default function DietPlan() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-white font-display text-xl font-bold">Diet Plan</h1>

      <div className="bg-card border border-line rounded-xl p-4 space-y-1">
        <p className="text-soft text-xs mb-2">Daily Targets</p>
        <p className="text-white text-sm">Protein: <span className="text-cali font-mono">{MACRO_TARGETS.protein}g</span></p>
        <p className="text-white text-sm">Carbs: <span className="text-gym font-mono">{MACRO_TARGETS.carbs}g</span></p>
        <p className="text-white text-sm">Fats: <span className="text-gold font-mono">{MACRO_TARGETS.fats}g</span></p>
        <p className="text-white text-sm">Calories: <span className="text-cardio font-mono">{calcCalories(MACRO_TARGETS)} kcal</span></p>
      </div>

      {MEALS.map(meal => {
        const totals = mealTotals(meal.items)
        return (
          <div key={meal.time} className="bg-card border border-line rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-semibold text-sm">{meal.label}</p>
              <p className="text-muted text-xs font-mono">{meal.time}</p>
            </div>
            <div className="space-y-1">
              {meal.items.map((item, i) => (
                <p key={i} className="text-soft text-sm">· {item}</p>
              ))}
            </div>
            <p className="text-muted text-xs mt-2">
              P:{Math.round(totals.protein)}g C:{Math.round(totals.carbs)}g F:{Math.round(totals.fats)}g
            </p>
          </div>
        )
      })}
    </div>
  )
}
