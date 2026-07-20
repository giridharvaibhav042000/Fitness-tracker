/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg:      '#0f0f0f',
        surface: '#1a1a1a',
        card:    '#222222',
        border:  '#2a2a2a',
        primary: '#a3e635',
        accent:  '#facc15',
        text:    '#f5f5f5',
        soft:    '#a1a1aa',
        muted:   '#52525b',
        danger:  '#ef4444',
        protein: '#60a5fa',
        carbs:   '#fb923c',
        fats:    '#facc15',
      },
      fontFamily: {
        display: ['Oxanium_700Bold'],
        mono:    ['SpaceMono_400Regular'],
        body:    ['DMSans_400Regular'],
      },
    },
  },
}
