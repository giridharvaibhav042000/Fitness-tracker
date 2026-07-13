import { useState } from 'react'
import { GOALS, WEEK_CYCLES } from '../data/variations'

export function useWorkoutPlan() {
  const [goal, setGoalState] = useState(
    () => localStorage.getItem('workoutGoal') || GOALS.STRENGTH
  )
  const [weekCycle, setWeekCycleState] = useState(
    () => parseInt(localStorage.getItem('weekCycle') || '4', 10)
  )
  const [cycleStartDate, setCycleStartDateState] = useState(
    () => localStorage.getItem('cycleStartDate') || new Date().toISOString().split('T')[0]
  )

  function setGoal(g) {
    localStorage.setItem('workoutGoal', g)
    setGoalState(g)
  }

  function setWeekCycle(n) {
    localStorage.setItem('weekCycle', String(n))
    setWeekCycleState(n)
  }

  function resetCycle(dateStr) {
    const d = dateStr || new Date().toISOString().split('T')[0]
    localStorage.setItem('cycleStartDate', d)
    setCycleStartDateState(d)
  }

  function getCurrentWeekIndex() {
    const start = new Date(cycleStartDate)
    const now = new Date()
    const days = Math.floor((now - start) / (1000 * 60 * 60 * 24))
    const week = Math.floor(days / 7)
    return Math.min(Math.max(week, 0), weekCycle - 1)
  }

  function getModifier() {
    const cycles = WEEK_CYCLES[goal]?.[weekCycle]
    if (!cycles) return null
    return cycles[getCurrentWeekIndex()] || cycles[cycles.length - 1]
  }

  function getAllWeeks() {
    return WEEK_CYCLES[goal]?.[weekCycle] || []
  }

  const weekIndex = getCurrentWeekIndex()
  const modifier = getModifier()

  return {
    goal,
    weekCycle,
    cycleStartDate,
    weekIndex,
    modifier,
    allWeeks: getAllWeeks(),
    setGoal,
    setWeekCycle,
    resetCycle,
  }
}
