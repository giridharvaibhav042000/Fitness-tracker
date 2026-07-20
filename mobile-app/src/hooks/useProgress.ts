import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from './useAuth'
import { supabase } from '../services/supabase'

const KEY_PR = 'personalRecords'

export function detectPR(current: any, existing: any) {
  if (!existing) return true
  if (current.weight > existing.weight) return true
  if (current.weight === existing.weight && current.reps > existing.reps) return true
  return false
}

export function useProgress() {
  const { user }          = useAuth()
  const [prs, setPRs]     = useState<Record<string, any>>({})
  const [newPR, setNewPR] = useState<string | null>(null)

  useEffect(() => {
    AsyncStorage.getItem(KEY_PR).then(raw => {
      if (raw) setPRs(JSON.parse(raw))
    })
  }, [])

  const checkAndSavePR = useCallback(async ({ exercise_name, weight, reps }: any) => {
    const existing = prs[exercise_name] ?? null
    if (!detectPR({ weight, reps }, existing)) return false
    const updated = { ...prs, [exercise_name]: { weight, reps, achieved_at: new Date().toISOString() } }
    await AsyncStorage.setItem(KEY_PR, JSON.stringify(updated))
    setPRs(updated)
    setNewPR(exercise_name)
    setTimeout(() => setNewPR(null), 3000)
    if (user) {
      supabase.from('personal_records').upsert({ user_id: user.id, exercise_name, weight, reps, achieved_at: new Date().toISOString() }, { onConflict: 'user_id,exercise_name' })
    }
    return true
  }, [prs, user])

  return { prs, newPR, checkAndSavePR }
}
