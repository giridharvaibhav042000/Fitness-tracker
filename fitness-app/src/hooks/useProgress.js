import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'
import { supabase } from '../services/supabase'

const LS_PR = 'personalRecords'

export function detectPR(current, existing) {
  if (!existing) return true
  if (current.weight > existing.weight) return true
  if (current.weight === existing.weight && current.reps > existing.reps) return true
  return false
}

export function isNewPR(current, existing) {
  if (!existing) return true
  return current.weight * current.reps > existing.weight * existing.reps
}

export function getPRs() {
  return JSON.parse(localStorage.getItem(LS_PR) || '{}')
}

export function useProgress() {
  const { user } = useAuth()
  const [prs, setPRs] = useState(() => getPRs())
  const [newPR, setNewPR] = useState(null)

  const checkAndSavePR = useCallback(async ({ exercise_name, weight, reps }) => {
    const existing = prs[exercise_name] ?? null
    if (!detectPR({ weight, reps }, existing)) return false

    const updated = { ...prs, [exercise_name]: { weight, reps, achieved_at: new Date().toISOString() } }
    localStorage.setItem(LS_PR, JSON.stringify(updated))
    setPRs(updated)
    setNewPR(exercise_name)
    setTimeout(() => setNewPR(null), 3000)

    if (user) {
      supabase.from('personal_records').upsert({
        user_id: user.id, exercise_name, weight, reps, achieved_at: new Date().toISOString()
      }, { onConflict: 'user_id,exercise_name' })
    }
    return true
  }, [prs, user])

  return { prs, newPR, checkAndSavePR }
}
