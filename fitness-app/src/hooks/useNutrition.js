import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getTodayLogs, logMeal, deleteMeal, calcTotals } from '../services/nutritionService'

export function useNutrition() {
  const { user } = useAuth()
  const [meals, setMeals] = useState(() => getTodayLogs())

  const addMeal = useCallback(async (meal) => {
    if (!user) return
    const entry = await logMeal(user.id, meal)
    setMeals(prev => [...prev, entry])
    return entry
  }, [user])

  const removeMeal = useCallback((id) => {
    deleteMeal(id)
    setMeals(prev => prev.filter(m => m.id !== id))
  }, [])

  return { meals, totals: calcTotals(meals), addMeal, removeMeal }
}
