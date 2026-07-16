import { supabase } from './supabase'

export async function analyzeText(text) {
  const { data, error } = await supabase.functions.invoke('analyze-meal', {
    body: { text },
  })
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Empty response from analyze-meal')
  return data
}
