import { View, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

type Props = { calories: number; target: number; size?: number }

export default function MacroRing({ calories, target, size = 100 }: Props) {
  const radius = (size - 16) / 2
  const circ   = 2 * Math.PI * radius
  const pct    = Math.min(calories / Math.max(target, 1), 1)
  const dash   = pct * circ

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={size/2} cy={size/2} r={radius} stroke="#2a2a2a" strokeWidth={8} fill="none" />
        <Circle cx={size/2} cy={size/2} r={radius} stroke="#a3e635" strokeWidth={8} fill="none"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          rotation={-90} origin={`${size/2},${size/2}`} />
      </Svg>
      <View className="absolute items-center">
        <Text className="text-primary font-display text-lg">{Math.round(calories)}</Text>
        <Text className="text-soft font-body text-xs">kcal</Text>
      </View>
    </View>
  )
}
