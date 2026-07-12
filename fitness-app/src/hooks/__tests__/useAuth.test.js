import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'

vi.mock('../../services/supabase')

describe('useAuth', () => {
  test('starts loading=true, resolves to user=null with no session', async () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.loading).toBe(true)
    await act(async () => {})
    expect(result.current.loading).toBe(false)
    expect(result.current.user).toBeNull()
  })

  test('exposes signIn and signOut functions', async () => {
    const { result } = renderHook(() => useAuth())
    await act(async () => {})
    expect(typeof result.current.signIn).toBe('function')
    expect(typeof result.current.signOut).toBe('function')
  })
})
