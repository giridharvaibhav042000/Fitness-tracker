import { View, Text } from 'react-native'

type Props = { label: string; value: number; target: number; color: string }

export default function MacroBar({ label, value, target, color }: Props) {
  const pct = Math.min(value / Math.max(target, 1), 1)
  return (
    <View className="mb-2">
      <View className="flex-row justify-between mb-1">
        <Text className="text-soft font-body text-xs">{label}</Text>
        <Text className="text-text font-mono text-xs">{Math.round(value)}g / {target}g</Text>
      </View>
      <View className="bg-border rounded-full h-2">
        <View className="rounded-full h-2" style={{ width: `${pct * 100}%`, backgroundColor: color }} />
      </View>
    </View>
  )
}
