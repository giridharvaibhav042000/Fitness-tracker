import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useProgress } from '../../../src/hooks/useProgress'

export default function ProgressScreen() {
  const { prs } = useProgress()
  const prList  = Object.entries(prs).sort(([a], [b]) => a.localeCompare(b))

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-text font-display text-2xl mb-4">Progress</Text>

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-soft font-body text-xs uppercase">Personal Records</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/progress/calculators' as any)}
            className="border border-accent/30 bg-accent/10 px-3 py-1 rounded-full">
            <Text className="text-accent font-body text-xs">Calculators</Text>
          </TouchableOpacity>
        </View>

        {prList.length === 0 && (
          <Text className="text-muted font-body text-sm text-center py-8">No PRs yet. Log your first workout!</Text>
        )}

        {prList.map(([exerciseName, pr]: any) => (
          <View key={exerciseName} className="bg-card border border-border rounded-xl px-4 py-3 mb-2">
            <Text className="text-text font-body">{exerciseName}</Text>
            <Text className="text-primary font-mono text-sm">{pr.weight}kg × {pr.reps} reps</Text>
            <Text className="text-muted font-body text-xs">{pr.achieved_at?.split('T')[0]}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
