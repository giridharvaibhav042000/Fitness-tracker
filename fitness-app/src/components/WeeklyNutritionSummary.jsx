import { useState, useMemo, useEffect } from 'react'
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

function computeWeekAvg(loggedDays, weekLogs) {
  if (!loggedDays.length) return null
  const sum = loggedDays.reduce(
    (acc, d) => ({
      protein:  acc.protein  + weekLogs[d].protein,
      carbs:    acc.carbs    + weekLogs[d].carbs,
      fats:     acc.fats     + weekLogs[d].fats,
      calories: acc.calories + weekLogs[d].calories,
      fiber:    acc.fiber    + (weekLogs[d].fiber ?? 0),
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0 }
  )
  const n = loggedDays.length
  return {
    protein:  Math.round(sum.protein  / n),
    carbs:    Math.round(sum.carbs    / n),
    fats:     Math.round(sum.fats     / n),
    calories: Math.round(sum.calories / n),
    fiber:    Math.round(sum.fiber    / n),
  }
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

export default function WeeklyNutritionSummary({ refreshKey, highlightDate }) {
  const weekDates = getWeekDates()
  const weekLogs  = useMemo(() => getWeekLogs(), [refreshKey])

  const highlightIdx = highlightDate ? weekDates.indexOf(highlightDate) : -1
  const [selectedDay, setSelectedDay] = useState(() =>
    highlightIdx >= 0 ? highlightIdx : todayDayIndex()
  )

  useEffect(() => {
    if (highlightIdx >= 0) setSelectedDay(highlightIdx)
  }, [highlightIdx])

  const selectedDate = weekDates[selectedDay]
  const selectedData = weekLogs[selectedDate]

  const loggedDays = weekDates.filter(d => weekLogs[d])
  const avg = computeWeekAvg(loggedDays, weekLogs)

  return (
    <div className="bg-card border border-line rounded-xl p-4 space-y-4">
      <h2 className="text-soft text-xs font-semibold uppercase tracking-wider">Weekly Nutrition Analysis</h2>

      {/* Day tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {DAY_NAMES.map((name, i) => (
          <button
            key={weekDates[i]}
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
            <MacroRow label="Protein" current={Math.round(selectedData.protein)}         target={MACRO_TARGETS.protein} />
            <MacroRow label="Carbs"   current={Math.round(selectedData.carbs)}           target={MACRO_TARGETS.carbs}   />
            <MacroRow label="Fats"    current={Math.round(selectedData.fats)}            target={MACRO_TARGETS.fats}    />
            <MacroRow label="Fiber"   current={Math.round(selectedData.fiber ?? 0)}      target={MACRO_TARGETS.fiber}   />
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
                  <td className="py-1 pr-3">{date.slice(5).replace('-', '/')}</td>
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
