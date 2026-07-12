import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { getCurrentWeek } from '../weekPlan'

describe('getCurrentWeek', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  test('returns 1 on program start date', () => {
    vi.setSystemTime(new Date('2026-07-07'))
    expect(getCurrentWeek()).toBe(1)
  })

  test('returns 2 after 7 days', () => {
    vi.setSystemTime(new Date('2026-07-14'))
    expect(getCurrentWeek()).toBe(2)
  })

  test('caps at 6', () => {
    vi.setSystemTime(new Date('2027-06-01'))
    expect(getCurrentWeek()).toBe(6)
  })

  test('minimum is 1 even before start', () => {
    vi.setSystemTime(new Date('2026-01-01'))
    expect(getCurrentWeek()).toBe(1)
  })
})
