export const WEEK_CONFIG = [
  { week: 1, label: 'Foundation', sets: '3-4', reps: '10-12', note: 'Learn form, light weight' },
  { week: 2, label: 'Build Strength', sets: '4', reps: '8-12', note: 'Add weight each session' },
  { week: 3, label: 'Increase Volume', sets: '4-5', reps: '8-10', note: 'More sets, push harder' },
  { week: 4, label: 'Deload', sets: '3', reps: '12-15', note: '-20% weight, focus recovery' },
  { week: 5, label: 'Intensify', sets: '4-5', reps: '6-10', note: 'Heavy, near max effort' },
  { week: 6, label: 'Peak', sets: '4-5', reps: '6-8', note: 'Max effort, test your limits' },
]

// Set to Monday of Week 1. Change this when starting a new 6-week cycle.
export const PROGRAM_START_DATE = '2026-07-07'

export function getCurrentWeek() {
  const start = new Date(PROGRAM_START_DATE)
  const now = new Date()
  const weeksDiff = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 7))
  return Math.min(Math.max(weeksDiff + 1, 1), 6)
}

export function getCurrentWeekConfig() {
  return WEEK_CONFIG[getCurrentWeek() - 1]
}
