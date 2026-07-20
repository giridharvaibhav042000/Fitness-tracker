import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { supabase } from './supabase'

const KEY_NUTRITION = 'nutritionLogs'
const KEY_QUEUE     = 'offlineQueue'

function localDateStr(d: Date) {
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-')
}

export function todayStr() {
  return localDateStr(new Date())
}

async function getAll() {
  return JSON.parse((await AsyncStorage.getItem(KEY_NUTRITION)) ?? '[]')
}

export async function getLogsByDate(date: string) {
  const all = await getAll()
  return all.filter((l: any) => l.date === date)
}

export async function logMeal(userId: string, meal: object, date: string) {
  const entry = { id: Crypto.randomUUID(), user_id: userId, date: date ?? todayStr(), ...meal }
  const all = await getAll()
  await AsyncStorage.setItem(KEY_NUTRITION, JSON.stringify([...all, entry]))
  const { error } = await supabase.from('nutrition_logs').insert(entry)
  if (error) {
    const q = JSON.parse((await AsyncStorage.getItem(KEY_QUEUE)) ?? '[]')
    await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify([...q, { table: 'nutrition_logs', record: entry }]))
  }
  return entry
}

export async function deleteMeal(id: string) {
  const all = await getAll()
  await AsyncStorage.setItem(KEY_NUTRITION, JSON.stringify(all.filter((l: any) => l.id !== id)))
  supabase.from('nutrition_logs').delete().eq('id', id)
}

export function calcTotals(logs: any[]) {
  return logs.reduce(
    (acc, l) => ({ protein: acc.protein + l.protein, carbs: acc.carbs + l.carbs, fats: acc.fats + l.fats, fiber: acc.fiber + (l.fiber ?? 0) }),
    { protein: 0, carbs: 0, fats: 0, fiber: 0 }
  )
}

export async function getWeekLogs() {
  const all = await getAll()
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  const week: Record<string, any> = {}
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = localDateStr(d)
    const logs = all.filter((l: any) => l.date === key)
    if (logs.length) {
      week[key] = logs.reduce(
        (acc: any, l: any) => ({ protein: acc.protein + l.protein, carbs: acc.carbs + l.carbs, fats: acc.fats + l.fats, calories: acc.calories + l.calories, fiber: acc.fiber + (l.fiber ?? 0) }),
        { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0 }
      )
    }
  }
  return week
}
