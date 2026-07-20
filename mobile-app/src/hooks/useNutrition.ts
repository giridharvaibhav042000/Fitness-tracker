import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getLogsByDate, logMeal, deleteMeal, calcTotals, todayStr } from '../services/nutritionService'

export function useNutrition() {
  const { user }                        = useAuth()
  const [selectedDate, setSelectedDate] = useState(todayStr())
  const [meals, setMeals]               = useState<any[]>([])

  const loadMeals = useCallback(async (date: string) => {
    setMeals(await getLogsByDate(date))
  }, [])

  useEffect(() => { loadMeals(todayStr()) }, [])

  const changeDate = useCallback(async (date: string) => {
    setSelectedDate(date)
    await loadMeals(date)
  }, [loadMeals])

  const addMeal = useCallback(async (meal: object) => {
    if (!user) return
    const entry = await logMeal(user.id, meal, selectedDate)
    setMeals(prev => [...prev, entry])
    return entry
  }, [user, selectedDate])

  const removeMeal = useCallback(async (id: string) => {
    await deleteMeal(id)
    setMeals(prev => prev.filter(m => m.id !== id))
  }, [])

  return { meals, totals: calcTotals(meals), addMeal, removeMeal, selectedDate, changeDate, todayStr: todayStr() }
}
