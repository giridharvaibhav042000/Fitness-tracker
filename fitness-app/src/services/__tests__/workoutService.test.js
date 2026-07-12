import { describe, test, expect, vi, beforeEach } from 'vitest'
import { logSet, getTodaySession } from '../workoutService'

vi.mock('../supabase')

describe('workoutService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('logSet stores to localStorage immediately', async () => {
    const setData = { exercise_name: 'Squat', set_number: 1, weight: 80, reps: 8 }
    await logSet('session-123', setData)
    const stored = JSON.parse(localStorage.getItem('exerciseLogs') || '[]')
    expect(stored).toContainEqual(expect.objectContaining(setData))
  })

  test('getTodaySession returns null when no session exists', async () => {
    const result = await getTodaySession('user-1')
    expect(result).toBeNull()
  })
})
