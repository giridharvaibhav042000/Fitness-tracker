import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getOrCreateSession, getSessionLogs, logSet, updateSet } from '../services/workoutService'

export function useWorkout(dayKey, type) {
  const { user } = useAuth()
  const [session, setSession] = useState(null)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (!user || !dayKey) return
    getOrCreateSession(user.id, dayKey, type).then(s => {
      setSession(s)
      setLogs(getSessionLogs(s.id))
    })
  }, [user, dayKey, type])

  const recordSet = useCallback(async (exercise, setNumber, weight, reps) => {
    if (!session) return null
    const log = await logSet(session.id, { exercise_name: exercise.name, set_number: setNumber, weight, reps })
    setLogs(prev => [...prev, log])
    return log
  }, [session])

  const editSet = useCallback((logId, weight, reps) => {
    updateSet(logId, { weight, reps })
    setLogs(prev => prev.map(l => l.id === logId ? { ...l, weight, reps } : l))
  }, [])

  return { session, logs, recordSet, editSet }
}
