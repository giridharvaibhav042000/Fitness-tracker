import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { analyzeText } from '../aiNutritionService'
import { supabase } from '../supabase'

vi.mock('../supabase')

const SAMPLE_FOODS = [
  { name: 'Chapati (2 piece)', protein: 6, carbs: 30, fats: 0.8, calories: 152, fiber: 2, sugar: 0, sodium: 180 },
  { name: 'Dal (1 cup cooked)', protein: 18, carbs: 40, fats: 0.8, calories: 230, fiber: 8, sugar: 2, sodium: 400 },
]

describe('aiNutritionService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('analyzeText returns parsed food array on success', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: SAMPLE_FOODS, error: null })
    const result = await analyzeText('2 chapatis and 1 bowl dal')
    expect(result).toEqual(SAMPLE_FOODS)
  })

  test('analyzeText calls analyze-meal function with correct body', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: SAMPLE_FOODS, error: null })
    await analyzeText('chapati')
    expect(supabase.functions.invoke).toHaveBeenCalledWith('analyze-meal', { body: { text: 'chapati' } })
  })

  test('analyzeText throws on supabase function error', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: null, error: { message: 'Function error' } })
    await expect(analyzeText('chapati')).rejects.toThrow('Function error')
  })

  test('analyzeText throws on empty data response', async () => {
    supabase.functions.invoke.mockResolvedValue({ data: null, error: null })
    await expect(analyzeText('chapati')).rejects.toThrow('Empty response from analyze-meal')
  })
})
