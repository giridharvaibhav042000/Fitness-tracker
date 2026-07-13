import { useState } from 'react'
import { WORKOUT_MODES } from '../data/programs'

export function useWorkoutMode() {
  const [mode, setMode] = useState(
    () => localStorage.getItem('workoutMode') || WORKOUT_MODES.GYM_CALI
  )

  function applyMode(newMode) {
    localStorage.setItem('workoutMode', newMode)
    setMode(newMode)
  }

  return { mode, applyMode }
}
