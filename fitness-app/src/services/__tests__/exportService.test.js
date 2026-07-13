import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { buildExportData } from '../exportService'

describe('buildExportData', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  test('returns empty arrays when localStorage is empty', () => {
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-13',
      include: { workoutSessions: true, exerciseLogs: true, nutritionLogs: true, personalRecords: true },
    })
    expect(result.workoutSessions).toEqual([])
    expect(result.exerciseLogs).toEqual([])
    expect(result.nutritionLogs).toEqual([])
    expect(result.personalRecords).toEqual({})
  })

  test('filters workoutSessions by date range', () => {
    localStorage.setItem('workoutSessions', JSON.stringify([
      { id: '1', date: '2026-07-05', type: 'gym' },
      { id: '2', date: '2026-07-10', type: 'gym' },
      { id: '3', date: '2026-07-20', type: 'gym' },
    ]))
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-15',
      include: { workoutSessions: true, exerciseLogs: false, nutritionLogs: false, personalRecords: false },
    })
    expect(result.workoutSessions).toHaveLength(2)
    expect(result.workoutSessions.map(s => s.id)).toEqual(['1', '2'])
  })

  test('filters nutritionLogs by date range', () => {
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: '2026-06-30', protein: 100 },
      { id: '2', date: '2026-07-10', protein: 120 },
    ]))
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-31',
      include: { workoutSessions: false, exerciseLogs: false, nutritionLogs: true, personalRecords: false },
    })
    expect(result.nutritionLogs).toHaveLength(1)
    expect(result.nutritionLogs[0].id).toBe('2')
  })

  test('filters exerciseLogs by completed_at date', () => {
    localStorage.setItem('exerciseLogs', JSON.stringify([
      { id: '1', completed_at: '2026-07-05T10:00:00Z', exercise_name: 'Squat' },
      { id: '2', completed_at: '2026-07-20T10:00:00Z', exercise_name: 'Bench' },
    ]))
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-15',
      include: { workoutSessions: false, exerciseLogs: true, nutritionLogs: false, personalRecords: false },
    })
    expect(result.exerciseLogs).toHaveLength(1)
    expect(result.exerciseLogs[0].id).toBe('1')
  })

  test('filters personalRecords by achieved_at date', () => {
    localStorage.setItem('personalRecords', JSON.stringify({
      Squat: { weight: 100, reps: 5, achieved_at: '2026-07-08T09:00:00Z' },
      Bench: { weight: 80, reps: 5, achieved_at: '2026-06-01T09:00:00Z' },
    }))
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-31',
      include: { workoutSessions: false, exerciseLogs: false, nutritionLogs: false, personalRecords: true },
    })
    expect(Object.keys(result.personalRecords)).toEqual(['Squat'])
  })

  test('excludes categories when not included', () => {
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-13',
      include: { workoutSessions: false, exerciseLogs: false, nutritionLogs: false, personalRecords: false },
    })
    expect(result.workoutSessions).toBeUndefined()
    expect(result.nutritionLogs).toBeUndefined()
  })

  test('includes dateRange and exportedAt metadata', () => {
    const result = buildExportData({
      from: '2026-07-01', to: '2026-07-13',
      include: { workoutSessions: false, exerciseLogs: false, nutritionLogs: false, personalRecords: false },
    })
    expect(result.dateRange).toEqual({ from: '2026-07-01', to: '2026-07-13' })
    expect(result.exportedAt).toBeDefined()
  })
})
