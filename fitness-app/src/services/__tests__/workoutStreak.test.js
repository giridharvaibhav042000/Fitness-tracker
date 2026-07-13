import { describe, test, expect, beforeEach } from 'vitest'
import { getWorkoutStreak, getBestStreak } from '../workoutService'

function dateKey(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}

function setSessionsWithDates(dates) {
  localStorage.setItem('workoutSessions', JSON.stringify(
    dates.map((date, i) => ({ id: String(i), date, day_of_week: 'monday', type: 'gym' }))
  ))
}

describe('getWorkoutStreak', () => {
  beforeEach(() => localStorage.clear())

  test('returns 0 when no sessions', () => {
    expect(getWorkoutStreak()).toBe(0)
  })

  test('returns 1 for only today', () => {
    setSessionsWithDates([dateKey(0)])
    expect(getWorkoutStreak()).toBe(1)
  })

  test('counts consecutive days ending today', () => {
    setSessionsWithDates([dateKey(-2), dateKey(-1), dateKey(0)])
    expect(getWorkoutStreak()).toBe(3)
  })

  test('breaks on gap — returns days since gap', () => {
    setSessionsWithDates([dateKey(-4), dateKey(-2), dateKey(-1), dateKey(0)])
    expect(getWorkoutStreak()).toBe(3)
  })
})

describe('getBestStreak', () => {
  beforeEach(() => localStorage.clear())

  test('returns 0 when no sessions', () => {
    expect(getBestStreak()).toBe(0)
  })

  test('returns correct best streak across gaps', () => {
    setSessionsWithDates([
      dateKey(-10), dateKey(-9), dateKey(-8),  // streak of 3
      dateKey(-5), dateKey(-4), dateKey(-3), dateKey(-2),  // streak of 4
      dateKey(0),  // streak of 1
    ])
    expect(getBestStreak()).toBe(4)
  })
})
