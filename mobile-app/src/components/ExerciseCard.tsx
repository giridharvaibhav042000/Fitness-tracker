import { View, Text, TouchableOpacity } from 'react-native'

type Props = {
  exercise: { name: string; sets: number; reps: string; compulsory?: boolean }
  logs: any[]
  lastSet: { weight: number; reps: number } | null
  onLogSet: (setNumber: number, weight: number, reps: number) => void
  onEditSet: (logId: string, weight: number, reps: number) => void
}

export default function ExerciseCard({ exercise, logs, lastSet, onLogSet, onEditSet }: Props) {
  const logged = logs.filter(l => l.exercise_name === exercise.name)
  const done   = logged.length >= exercise.sets
  const suggestWeight = lastSet ? lastSet.weight + 2.5 : null

  return (
    <View className="bg-card border border-border rounded-xl p-4 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-text font-display text-base">{exercise.name}</Text>
          <Text className="text-soft font-body text-xs">{exercise.sets} sets × {exercise.reps} reps</Text>
        </View>
        {done && <View className="bg-primary/20 px-2 py-1 rounded"><Text className="text-primary font-body text-xs">Done</Text></View>}
      </View>

      {suggestWeight !== null && !done && (
        <Text className="text-accent font-body text-xs mb-2">↑ Try {suggestWeight}kg (last: {lastSet!.weight}kg × {lastSet!.reps})</Text>
      )}

      <View className="flex-row flex-wrap gap-2">
        {logged.map((log) => (
          <View key={log.id} className="bg-surface border border-border rounded px-2 py-1">
            <Text className="text-text font-mono text-xs">{log.weight}kg × {log.reps}</Text>
          </View>
        ))}
        {!done && (
          <TouchableOpacity
            onPress={() => onLogSet(logged.length + 1, lastSet?.weight ?? 0, parseInt(exercise.reps) || 8)}
            className="bg-primary/10 border border-primary/30 rounded px-3 py-1">
            <Text className="text-primary font-body text-xs">+ Set {logged.length + 1}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
