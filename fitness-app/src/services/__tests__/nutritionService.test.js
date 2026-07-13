import { describe, test, expect, vi, beforeEach } from 'vitest'
import { getWeekLogs } from '../nutritionService'

vi.mock('../supabase')

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

function mondayKey() {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  return monday.toISOString().split('T')[0]
}

describe('getWeekLogs', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('returns empty object when no logs exist', () => {
    expect(getWeekLogs()).toEqual({})
  })

  test('aggregates multiple logs on same day', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 30, carbs: 50, fats: 10, calories: 410 },
      { id: '2', date: key, protein: 20, carbs: 30, fats: 5,  calories: 245 },
    ]))
    const result = getWeekLogs()
    expect(result[key]).toEqual({ protein: 50, carbs: 80, fats: 15, calories: 655, fiber: 0 })
  })

  test('omits days with no logs', () => {
    const key = mondayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 30, carbs: 50, fats: 10, calories: 410 },
    ]))
    const result = getWeekLogs()
    expect(Object.keys(result)).toHaveLength(1)
    expect(result[key]).toBeDefined()
  })

  test('ignores logs from outside current week', () => {
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: '2020-01-01', protein: 100, carbs: 200, fats: 50, calories: 1650 },
    ]))
    expect(getWeekLogs()).toEqual({})
  })

  test('returns all 7 dates when every day has data', () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
    const expectedDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return d.toISOString().split('T')[0]
    })
    const logs = expectedDates.map((date, i) => ({
      id: String(i), date, protein: 10, carbs: 20, fats: 5, calories: 165,
    }))
    localStorage.setItem('nutritionLogs', JSON.stringify(logs))
    const result = getWeekLogs()
    expect(Object.keys(result).sort()).toEqual(expectedDates.sort())
  })
})
