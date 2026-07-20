import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WORKOUT_MODES } from '../data/programs'

export function useWorkoutMode() {
  const [mode, setMode] = useState<string>(WORKOUT_MODES.GYM_CALI)

  useEffect(() => {
    AsyncStorage.getItem('workoutMode').then(v => { if (v) setMode(v) })
  }, [])

  async function applyMode(newMode: string) {
    await AsyncStorage.setItem('workoutMode', newMode)
    setMode(newMode)
  }

  return { mode, applyMode }
}
