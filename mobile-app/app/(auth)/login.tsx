import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'

export default function LoginScreen() {
  const { signIn }        = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass]   = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy]   = useState(false)

  async function handleLogin() {
    if (!email || !pass) { setError('Enter email and password'); return }
    setBusy(true); setError('')
    const { error: e } = await signIn(email, pass)
    setBusy(false)
    if (e) { setError(e.message); return }
    router.replace('/(tabs)')
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-bg">
      <View className="flex-1 justify-center px-6">
        <Text className="text-primary font-display text-4xl mb-2">FITNESS</Text>
        <Text className="text-soft font-body text-base mb-10">Track. Progress. Perform.</Text>

        <TextInput
          className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg mb-3"
          placeholder="Email" placeholderTextColor="#52525b"
          value={email} onChangeText={setEmail}
          autoCapitalize="none" keyboardType="email-address"
        />
        <TextInput
          className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg mb-4"
          placeholder="Password" placeholderTextColor="#52525b"
          value={pass} onChangeText={setPass} secureTextEntry
        />

        {!!error && <Text className="text-danger font-body text-sm mb-3">{error}</Text>}

        <TouchableOpacity onPress={handleLogin} disabled={busy}
          className="bg-primary py-4 rounded-lg items-center">
          {busy ? <ActivityIndicator color="#0f0f0f" /> : <Text className="text-bg font-display text-base">Sign In</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
