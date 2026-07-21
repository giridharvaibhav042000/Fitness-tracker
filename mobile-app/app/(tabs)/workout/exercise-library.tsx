import { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { getAllExercises } from '../../../src/data/workouts'

const ALL_EXERCISES = getAllExercises()

export default function ExerciseLibraryScreen() {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? ALL_EXERCISES.filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
    : ALL_EXERCISES

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
        <Text className="text-text font-display text-2xl mb-4">Exercise Library</Text>
        <TextInput
          className="bg-card border border-border text-text font-body px-4 py-3 rounded-xl mb-4"
          placeholder="Search exercises..."
          placeholderTextColor="#52525b"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.name}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        renderItem={({ item }) => (
          <View className="bg-card border border-border rounded-xl p-4 mb-2">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text className="text-text font-display text-sm">{item.name}</Text>
                <Text className="text-soft font-body text-xs">{item.muscle}</Text>
                <Text className="text-muted font-body text-xs">{item.sets} sets × {item.reps} reps</Text>
              </View>
              {item.youtube ? (
                <TouchableOpacity onPress={() => Linking.openURL(item.youtube)}
                  className="bg-warn/10 border border-warn/30 rounded-lg px-3 py-1 ml-2">
                  <Text className="text-warn font-body text-xs">▶ Watch</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text className="text-muted font-body text-center py-8">No exercises found</Text>}
      />
    </SafeAreaView>
  )
}
