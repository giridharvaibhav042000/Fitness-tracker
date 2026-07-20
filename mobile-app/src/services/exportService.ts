import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export async function buildExportData({ from, to, include }: { from: string; to: string; include: Record<string, boolean> }) {
  const result: any = { exportedAt: new Date().toISOString(), dateRange: { from, to } }

  if (include.workoutSessions) {
    const all = JSON.parse((await AsyncStorage.getItem('workoutSessions')) ?? '[]')
    result.workoutSessions = all.filter((s: any) => s.date >= from && s.date <= to)
  }
  if (include.exerciseLogs) {
    const all = JSON.parse((await AsyncStorage.getItem('exerciseLogs')) ?? '[]')
    result.exerciseLogs = all.filter((l: any) => (l.completed_at?.split('T')[0] ?? '') >= from && (l.completed_at?.split('T')[0] ?? '') <= to)
  }
  if (include.nutritionLogs) {
    const all = JSON.parse((await AsyncStorage.getItem('nutritionLogs')) ?? '[]')
    result.nutritionLogs = all.filter((l: any) => l.date >= from && l.date <= to)
  }
  if (include.personalRecords) {
    const prs = JSON.parse((await AsyncStorage.getItem('personalRecords')) ?? '{}')
    result.personalRecords = Object.fromEntries(
      Object.entries(prs).filter(([, pr]: any) => (pr.achieved_at?.split('T')[0] ?? '') >= from && (pr.achieved_at?.split('T')[0] ?? '') <= to)
    )
  }
  return result
}

export async function shareExport(data: object, from: string, to: string) {
  const json = JSON.stringify(data, null, 2)
  const path = FileSystem.documentDirectory + `fitness-export-${from}-to-${to}.json`
  await FileSystem.writeAsStringAsync(path, json, { encoding: FileSystem.EncodingType.UTF8 })
  await Sharing.shareAsync(path, { mimeType: 'application/json', dialogTitle: 'Export Fitness Data' })
}
