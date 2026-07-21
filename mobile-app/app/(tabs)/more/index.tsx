import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuth } from '../../../src/hooks/useAuth'

const ITEMS = [
  { label: 'Training Guide', route: '/(tabs)/more/training-guide', icon: '📖' },
  { label: 'Settings & Export', route: '/(tabs)/more/settings', icon: '⚙️' },
]

export default function MoreScreen() {
  const { signOut } = useAuth()
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-text font-display text-2xl mb-6">More</Text>
        {ITEMS.map(item => (
          <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)}
            className="bg-card border border-border rounded-xl px-4 py-4 mb-3 flex-row items-center">
            <Text className="text-xl" style={{ marginRight: 12 }}>{item.icon}</Text>
            <Text className="text-text font-body flex-1">{item.label}</Text>
            <Text className="text-muted">›</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={signOut}
          className="mt-4 border border-danger/30 bg-danger/10 rounded-xl py-4 items-center">
          <Text className="text-danger font-body">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
