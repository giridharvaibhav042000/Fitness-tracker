import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { supabase } from './supabase'

const KEY_QUEUE = 'offlineQueue'

export async function flushOfflineQueue() {
  const raw = await AsyncStorage.getItem(KEY_QUEUE)
  const queue = JSON.parse(raw ?? '[]')
  if (!queue.length) return
  const remaining: any[] = []
  for (const item of queue) {
    const { error } = await supabase.from(item.table).upsert(item.record)
    if (error) remaining.push(item)
  }
  await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify(remaining))
}

export function registerOnlineListener() {
  NetInfo.addEventListener(state => {
    if (state.isConnected) flushOfflineQueue()
  })
}
