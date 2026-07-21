import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useWorkoutMode } from '../../../src/hooks/useWorkoutMode'
import { useWorkoutPlan } from '../../../src/hooks/useWorkoutPlan'
import { WORKOUT_MODES, MODE_LABELS } from '../../../src/data/programs'
import { GOALS, GOAL_META } from '../../../src/data/variations'
import { DAY_ORDER, DAY_LABELS } from '../../../src/data/workouts'

const DAYS = [...DAY_ORDER, 'sunday']

export default function WorkoutScreen() {
  const { mode, applyMode } = useWorkoutMode()
  const { goal, setGoal, weekIndex, modifier } = useWorkoutPlan()

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-text font-display text-2xl mb-1">Workout</Text>
        {modifier && (
          <Text className="text-soft font-body text-xs mb-4">Week {weekIndex + 1} · {modifier.label} · {modifier.sets} sets × {modifier.reps}</Text>
        )}

        {/* Mode selector */}
        <Text className="text-soft font-body text-xs uppercase mb-2">Mode</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {Object.entries(WORKOUT_MODES).map(([key, value]) => (
              <TouchableOpacity key={key} onPress={() => applyMode(value)}
                className={`px-4 py-2 rounded-full border ${mode === value ? 'bg-primary border-primary' : 'border-border'}`}>
                <Text className={mode === value ? 'text-bg font-display text-sm' : 'text-soft font-body text-sm'}>
                  {MODE_LABELS[value]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Goal selector */}
        <Text className="text-soft font-body text-xs uppercase mb-2">Goal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {Object.entries(GOALS).map(([key, value]) => (
              <TouchableOpacity key={key} onPress={() => setGoal(value)}
                className={`px-4 py-2 rounded-full border ${goal === value ? 'bg-accent border-accent' : 'border-border'}`}>
                <Text className={goal === value ? 'text-bg font-display text-sm' : 'text-soft font-body text-sm'}>
                  {GOAL_META[value]?.label ?? value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Day buttons */}
        <Text className="text-soft font-body text-xs uppercase mb-2">Days</Text>
        {DAYS.map(day => (
          <TouchableOpacity key={day} onPress={() => router.push(`/(tabs)/workout/${day}` as any)}
            className="bg-card border border-border rounded-xl p-4 mb-2 flex-row justify-between items-center">
            <View>
              <Text className="text-text font-display text-sm capitalize">{day}</Text>
              {DAY_LABELS[day as keyof typeof DAY_LABELS] && (
                <Text className="text-soft font-body text-xs">{DAY_LABELS[day as keyof typeof DAY_LABELS]}</Text>
              )}
              {day === 'sunday' && <Text className="text-soft font-body text-xs">Rest Day</Text>}
            </View>
            <Text className="text-muted font-body text-lg">›</Text>
          </TouchableOpacity>
        ))}

        {/* Sub-screen links */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/workout/week-plan' as any)}
            className="flex-1 bg-card border border-border rounded-xl py-3 items-center">
            <Text className="text-text font-display text-sm">📅 Week Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/workout/exercise-library' as any)}
            className="flex-1 bg-card border border-border rounded-xl py-3 items-center">
            <Text className="text-text font-display text-sm">📚 Library</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
