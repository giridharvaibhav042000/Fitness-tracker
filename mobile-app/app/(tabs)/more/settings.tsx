import { useState } from 'react'
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { buildExportData, shareExport } from '../../../src/services/exportService'
import { todayStr } from '../../../src/services/nutritionService'

const LABELS: Record<string, string> = {
  workoutSessions: 'Workout Sessions',
  exerciseLogs: 'Exercise Logs',
  nutritionLogs: 'Nutrition Logs',
  personalRecords: 'Personal Records',
}

export default function SettingsScreen() {
  const today    = todayStr()
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
  const [include, setInclude] = useState({ workoutSessions: true, exerciseLogs: true, nutritionLogs: true, personalRecords: true })
  const [exporting, setExporting] = useState(false)

  function toggle(key: keyof typeof include) {
    setInclude(prev => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleExport() {
    setExporting(true)
    try {
      const data = await buildExportData({ from: monthAgo, to: today, include })
      await shareExport(data, monthAgo, today)
    } catch (e: any) {
      Alert.alert('Export failed', e.message)
    } finally {
      setExporting(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
        <Text className="text-text font-display text-2xl mb-4">Settings</Text>
        <Text className="text-soft font-body text-xs uppercase mb-2">Export Data (Last 30 Days)</Text>

        {(Object.keys(include) as Array<keyof typeof include>).map(key => (
          <View key={key} className="flex-row justify-between items-center bg-card border border-border rounded-xl px-4 py-3 mb-2">
            <Text className="text-text font-body">{LABELS[key]}</Text>
            <Switch
              value={include[key]}
              onValueChange={() => toggle(key)}
              trackColor={{ false: '#2a2a2a', true: '#a3e635' }}
              thumbColor="#f5f5f5"
            />
          </View>
        ))}

        <TouchableOpacity onPress={handleExport} disabled={exporting}
          className="mt-4 bg-primary py-4 rounded-lg items-center">
          {exporting ? <ActivityIndicator color="#0f0f0f" /> : <Text className="text-bg font-display">Export to Device</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
