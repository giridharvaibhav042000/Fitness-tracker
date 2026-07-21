import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const TIPS = [
  { title: 'Progressive Overload', body: 'Increase weight or reps each week by 2.5–5%. Track every set to spot plateaus early.' },
  { title: 'Rest & Recovery', body: 'Muscle grows during rest, not training. Aim for 7–9 hours sleep. Rest ≥48h before hitting the same muscle group.' },
  { title: 'Protein Timing', body: 'Hit your protein target daily — timing matters less than total intake. 1.6–2.2g per kg bodyweight.' },
  { title: 'Compound First', body: 'Start sessions with big compound lifts (Squat, Deadlift, Bench, Row) when energy is highest.' },
  { title: 'Mind-Muscle Connection', body: 'Slow the eccentric phase. Feel the target muscle working, not just moving weight from A to B.' },
  { title: 'Deload Weeks', body: 'Every 4–8 weeks, reduce volume by 40–50%. Prevents CNS fatigue and reduces injury risk.' },
]

export default function TrainingGuideScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-soft font-body">← Back</Text>
        </TouchableOpacity>
        <Text className="text-text font-display text-2xl mb-4">Training Guide</Text>
        {TIPS.map(tip => (
          <View key={tip.title} className="bg-card border border-border rounded-xl p-4 mb-3">
            <Text className="text-primary font-display text-base mb-2">{tip.title}</Text>
            <Text className="text-soft font-body text-sm" style={{ lineHeight: 20 }}>{tip.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
