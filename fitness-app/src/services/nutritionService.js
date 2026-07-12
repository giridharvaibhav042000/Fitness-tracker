import { supabase } from './supabase'

const LS_NUTRITION = 'nutritionLogs'
const LS_QUEUE = 'offlineQueue'

function today() {
  return new Date().toISOString().split('T')[0]
}

export function getTodayLogs() {
  const all = JSON.parse(localStorage.getItem(LS_NUTRITION) || '[]')
  return all.filter(l => l.date === today())
}

export async function logMeal(userId, meal) {
  const entry = {
    id: crypto.randomUUID(),
    user_id: userId,
    date: today(),
    ...meal,
  }
  const all = JSON.parse(localStorage.getItem(LS_NUTRITION) || '[]')
  localStorage.setItem(LS_NUTRITION, JSON.stringify([...all, entry]))
  supabase.from('nutrition_logs').insert(entry).then(({ error }) => {
    if (error) {
      const q = JSON.parse(localStorage.getItem(LS_QUEUE) || '[]')
      localStorage.setItem(LS_QUEUE, JSON.stringify([...q, { table: 'nutrition_logs', record: entry }]))
    }
  })
  return entry
}

export function deleteMeal(id) {
  const all = JSON.parse(localStorage.getItem(LS_NUTRITION) || '[]')
  localStorage.setItem(LS_NUTRITION, JSON.stringify(all.filter(l => l.id !== id)))
  supabase.from('nutrition_logs').delete().eq('id', id)
}

export function calcTotals(logs) {
  return logs.reduce(
    (acc, l) => ({ protein: acc.protein + l.protein, carbs: acc.carbs + l.carbs, fats: acc.fats + l.fats }),
    { protein: 0, carbs: 0, fats: 0 }
  )
}
