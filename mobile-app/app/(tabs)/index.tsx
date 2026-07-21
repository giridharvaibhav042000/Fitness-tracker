import { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { getWorkoutStreak, getBestStreak } from '../../src/services/workoutService'
import { getLogsByDate, calcTotals, todayStr } from '../../src/services/nutritionService'
import MacroRing from '../../src/components/MacroRing'

const CALORIE_TARGET = 2500

export default function HomeScreen() {
  const [streak, setStreak]         = useState(0)
  const [best, setBest]             = useState(0)
  const [totals, setTotals]         = useState({ protein: 0, carbs: 0, fats: 0, fiber: 0 })
  const [calories, setCalories]     = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  async function load() {
    const [s, b, meals] = await Promise.all([
      getWorkoutStreak(),
      getBestStreak(),
      getLogsByDate(todayStr()),
    ])
    setStreak(s); setBest(b)
    const t = calcTotals(meals)
    setTotals(t)
    setCalories(t.protein * 4 + t.carbs * 4 + t.fats * 9)
  }

  useEffect(() => { load() }, [])

  const dateLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false) }} tintColor="#a3e635" />}
      >
        <Text className="text-primary font-display text-2xl">FITNESS</Text>
        <Text className="text-soft font-body text-sm mb-6">{dateLabel}</Text>

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-primary font-display text-3xl">{streak}</Text>
            <Text className="text-soft font-body text-xs">Day streak</Text>
          </View>
          <View className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-accent font-display text-3xl">{best}</Text>
            <Text className="text-soft font-body text-xs">Best streak</Text>
          </View>
        </View>

        <View className="bg-card border border-border rounded-xl p-4 mb-4 flex-row items-center">
          <MacroRing calories={calories} target={CALORIE_TARGET} size={90} />
          <View className="ml-4 flex-1">
            <Text className="text-text font-display text-base mb-1">Today's Calories</Text>
            <Text className="text-soft font-body text-xs">{Math.round(calories)} / {CALORIE_TARGET} kcal</Text>
            <Text className="text-soft font-body text-xs mt-1">P: {Math.round(totals.protein)}g  C: {Math.round(totals.carbs)}g  F: {Math.round(totals.fats)}g</Text>
          </View>
        </View>

        <Text className="text-soft font-body text-xs uppercase mb-2">Quick Log</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={() => router.push('/(tabs)/workout' as any)}
            className="flex-1 bg-primary/10 border border-primary/30 rounded-xl py-4 items-center">
            <Text className="text-primary font-display text-base">💪 Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition' as any)}
            className="flex-1 bg-accent/10 border border-accent/30 rounded-xl py-4 items-center">
            <Text className="text-accent font-display text-base">🥗 Meal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
