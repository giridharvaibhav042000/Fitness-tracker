import { describe, test, expect } from 'vitest'
import { detectPR, isNewPR } from '../useProgress'

describe('detectPR', () => {
  test('returns true when weight higher than existing PR', () => {
    expect(detectPR({ weight: 85, reps: 8 }, { weight: 80, reps: 8 })).toBe(true)
  })

  test('returns true when reps higher at same weight', () => {
    expect(detectPR({ weight: 80, reps: 10 }, { weight: 80, reps: 8 })).toBe(true)
  })

  test('returns false when weight same and reps same', () => {
    expect(detectPR({ weight: 80, reps: 8 }, { weight: 80, reps: 8 })).toBe(false)
  })

  test('returns false when weight lower', () => {
    expect(detectPR({ weight: 75, reps: 8 }, { weight: 80, reps: 8 })).toBe(false)
  })

  test('returns true when no existing PR', () => {
    expect(detectPR({ weight: 80, reps: 8 }, null)).toBe(true)
  })
})

describe('isNewPR', () => {
  test('volume (weight * reps) comparison', () => {
    expect(isNewPR({ weight: 100, reps: 5 }, { weight: 80, reps: 8 })).toBe(false) // 500 vs 640
    expect(isNewPR({ weight: 80, reps: 9 }, { weight: 80, reps: 8 })).toBe(true)   // 720 vs 640
  })
})
