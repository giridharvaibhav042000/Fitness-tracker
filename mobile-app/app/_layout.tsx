import '../global.css'
import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAuth } from '../src/hooks/useAuth'
import { registerOnlineListener } from '../src/services/offlineSync'
import OfflineBanner from '../src/components/OfflineBanner'

export default function RootLayout() {
  const { user, loading } = useAuth()

  useEffect(() => { registerOnlineListener() }, [])

  useEffect(() => {
    if (loading) return
    if (!user) router.replace('/(auth)/login')
  }, [user, loading])

  return (
    <SafeAreaProvider>
      <OfflineBanner />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  )
}
