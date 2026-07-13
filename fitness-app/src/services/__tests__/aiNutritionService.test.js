import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { analyzeText } from '../aiNutritionService'

const SAMPLE_FOODS = [
  { name: 'Chapati (2 piece)', protein: 6, carbs: 30, fats: 0.8, calories: 152, fiber: 2, sugar: 0, sodium: 180 },
  { name: 'Dal (1 cup cooked)', protein: 18, carbs: 40, fats: 0.8, calories: 230, fiber: 8, sugar: 2, sodium: 400 },
]

function mockFetch(responseBody, ok = true, status = 200) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => responseBody,
  }))
}

function geminiResponse(text) {
  return { candidates: [{ content: { parts: [{ text }] } }] }
}

describe('aiNutritionService', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key-123')
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  test('analyzeText returns parsed food array on valid response', async () => {
    mockFetch(geminiResponse(JSON.stringify(SAMPLE_FOODS)))
    const result = await analyzeText('2 chapatis and 1 bowl dal')
    expect(result).toEqual(SAMPLE_FOODS)
  })

  test('analyzeText strips markdown code fences from response', async () => {
    const wrapped = '```json\n' + JSON.stringify(SAMPLE_FOODS) + '\n```'
    mockFetch(geminiResponse(wrapped))
    const result = await analyzeText('2 chapatis and 1 bowl dal')
    expect(result).toEqual(SAMPLE_FOODS)
  })

  test('analyzeText includes API key in request URL', async () => {
    mockFetch(geminiResponse(JSON.stringify(SAMPLE_FOODS)))
    await analyzeText('chapati')
    const [url] = vi.mocked(fetch).mock.calls[0]
    expect(url).toContain('key=test-key-123')
  })

  test('analyzeText throws with status code on non-ok response', async () => {
    mockFetch({}, false, 401)
    await expect(analyzeText('chapati')).rejects.toThrow('401')
  })

  test('analyzeText throws on malformed JSON in response', async () => {
    mockFetch(geminiResponse('not valid json at all'))
    await expect(analyzeText('chapati')).rejects.toThrow(SyntaxError)
  })
})
