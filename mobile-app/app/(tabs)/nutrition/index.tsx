import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useNutrition } from '../../../src/hooks/useNutrition'
import MacroBar from '../../../src/components/MacroBar'

const TARGETS = { protein: 180, carbs: 250, fats: 70 }

export default function NutritionScreen() {
  const { meals, totals, removeMeal, selectedDate, changeDate, todayStr } = useNutrition()
  const calories = totals.protein * 4 + totals.carbs * 4 + totals.fats * 9
  const isToday  = selectedDate === todayStr

  function shiftDate(n: number) {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + n)
    changeDate(d.toISOString().split('T')[0])
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => shiftDate(-1)} style={{ padding: 8 }}>
            <Text className="text-soft text-xl">‹</Text>
          </TouchableOpacity>
          <Text className="text-text font-body">{isToday ? 'Today' : selectedDate}</Text>
          <TouchableOpacity onPress={() => shiftDate(1)} disabled={isToday} style={{ padding: 8 }}>
            <Text className={isToday ? 'text-muted text-xl' : 'text-soft text-xl'}>›</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-card border border-border rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-baseline mb-3">
            <Text className="text-text font-display text-lg">Macros</Text>
            <Text className="text-primary font-mono text-sm">{Math.round(calories)} kcal</Text>
          </View>
          <MacroBar label="Protein" value={totals.protein} target={TARGETS.protein} color="#60a5fa" />
          <MacroBar label="Carbs"   value={totals.carbs}   target={TARGETS.carbs}   color="#fb923c" />
          <MacroBar label="Fats"    value={totals.fats}    target={TARGETS.fats}    color="#facc15" />
        </View>

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-soft font-body text-xs uppercase">Meals</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition/add-meal' as any)}
            className="bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
            <Text className="text-primary font-body text-xs">+ Add Meal</Text>
          </TouchableOpacity>
        </View>

        {meals.length === 0 && (
          <Text className="text-muted font-body text-sm text-center py-8">
            No meals logged{isToday ? ' today' : ` on ${selectedDate}`}
          </Text>
        )}

        {meals.map(meal => (
          <View key={meal.id} className="bg-card border border-border rounded-xl px-4 py-3 mb-2 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-text font-body">{meal.name ?? 'Meal'}</Text>
              <Text className="text-muted font-body text-xs">P:{meal.protein}g  C:{meal.carbs}g  F:{meal.fats}g</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Remove meal', 'Delete this meal?', [
              { text: 'Cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => removeMeal(meal.id) }
            ])}>
              <Text className="text-danger font-body text-sm">✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition/weekly-summary' as any)}
          className="mt-4 border border-border rounded-xl py-3 items-center">
          <Text className="text-soft font-body text-sm">View Weekly Summary →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
