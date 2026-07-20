import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

type Props = {
  exerciseName: string
  setNumber: number
  defaultWeight: number
  defaultReps: number
  onSave: (weight: number, reps: number) => void
  onCancel: () => void
}

export default function SetLogger({ exerciseName, setNumber, defaultWeight, defaultReps, onSave, onCancel }: Props) {
  const [weight, setWeight] = useState(defaultWeight ? String(defaultWeight) : '')
  const [reps, setReps]     = useState(defaultReps ? String(defaultReps) : '')
  const [unit, setUnit]     = useState<'kg' | 'lbs'>('kg')

  function handleSave() {
    const w = parseFloat(weight)
    const r = parseInt(reps)
    if (!w || !r) return
    const kg = unit === 'lbs' ? parseFloat((w * 0.453592).toFixed(2)) : w
    onSave(kg, r)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="bg-surface p-6 rounded-t-2xl">
        <Text className="text-text font-display text-lg mb-1">{exerciseName}</Text>
        <Text className="text-soft font-body text-sm mb-4">Set {setNumber}</Text>

        <View className="flex-row gap-2 mb-4">
          {(['kg', 'lbs'] as const).map(u => (
            <TouchableOpacity key={u} onPress={() => setUnit(u)}
              className={`flex-1 py-2 rounded-lg items-center border ${unit === u ? 'border-primary bg-primary/10' : 'border-border'}`}>
              <Text className={unit === u ? 'text-primary font-body' : 'text-soft font-body'}>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row gap-3 mb-6">
          <View className="flex-1">
            <Text className="text-soft font-body text-xs mb-1">Weight ({unit})</Text>
            <TextInput className="bg-card border border-border text-text font-mono text-xl px-4 py-3 rounded-lg text-center"
              value={weight} onChangeText={setWeight} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#52525b" />
          </View>
          <View className="flex-1">
            <Text className="text-soft font-body text-xs mb-1">Reps</Text>
            <TextInput className="bg-card border border-border text-text font-mono text-xl px-4 py-3 rounded-lg text-center"
              value={reps} onChangeText={setReps} keyboardType="number-pad" placeholder="0" placeholderTextColor="#52525b" />
          </View>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity onPress={onCancel} className="flex-1 py-3 border border-border rounded-lg items-center">
            <Text className="text-soft font-body">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} className="flex-1 py-3 bg-primary rounded-lg items-center">
            <Text className="text-bg font-display">Save Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
