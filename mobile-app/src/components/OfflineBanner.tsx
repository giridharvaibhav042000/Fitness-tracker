import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => setOffline(!state.isConnected))
    return () => unsub()
  }, [])

  if (!offline) return null
  return (
    <View style={{ backgroundColor: '#ef4444', paddingHorizontal: 16, paddingVertical: 8 }}>
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>
        No internet — changes saved locally
      </Text>
    </View>
  )
}
