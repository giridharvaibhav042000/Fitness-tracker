import { supabase } from './supabase'

const LS_QUEUE = 'offlineQueue'

export async function flushOfflineQueue() {
  const queue = JSON.parse(localStorage.getItem(LS_QUEUE) || '[]')
  if (queue.length === 0) return

  const remaining = []
  for (const item of queue) {
    const { error } = await supabase.from(item.table).upsert(item.record)
    if (error) remaining.push(item)
  }

  localStorage.setItem(LS_QUEUE, JSON.stringify(remaining))
}

export function registerOnlineListener() {
  window.addEventListener('online', flushOfflineQueue)
}
