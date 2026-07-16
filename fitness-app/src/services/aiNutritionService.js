const OPENAI_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are a nutrition analysis assistant. When given a meal description, return ONLY a valid JSON array with nutritional data. No markdown, no explanation — raw JSON only.

Required format (numbers only, no units inside values):
[
  {
    "name": "Food name with serving (e.g. Chapati 2 piece)",
    "protein": 6,
    "carbs": 30,
    "fats": 0.8,
    "calories": 152,
    "fiber": 2,
    "sugar": 0,
    "sodium": 180
  }
]

Use standard nutritional values per the serving size described. Return one object per distinct food item.`

export async function analyzeText(text) {
  const key = import.meta.env.VITE_GROQ_API_KEY
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analyze this meal: "${text}"` },
      ],
      temperature: 0,
    }),
  })
  if (!res.ok) throw new Error(String(res.status))
  const data = await res.json()
  const raw = data.choices?.[0]?.message?.content
  if (!raw) throw new Error('Empty response from OpenAI')
  const json = raw.replace(/```(?:json)?\n?|\n?```/g, '').trim()
  return JSON.parse(json)
}
