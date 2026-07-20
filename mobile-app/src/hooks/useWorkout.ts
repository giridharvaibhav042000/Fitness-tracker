import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getOrCreateSession, getSessionLogs, logSet, updateSet, getLastSetForExercise } from '../services/workoutService'

export function useWorkout(dayKey: string, type: string) {
  const { user }              = useAuth()
  const [session, setSession] = useState<any>(null)
  const [logs, setLogs]       = useState<any[]>([])

  useEffect(() => {
    if (!user || !dayKey) return
    getOrCreateSession(user.id, dayKey, type).then(async s => {
      setSession(s)
      setLogs(await getSessionLogs(s.id))
    })
  }, [user, dayKey, type])

  const recordSet = useCallback(async (exercise: any, setNumber: number, weight: number, reps: number) => {
    if (!session) return null
    const log = await logSet(session.id, { exercise_name: exercise.name, set_number: setNumber, weight, reps })
    setLogs(prev => [...prev, log])
    return log
  }, [session])

  const editSet = useCallback(async (logId: string, weight: number, reps: number) => {
    await updateSet(logId, { weight, reps })
    setLogs(prev => prev.map(l => l.id === logId ? { ...l, weight, reps } : l))
  }, [])

  const getLastSet = useCallback((exerciseName: string) =>
    session ? getLastSetForExercise(exerciseName, session.id) : Promise.resolve(null)
  , [session])

  return { session, logs, recordSet, editSet, getLastSet }
}
