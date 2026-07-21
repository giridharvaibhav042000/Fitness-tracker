import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { useNutrition } from '../../../src/hooks/useNutrition'
import { analyzeText, analyzeImage } from '../../../src/services/aiNutritionService'

export default function AddMealScreen() {
  const { addMeal }              = useNutrition()
  const [name, setName]          = useState('')
  const [protein, setProtein]    = useState('')
  const [carbs, setCarbs]        = useState('')
  const [fats, setFats]          = useState('')
  const [calories, setCalories]  = useState('')
  const [aiText, setAiText]      = useState('')
  const [analyzing, setAnalyzing] = useState(false)

  function fillFromAI(result: any) {
    if (result.name)     setName(String(result.name))
    if (result.protein)  setProtein(String(result.protein))
    if (result.carbs)    setCarbs(String(result.carbs))
    if (result.fats)     setFats(String(result.fats))
    if (result.calories) setCalories(String(result.calories))
  }

  async function handleAIText() {
    if (!aiText.trim()) return
    setAnalyzing(true)
    try { fillFromAI(await analyzeText(aiText)) }
    catch (e: any) { Alert.alert('AI Error', e.message) }
    finally { setAnalyzing(false) }
  }

  async function handleCamera() {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) { Alert.alert('Permission needed', 'Camera access required'); return }
    const result = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.5 })
    if (result.canceled || !result.assets[0].base64) return
    setAnalyzing(true)
    try { fillFromAI(await analyzeImage(result.assets[0].base64)) }
    catch (e: any) { Alert.alert('AI Error', e.message) }
    finally { setAnalyzing(false) }
  }

  async function handleSave() {
    if (!protein && !carbs && !fats) { Alert.alert('Enter macros'); return }
    await addMeal({
      name: name || 'Meal',
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fats: parseFloat(fats) || 0,
      calories: parseFloat(calories) || 0,
      fiber: 0,
    })
    router.back()
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-soft font-body">← Back</Text>
          </TouchableOpacity>
          <Text className="text-text font-display text-2xl mb-4">Add Meal</Text>

          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-soft font-body text-xs uppercase mb-2">AI Analysis</Text>
            <TextInput className="bg-surface border border-border text-text font-body px-3 py-2 rounded-lg mb-2"
              placeholder="Describe your meal..." placeholderTextColor="#52525b"
              value={aiText} onChangeText={setAiText} multiline />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={handleAIText} disabled={analyzing}
                className="flex-1 bg-primary/10 border border-primary/30 py-2 rounded-lg items-center">
                {analyzing ? <ActivityIndicator color="#a3e635" size="small" /> : <Text className="text-primary font-body text-sm">Analyze Text</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCamera} disabled={analyzing}
                className="flex-1 bg-accent/10 border border-accent/30 py-2 rounded-lg items-center">
                <Text className="text-accent font-body text-sm">📷 Photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg mb-3"
            placeholder="Meal name" placeholderTextColor="#52525b" value={name} onChangeText={setName} />

          {([['Protein (g)', protein, setProtein], ['Carbs (g)', carbs, setCarbs], ['Fats (g)', fats, setFats], ['Calories', calories, setCalories]] as const).map(([label, value, setter]) => (
            <TextInput key={label}
              className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg mb-3"
              placeholder={label} placeholderTextColor="#52525b"
              value={value} onChangeText={setter as any} keyboardType="decimal-pad" />
          ))}

          <TouchableOpacity onPress={handleSave} className="bg-primary py-4 rounded-lg items-center mt-2">
            <Text className="text-bg font-display">Save Meal</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
