import { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useWorkout } from '../../../src/hooks/useWorkout'
import { useProgress } from '../../../src/hooks/useProgress'
import { useWorkoutMode } from '../../../src/hooks/useWorkoutMode'
import ExerciseCard from '../../../src/components/ExerciseCard'
import SetLogger from '../../../src/components/SetLogger'
import RestTimer from '../../../src/components/RestTimer'
import { WORKOUT_DATA, DAY_LABELS, isRestDay } from '../../../src/data/workouts'

type SetLoggerState = {
  exercise: any
  setNumber: number
  defaultWeight: number
  defaultReps: number
} | null

export default function DayScreen() {
  const { day } = useLocalSearchParams<{ day: string }>()
  const { mode } = useWorkoutMode()
  const { session, logs, recordSet, editSet, getLastSet } = useWorkout(day, 'gym')
  const { newPR, checkAndSavePR } = useProgress()

  const [lastSets, setLastSets]         = useState<Record<string, any>>({})
  const [setLoggerState, setSetLoggerState] = useState<SetLoggerState>(null)
  const [restSeconds, setRestSeconds]   = useState<number | null>(null)
  const [showRest, setShowRest]         = useState(false)

  // Determine which exercises to show based on mode
  const dayData = WORKOUT_DATA[day as keyof typeof WORKOUT_DATA]
  const isRest  = !dayData || isRestDay(day)

  const gymExercises  = dayData?.gym  ?? []
  const caliExercises = dayData?.cali ?? []

  let exercises: any[] = []
  if (mode === 'gym+cali') exercises = [...gymExercises, ...caliExercises]
  else if (mode === 'gym')  exercises = gymExercises
  else if (mode === 'cali') exercises = caliExercises
  else exercises = gymExercises // hiit/warmup fallback

  // Load last sets for all exercises
  useEffect(() => {
    if (!session || exercises.length === 0) return
    Promise.all(
      exercises.map(async ex => {
        const last = await getLastSet(ex.name)
        return [ex.name, last] as const
      })
    ).then(entries => {
      setLastSets(Object.fromEntries(entries))
    })
  }, [session, day, mode])

  const handleLogSet = useCallback((exercise: any, setNumber: number, weight: number, reps: number) => {
    setSetLoggerState({ exercise, setNumber, defaultWeight: weight, defaultReps: reps })
  }, [])

  const handleSaveSet = useCallback(async (weight: number, reps: number) => {
    if (!setLoggerState) return
    const { exercise, setNumber } = setLoggerState
    setSetLoggerState(null)

    const log = await recordSet(exercise, setNumber, weight, reps)
    if (log) {
      await checkAndSavePR({ exercise_name: exercise.name, weight, reps })
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setRestSeconds(exercise.rest ?? 60)
      setShowRest(true)
    }
  }, [setLoggerState, recordSet, checkAndSavePR])

  const dayLabel = DAY_LABELS[day as keyof typeof DAY_LABELS] ?? day

  if (isRest) {
    return (
      <SafeAreaView className="flex-1 bg-bg items-center justify-center">
        <Text className="text-text font-display text-2xl mb-2">Rest Day</Text>
        <Text className="text-soft font-body text-sm">Recovery & light activity</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-8 px-6 py-3 border border-border rounded-full">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      {/* PR Toast */}
      {newPR && (
        <View className="absolute top-16 left-4 right-4 z-50 bg-accent rounded-xl p-3 items-center">
          <Text className="text-bg font-display text-base">🏆 New PR: {newPR}!</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} className="mb-2">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
        <Text className="text-text font-display text-xl mb-1 capitalize">{day}</Text>
        <Text className="text-soft font-body text-xs mb-4">{dayLabel}</Text>

        {!session && (
          <ActivityIndicator color="#a3e635" style={{ marginVertical: 32 }} />
        )}

        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.name}
            exercise={exercise}
            logs={logs}
            lastSet={lastSets[exercise.name] ?? null}
            onLogSet={(setNumber, weight, reps) => handleLogSet(exercise, setNumber, weight, reps)}
            onEditSet={editSet}
          />
        ))}

        {exercises.length === 0 && session && (
          <Text className="text-muted font-body text-center py-8">No exercises for this mode today</Text>
        )}
      </ScrollView>

      {/* SetLogger Modal */}
      <Modal
        visible={!!setLoggerState}
        transparent
        animationType="slide"
        onRequestClose={() => setSetLoggerState(null)}
      >
        <View className="flex-1 justify-end bg-black/50">
          {setLoggerState && (
            <SetLogger
              exerciseName={setLoggerState.exercise.name}
              setNumber={setLoggerState.setNumber}
              defaultWeight={setLoggerState.defaultWeight}
              defaultReps={setLoggerState.defaultReps}
              onSave={handleSaveSet}
              onCancel={() => setSetLoggerState(null)}
            />
          )}
        </View>
      </Modal>

      {/* Rest Timer Modal */}
      <Modal
        visible={showRest}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRest(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-surface border border-border rounded-2xl p-6 mx-4 w-72">
            {restSeconds !== null && (
              <RestTimer seconds={restSeconds} onDone={() => setShowRest(false)} />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
