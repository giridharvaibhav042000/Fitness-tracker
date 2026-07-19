import { supabase } from './supabase'

const LS_SESSIONS = 'workoutSessions'
const LS_LOGS = 'exerciseLogs'
const LS_QUEUE = 'offlineQueue'

function today() {
  return new Date().toISOString().split('T')[0]
}

export async function getOrCreateSession(userId, dayKey, type) {
  const sessions = JSON.parse(localStorage.getItem(LS_SESSIONS) || '[]')
  const existing = sessions.find(s => s.date === today() && s.day_of_week === dayKey && s.type === type)
  if (existing) return existing

  const session = {
    id: crypto.randomUUID(),
    user_id: userId,
    date: today(),
    day_of_week: dayKey,
    type,
    completed_at: new Date().toISOString(),
  }

  localStorage.setItem(LS_SESSIONS, JSON.stringify([...sessions, session]))
  syncToSupabase('workout_sessions', session)
  return session
}

export async function getTodaySession(userId) {
  const sessions = JSON.parse(localStorage.getItem(LS_SESSIONS) || '[]')
  return sessions.find(s => s.user_id === userId && s.date === today()) ?? null
}

export async function logSet(sessionId, setData) {
  const log = { id: crypto.randomUUID(), session_id: sessionId, ...setData, completed_at: new Date().toISOString() }
  const logs = JSON.parse(localStorage.getItem(LS_LOGS) || '[]')
  localStorage.setItem(LS_LOGS, JSON.stringify([...logs, log]))
  syncToSupabase('exercise_logs', log)
  return log
}

export function getSessionLogs(sessionId) {
  const logs = JSON.parse(localStorage.getItem(LS_LOGS) || '[]')
  return logs.filter(l => l.session_id === sessionId)
}

export function updateSet(id, updates) {
  const logs = JSON.parse(localStorage.getItem(LS_LOGS) || '[]')
  const updated = logs.map(l => l.id === id ? { ...l, ...updates } : l)
  localStorage.setItem(LS_LOGS, JSON.stringify(updated))
  supabase.from('exercise_logs').update(updates).eq('id', id).then(({ error }) => {
    if (error) queueForSync('exercise_logs', updated.find(l => l.id === id))
  })
}

function syncToSupabase(table, record) {
  supabase.from(table).upsert(record).then(({ error }) => {
    if (error) queueForSync(table, record)
  })
}

function queueForSync(table, record) {
  const q = JSON.parse(localStorage.getItem(LS_QUEUE) || '[]')
  localStorage.setItem(LS_QUEUE, JSON.stringify([...q, { table, record }]))
}

export function getWorkoutStreak() {
  const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]')
  const dates = new Set(sessions.map(s => s.date))
  const d = new Date()
  // grace period: if today has no workout yet, start from yesterday
  if (!dates.has(d.toISOString().split('T')[0])) {
    d.setDate(d.getDate() - 1)
  }
  let streak = 0
  while (dates.has(d.toISOString().split('T')[0])) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

export function getBestStreak() {
  const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]')
  if (!sessions.length) return 0
  const dates = [...new Set(sessions.map(s => s.date))].sort()
  let best = 1, current = 1
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i]) - new Date(dates[i - 1])) / 86400000
    if (diff === 1) { current++; if (current > best) best = current }
    else current = 1
  }
  return best
}
