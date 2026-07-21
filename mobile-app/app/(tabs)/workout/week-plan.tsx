import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useWorkoutPlan } from '../../../src/hooks/useWorkoutPlan'

export default function WeekPlanScreen() {
  const { allWeeks, weekIndex, goal } = useWorkoutPlan()
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
        <Text className="text-text font-display text-2xl mb-1">6-Week Cycle</Text>
        <Text className="text-soft font-body text-sm mb-6 capitalize">{goal}</Text>
        {allWeeks.map((w: any, i: number) => (
          <View key={i} className={`bg-card border rounded-xl p-4 mb-3 ${i === weekIndex ? 'border-primary' : 'border-border'}`}>
            <Text className={`font-display text-base mb-1 ${i === weekIndex ? 'text-primary' : 'text-text'}`}>
              Week {i + 1}{i === weekIndex ? '  ← Current' : ''}
            </Text>
            <Text className="text-soft font-body text-xs">{w.sets} sets · {w.reps} reps · {w.rest}s rest</Text>
          </View>
        ))}
        {allWeeks.length === 0 && <Text className="text-muted font-body text-center py-8">Select a goal to see your cycle</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}
