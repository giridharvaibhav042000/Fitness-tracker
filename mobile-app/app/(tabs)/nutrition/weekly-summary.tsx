import { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { getWeekLogs } from '../../../src/services/nutritionService'

export default function WeeklySummaryScreen() {
  const [week, setWeek] = useState<Record<string, any>>({})
  useEffect(() => { getWeekLogs().then(setWeek) }, [])
  const days = Object.keys(week).sort()

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
        <Text className="text-text font-display text-2xl mb-4">Weekly Summary</Text>
        {days.length === 0 && <Text className="text-muted font-body text-center py-8">No data this week</Text>}
        {days.map(d => (
          <View key={d} className="bg-card border border-border rounded-xl px-4 py-3 mb-2">
            <Text className="text-soft font-body text-xs mb-1">{d}</Text>
            <Text className="text-text font-body">P:{Math.round(week[d].protein)}g  C:{Math.round(week[d].carbs)}g  F:{Math.round(week[d].fats)}g</Text>
            <Text className="text-primary font-mono text-sm">{Math.round(week[d].calories)} kcal</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
