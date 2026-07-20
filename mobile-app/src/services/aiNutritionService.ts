import { supabase } from './supabase'

export async function analyzeText(text: string) {
  const { data, error } = await supabase.functions.invoke('analyze-meal', { body: { text } })
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Empty response from analyze-meal')
  return data
}

export async function analyzeImage(base64: string) {
  const { data, error } = await supabase.functions.invoke('analyze-meal', { body: { image: base64 } })
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Empty response from analyze-meal')
  return data
}
