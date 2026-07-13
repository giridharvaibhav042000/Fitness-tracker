const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

function buildPrompt(text) {
  return `Analyze this meal description and return ONLY a valid JSON array.
No markdown, no explanation — raw JSON only.

Meal: "${text}"

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

Use standard nutritional values per the serving size described.
Return one object per distinct food item.`
}

export async function analyzeText(text) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(text) }] }],
    }),
  })
  if (!res.ok) throw new Error(String(res.status))
  const data = await res.json()
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  const json = raw.replace(/```json?|```/g, '').trim()
  return JSON.parse(json)
}
