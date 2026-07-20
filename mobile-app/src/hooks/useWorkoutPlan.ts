import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GOALS, WEEK_CYCLES } from '../data/variations'

function todayStr() {
  const d = new Date()
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-')
}

export function useWorkoutPlan() {
  const [goal, setGoalState]               = useState<string>(GOALS.STRENGTH)
  const [weekCycle, setWeekCycleState]     = useState<number>(4)
  const [cycleStartDate, setCycleStartDate] = useState<string>(todayStr())
  const [loaded, setLoaded]                = useState(false)

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('workoutGoal'),
      AsyncStorage.getItem('weekCycle'),
      AsyncStorage.getItem('cycleStartDate'),
    ]).then(([g, wc, cd]) => {
      if (g) setGoalState(g)
      if (wc) setWeekCycleState(parseInt(wc, 10))
      if (cd) setCycleStartDate(cd)
      setLoaded(true)
    })
  }, [])

  async function setGoal(g: string) { await AsyncStorage.setItem('workoutGoal', g); setGoalState(g) }
  async function setWeekCycle(n: number) { await AsyncStorage.setItem('weekCycle', String(n)); setWeekCycleState(n) }
  async function resetCycle(dateStr?: string) {
    const d = dateStr || todayStr()
    await AsyncStorage.setItem('cycleStartDate', d)
    setCycleStartDate(d)
  }

  function getCurrentWeekIndex() {
    const days = Math.floor((Date.now() - new Date(cycleStartDate).getTime()) / 86400000)
    return Math.min(Math.max(Math.floor(days / 7), 0), weekCycle - 1)
  }

  const weekIndex = getCurrentWeekIndex()
  const cycles    = (WEEK_CYCLES as any)[goal]?.[weekCycle]
  const modifier  = cycles ? (cycles[weekIndex] || cycles[cycles.length - 1]) : null

  return { goal, weekCycle, cycleStartDate, weekIndex, modifier, allWeeks: cycles || [], setGoal, setWeekCycle, resetCycle, loaded }
}
