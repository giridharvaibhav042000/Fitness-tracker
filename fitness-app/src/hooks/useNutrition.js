import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getLogsByDate, logMeal, deleteMeal, calcTotals } from '../services/nutritionService'

function todayStr() {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

export function useNutrition() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const [meals, setMeals] = useState(() => getLogsByDate(todayStr()))

  function changeDate(date) {
    setSelectedDate(date)
    setMeals(getLogsByDate(date))
  }

  const addMeal = useCallback(async (meal) => {
    if (!user) return
    const entry = await logMeal(user.id, meal, selectedDate)
    setMeals(prev => [...prev, entry])
    return entry
  }, [user, selectedDate])

  const removeMeal = useCallback((id) => {
    deleteMeal(id)
    setMeals(prev => prev.filter(m => m.id !== id))
  }, [])

  return { meals, totals: calcTotals(meals), addMeal, removeMeal, selectedDate, changeDate, todayStr: todayStr() }
}
