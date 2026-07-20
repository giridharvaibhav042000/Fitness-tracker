import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { supabase } from './supabase'

const KEY_SESSIONS = 'workoutSessions'
const KEY_LOGS     = 'exerciseLogs'
const KEY_QUEUE    = 'offlineQueue'

function localDateStr(d: Date) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

function today() {
  return localDateStr(new Date())
}

async function getSessions() {
  return JSON.parse((await AsyncStorage.getItem(KEY_SESSIONS)) ?? '[]')
}

async function getLogs() {
  return JSON.parse((await AsyncStorage.getItem(KEY_LOGS)) ?? '[]')
}

async function queueForSync(table: string, record: object) {
  const q = JSON.parse((await AsyncStorage.getItem(KEY_QUEUE)) ?? '[]')
  await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify([...q, { table, record }]))
}

async function syncToSupabase(table: string, record: object) {
  const { error } = await supabase.from(table).upsert(record)
  if (error) await queueForSync(table, record)
}

export async function getOrCreateSession(userId: string, dayKey: string, type: string) {
  const sessions = await getSessions()
  const existing = sessions.find((s: any) => s.date === today() && s.day_of_week === dayKey && s.type === type)
  if (existing) return existing

  const session = {
    id: Crypto.randomUUID(),
    user_id: userId,
    date: today(),
    day_of_week: dayKey,
    type,
    completed_at: new Date().toISOString(),
  }

  await AsyncStorage.setItem(KEY_SESSIONS, JSON.stringify([...sessions, session]))
  syncToSupabase('workout_sessions', session)
  return session
}

export async function getTodaySession(userId: string) {
  const sessions = await getSessions()
  return sessions.find((s: any) => s.user_id === userId && s.date === today()) ?? null
}

export async function logSet(sessionId: string, setData: object) {
  const log = { id: Crypto.randomUUID(), session_id: sessionId, ...setData, completed_at: new Date().toISOString() }
  const logs = await getLogs()
  await AsyncStorage.setItem(KEY_LOGS, JSON.stringify([...logs, log]))
  syncToSupabase('exercise_logs', log)
  return log
}

export async function getSessionLogs(sessionId: string) {
  const logs = await getLogs()
  return logs.filter((l: any) => l.session_id === sessionId)
}

export async function getLastSetForExercise(exerciseName: string, excludeSessionId: string) {
  const [logs, sessions] = await Promise.all([getLogs(), getSessions()])
  const relevant = logs.filter((l: any) => l.exercise_name === exerciseName && l.session_id !== excludeSessionId)
  if (!relevant.length) return null
  const sessionDates: Record<string, string> = Object.fromEntries(sessions.map((s: any) => [s.id, s.date]))
  const sorted = [...relevant].sort((a: any, b: any) => {
    const da = sessionDates[a.session_id] || ''
    const db = sessionDates[b.session_id] || ''
    return db.localeCompare(da) || b.weight - a.weight
  })
  return { weight: sorted[0].weight, reps: sorted[0].reps }
}

export async function updateSet(id: string, updates: { weight: number; reps: number }) {
  const logs = await getLogs()
  const updated = logs.map((l: any) => l.id === id ? { ...l, ...updates } : l)
  await AsyncStorage.setItem(KEY_LOGS, JSON.stringify(updated))
  const { error } = await supabase.from('exercise_logs').update(updates).eq('id', id)
  if (error) await queueForSync('exercise_logs', updated.find((l: any) => l.id === id))
}

export async function getWorkoutStreak() {
  const sessions = await getSessions()
  const dates = new Set(sessions.map((s: any) => s.date))
  const d = new Date()
  if (!dates.has(localDateStr(d))) d.setDate(d.getDate() - 1)
  let streak = 0
  while (dates.has(localDateStr(d))) { streak++; d.setDate(d.getDate() - 1) }
  return streak
}

export async function getBestStreak() {
  const sessions = await getSessions()
  if (!sessions.length) return 0
  const dates = [...new Set<string>(sessions.map((s: any) => s.date))].sort()
  let best = 1, current = 1
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime()) / 86400000
    if (diff === 1) { current++; if (current > best) best = current }
    else current = 1
  }
  return best
}
