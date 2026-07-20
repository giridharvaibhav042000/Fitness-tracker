import { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics'

type Props = { seconds: number; onDone: () => void }

export default function RestTimer({ seconds, onDone }: Props) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          onDone()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <View className="items-center py-4">
      <Text className="text-soft font-body text-sm mb-2">Rest Timer</Text>
      <Text className="text-primary font-mono text-4xl">
        {mins}:{String(secs).padStart(2, '0')}
      </Text>
      <TouchableOpacity onPress={onDone} className="mt-3 px-6 py-2 border border-border rounded-full">
        <Text className="text-soft font-body text-sm">Skip</Text>
      </TouchableOpacity>
    </View>
  )
}
