import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

function calcBMI(weight: number, heightCm: number) {
  return weight / Math.pow(heightCm / 100, 2)
}

function calcBMR(weight: number, heightCm: number, age: number, male: boolean) {
  return male
    ? 88.362 + 13.397 * weight + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weight + 3.098 * heightCm - 4.330 * age
}

function calcOneRM(weight: number, reps: number) {
  return weight * (1 + reps / 30)
}

export default function CalculatorsScreen() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge]       = useState('')
  const [male, setMale]     = useState(true)
  const [liftW, setLiftW]   = useState('')
  const [liftR, setLiftR]   = useState('')

  const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age)
  const bmiVal = w && h ? calcBMI(w, h) : null
  const bmrVal = w && h && a ? calcBMR(w, h, a, male) : null
  const rmVal  = parseFloat(liftW) && parseInt(liftR) ? calcOneRM(parseFloat(liftW), parseInt(liftR)) : null
  const bmiCat = !bmiVal ? null : bmiVal < 18.5 ? 'Underweight' : bmiVal < 25 ? 'Normal' : bmiVal < 30 ? 'Overweight' : 'Obese'

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-soft font-body">← Back</Text>
          </TouchableOpacity>
          <Text className="text-text font-display text-2xl mb-4">Calculators</Text>

          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-soft font-body text-xs uppercase mb-3">BMI / BMR</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
              {[['Weight (kg)', weight, setWeight], ['Height (cm)', height, setHeight], ['Age', age, setAge]].map(([label, val, set]: any) => (
                <View key={label} style={{ flex: 1 }}>
                  <Text className="text-muted font-body text-xs mb-1">{label}</Text>
                  <TextInput className="bg-surface border border-border text-text font-mono px-2 py-2 rounded-lg text-center"
                    value={val} onChangeText={set} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#52525b" />
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
              {['Male', 'Female'].map((s, i) => (
                <TouchableOpacity key={s} onPress={() => setMale(i === 0)} style={{ flex: 1 }}
                  className={`py-2 rounded-lg border items-center ${male === (i === 0) ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <Text className={male === (i === 0) ? 'text-primary font-body' : 'text-muted font-body'}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {bmiVal != null && <Text className="text-text font-body mb-1">BMI: <Text className="text-primary font-mono">{bmiVal.toFixed(1)}</Text> ({bmiCat})</Text>}
            {bmrVal != null && <Text className="text-text font-body">BMR: <Text className="text-primary font-mono">{Math.round(bmrVal)}</Text> kcal/day</Text>}
            {bmrVal != null && <Text className="text-soft font-body text-xs mt-1">TDEE (moderate): {Math.round(bmrVal * 1.55)} kcal</Text>}
          </View>

          <View className="bg-card border border-border rounded-xl p-4">
            <Text className="text-soft font-body text-xs uppercase mb-3">1RM Calculator (Epley)</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
              <View style={{ flex: 1 }}>
                <Text className="text-muted font-body text-xs mb-1">Weight (kg)</Text>
                <TextInput className="bg-surface border border-border text-text font-mono px-2 py-2 rounded-lg text-center"
                  value={liftW} onChangeText={setLiftW} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#52525b" />
              </View>
              <View style={{ flex: 1 }}>
                <Text className="text-muted font-body text-xs mb-1">Reps</Text>
                <TextInput className="bg-surface border border-border text-text font-mono px-2 py-2 rounded-lg text-center"
                  value={liftR} onChangeText={setLiftR} keyboardType="number-pad" placeholder="0" placeholderTextColor="#52525b" />
              </View>
            </View>
            {rmVal != null && <Text className="text-text font-body mt-2">Estimated 1RM: <Text className="text-primary font-display text-lg">{Math.round(rmVal)}kg</Text></Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
