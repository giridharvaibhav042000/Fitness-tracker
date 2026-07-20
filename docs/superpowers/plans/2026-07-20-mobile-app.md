# Mobile App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a native iOS + Android fitness tracker app in `mobile-app/` using Expo + NativeWind, sharing the same Supabase backend as the web app.

**Architecture:** Separate Expo project inside the monorepo. All 6 hooks adapted from localStorage to AsyncStorage. All services adapted. Same Supabase tables and edge functions. Expo Router for file-based navigation with a 5-tab bottom navigator.

**Tech Stack:** Expo SDK 53, Expo Router, NativeWind v4, @supabase/supabase-js, AsyncStorage, expo-file-system, expo-haptics, expo-notifications

**Working directory for all tasks:** `mobile-app/` inside the repo root (alongside `fitness-app/`)

---

## Phase 1 — Scaffold + Config

### Task 1: Create Expo project

**Files:**
- Create: `mobile-app/` (Expo project root)

- [ ] **Step 1: Scaffold**

Run from repo root (`fitness--development/`):
```bash
npx create-expo-app@latest mobile-app --template blank-typescript
```

- [ ] **Step 2: Install all dependencies**

```bash
cd mobile-app
npx expo install expo-router expo-haptics expo-notifications expo-local-authentication expo-image-picker expo-camera expo-file-system expo-sharing expo-network expo-font expo-splash-screen expo-crypto @supabase/supabase-js @react-native-async-storage/async-storage react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-screens @react-native-community/netinfo nativewind tailwindcss
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install --save-dev @types/react @testing-library/react-native jest-expo
```

- [ ] **Step 4: Replace `package.json` main entry**

Open `package.json`, set `"main": "expo-router/entry"`.

Also update `jest` config:
```json
"jest": {
  "preset": "jest-expo",
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ]
}
```

- [ ] **Step 5: Commit**

```bash
git add mobile-app/
git commit -m "feat(mobile): scaffold Expo project with all deps"
```

---

### Task 2: Configure NativeWind + Expo Router

**Files:**
- Create: `mobile-app/tailwind.config.js`
- Create: `mobile-app/global.css`
- Create: `mobile-app/babel.config.js`
- Create: `mobile-app/metro.config.js`
- Create: `mobile-app/app.json`

- [ ] **Step 1: Create `tailwind.config.js`**

```js
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
```

- [ ] **Step 2: Create `global.css`**

```css
@import "tailwindcss";
```

- [ ] **Step 3: Create `babel.config.js`**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

- [ ] **Step 4: Create `metro.config.js`**

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
```

- [ ] **Step 5: Update `app.json`**

Replace contents:
```json
{
  "expo": {
    "name": "Fitness Tracker",
    "slug": "fitness-tracker",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "fitnesstracker",
    "userInterfaceStyle": "dark",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#0f0f0f"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.kilowott.fitnesstracker"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0f0f0f"
      },
      "package": "com.kilowott.fitnesstracker"
    },
    "plugins": [
      "expo-router",
      ["expo-camera", { "cameraPermission": "Allow Fitness Tracker to access your camera to analyse meals." }],
      ["expo-notifications", { "color": "#a3e635" }],
      ["expo-local-authentication", { "faceIDPermission": "Allow Fitness Tracker to use Face ID for login." }],
      "expo-file-system"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add mobile-app/tailwind.config.js mobile-app/global.css mobile-app/babel.config.js mobile-app/metro.config.js mobile-app/app.json
git commit -m "feat(mobile): configure NativeWind, Expo Router, app.json"
```

---

### Task 3: Environment + Supabase client

**Files:**
- Create: `mobile-app/.env`
- Create: `mobile-app/src/services/supabase.ts`
- Create: `mobile-app/.gitignore` (add `.env`)

- [ ] **Step 1: Create `.env`**

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Copy values from `fitness-app/.env` (same Supabase project).

- [ ] **Step 2: Create `src/services/supabase.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const url  = process.env.EXPO_PUBLIC_SUPABASE_URL!
const key  = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```

- [ ] **Step 3: Add `.env` to `.gitignore`**

Append to `mobile-app/.gitignore`:
```
.env
.env.local
```

- [ ] **Step 4: Commit**

```bash
git add mobile-app/src/services/supabase.ts mobile-app/.gitignore
git commit -m "feat(mobile): Supabase client with AsyncStorage session persistence"
```

---

## Phase 2 — Data Layer

### Task 4: Copy data files

**Files:**
- Create: `mobile-app/src/data/workouts.js`
- Create: `mobile-app/src/data/splits.js`
- Create: `mobile-app/src/data/programs.js`
- Create: `mobile-app/src/data/nutrition.js`
- Create: `mobile-app/src/data/variations.js`
- Create: `mobile-app/src/data/weekPlan.js`

- [ ] **Step 1: Copy data files verbatim**

Run from repo root:
```bash
cp fitness-app/src/data/workouts.js   mobile-app/src/data/workouts.js
cp fitness-app/src/data/splits.js     mobile-app/src/data/splits.js
cp fitness-app/src/data/programs.js   mobile-app/src/data/programs.js
cp fitness-app/src/data/nutrition.js  mobile-app/src/data/nutrition.js
cp fitness-app/src/data/variations.js mobile-app/src/data/variations.js
cp fitness-app/src/data/weekPlan.js   mobile-app/src/data/weekPlan.js
```

These are pure JS with no browser/DOM deps — no changes needed.

- [ ] **Step 2: Verify no browser references**

```bash
grep -r "window\|document\|localStorage" mobile-app/src/data/
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add mobile-app/src/data/
git commit -m "feat(mobile): copy data files from web app (pure JS, no changes)"
```

---

### Task 5: Adapt workoutService

**Files:**
- Create: `mobile-app/src/services/workoutService.ts`

- [ ] **Step 1: Create `src/services/workoutService.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { supabase } from './supabase'

const KEY_SESSIONS = 'workoutSessions'
const KEY_LOGS     = 'exerciseLogs'
const KEY_QUEUE    = 'offlineQueue'

function localDateStr(d: Date) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

function today() {
  return localDateStr(new Date())
}

async function getSessions() {
  return JSON.parse((await AsyncStorage.getItem(KEY_SESSIONS)) ?? '[]')
}

async function getLogs() {
  return JSON.parse((await AsyncStorage.getItem(KEY_LOGS)) ?? '[]')
}

async function queueForSync(table: string, record: object) {
  const q = JSON.parse((await AsyncStorage.getItem(KEY_QUEUE)) ?? '[]')
  await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify([...q, { table, record }]))
}

async function syncToSupabase(table: string, record: object) {
  const { error } = await supabase.from(table).upsert(record)
  if (error) await queueForSync(table, record)
}

export async function getOrCreateSession(userId: string, dayKey: string, type: string) {
  const sessions = await getSessions()
  const existing = sessions.find((s: any) => s.date === today() && s.day_of_week === dayKey && s.type === type)
  if (existing) return existing

  const session = {
    id: Crypto.randomUUID(),
    user_id: userId,
    date: today(),
    day_of_week: dayKey,
    type,
    completed_at: new Date().toISOString(),
  }

  await AsyncStorage.setItem(KEY_SESSIONS, JSON.stringify([...sessions, session]))
  syncToSupabase('workout_sessions', session)
  return session
}

export async function getTodaySession(userId: string) {
  const sessions = await getSessions()
  return sessions.find((s: any) => s.user_id === userId && s.date === today()) ?? null
}

export async function logSet(sessionId: string, setData: object) {
  const log = { id: Crypto.randomUUID(), session_id: sessionId, ...setData, completed_at: new Date().toISOString() }
  const logs = await getLogs()
  await AsyncStorage.setItem(KEY_LOGS, JSON.stringify([...logs, log]))
  syncToSupabase('exercise_logs', log)
  return log
}

export async function getSessionLogs(sessionId: string) {
  const logs = await getLogs()
  return logs.filter((l: any) => l.session_id === sessionId)
}

export async function getLastSetForExercise(exerciseName: string, excludeSessionId: string) {
  const [logs, sessions] = await Promise.all([getLogs(), getSessions()])
  const relevant = logs.filter((l: any) => l.exercise_name === exerciseName && l.session_id !== excludeSessionId)
  if (!relevant.length) return null
  const sessionDates: Record<string, string> = Object.fromEntries(sessions.map((s: any) => [s.id, s.date]))
  const sorted = [...relevant].sort((a: any, b: any) => {
    const da = sessionDates[a.session_id] || ''
    const db = sessionDates[b.session_id] || ''
    return db.localeCompare(da) || b.weight - a.weight
  })
  return { weight: sorted[0].weight, reps: sorted[0].reps }
}

export async function updateSet(id: string, updates: { weight: number; reps: number }) {
  const logs = await getLogs()
  const updated = logs.map((l: any) => l.id === id ? { ...l, ...updates } : l)
  await AsyncStorage.setItem(KEY_LOGS, JSON.stringify(updated))
  const { error } = await supabase.from('exercise_logs').update(updates).eq('id', id)
  if (error) await queueForSync('exercise_logs', updated.find((l: any) => l.id === id))
}

export async function getWorkoutStreak() {
  const sessions = await getSessions()
  const dates = new Set(sessions.map((s: any) => s.date))
  const d = new Date()
  if (!dates.has(localDateStr(d))) d.setDate(d.getDate() - 1)
  let streak = 0
  while (dates.has(localDateStr(d))) { streak++; d.setDate(d.getDate() - 1) }
  return streak
}

export async function getBestStreak() {
  const sessions = await getSessions()
  if (!sessions.length) return 0
  const dates = [...new Set<string>(sessions.map((s: any) => s.date))].sort()
  let best = 1, current = 1
  for (let i = 1; i < dates.length; i++) {
    const diff = (new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime()) / 86400000
    if (diff === 1) { current++; if (current > best) best = current }
    else current = 1
  }
  return best
}
```

- [ ] **Step 2: Commit**

```bash
git add mobile-app/src/services/workoutService.ts
git commit -m "feat(mobile): adapt workoutService to AsyncStorage"
```

---

### Task 6: Adapt nutritionService + exportService + offlineSync + aiNutritionService

**Files:**
- Create: `mobile-app/src/services/nutritionService.ts`
- Create: `mobile-app/src/services/offlineSync.ts`
- Create: `mobile-app/src/services/exportService.ts`
- Create: `mobile-app/src/services/aiNutritionService.ts`

- [ ] **Step 1: Create `src/services/nutritionService.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { supabase } from './supabase'

const KEY_NUTRITION = 'nutritionLogs'
const KEY_QUEUE     = 'offlineQueue'

function localDateStr(d: Date) {
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-')
}

export function todayStr() {
  return localDateStr(new Date())
}

async function getAll() {
  return JSON.parse((await AsyncStorage.getItem(KEY_NUTRITION)) ?? '[]')
}

export async function getLogsByDate(date: string) {
  const all = await getAll()
  return all.filter((l: any) => l.date === date)
}

export async function logMeal(userId: string, meal: object, date: string) {
  const entry = { id: Crypto.randomUUID(), user_id: userId, date: date ?? todayStr(), ...meal }
  const all = await getAll()
  await AsyncStorage.setItem(KEY_NUTRITION, JSON.stringify([...all, entry]))
  const { error } = await supabase.from('nutrition_logs').insert(entry)
  if (error) {
    const q = JSON.parse((await AsyncStorage.getItem(KEY_QUEUE)) ?? '[]')
    await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify([...q, { table: 'nutrition_logs', record: entry }]))
  }
  return entry
}

export async function deleteMeal(id: string) {
  const all = await getAll()
  await AsyncStorage.setItem(KEY_NUTRITION, JSON.stringify(all.filter((l: any) => l.id !== id)))
  supabase.from('nutrition_logs').delete().eq('id', id)
}

export function calcTotals(logs: any[]) {
  return logs.reduce(
    (acc, l) => ({ protein: acc.protein + l.protein, carbs: acc.carbs + l.carbs, fats: acc.fats + l.fats, fiber: acc.fiber + (l.fiber ?? 0) }),
    { protein: 0, carbs: 0, fats: 0, fiber: 0 }
  )
}

export async function getWeekLogs() {
  const all = await getAll()
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  const week: Record<string, any> = {}
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = localDateStr(d)
    const logs = all.filter((l: any) => l.date === key)
    if (logs.length) {
      week[key] = logs.reduce(
        (acc: any, l: any) => ({ protein: acc.protein + l.protein, carbs: acc.carbs + l.carbs, fats: acc.fats + l.fats, calories: acc.calories + l.calories, fiber: acc.fiber + (l.fiber ?? 0) }),
        { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0 }
      )
    }
  }
  return week
}
```

- [ ] **Step 2: Create `src/services/offlineSync.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { supabase } from './supabase'

const KEY_QUEUE = 'offlineQueue'

export async function flushOfflineQueue() {
  const raw = await AsyncStorage.getItem(KEY_QUEUE)
  const queue = JSON.parse(raw ?? '[]')
  if (!queue.length) return
  const remaining: any[] = []
  for (const item of queue) {
    const { error } = await supabase.from(item.table).upsert(item.record)
    if (error) remaining.push(item)
  }
  await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify(remaining))
}

export function registerOnlineListener() {
  NetInfo.addEventListener(state => {
    if (state.isConnected) flushOfflineQueue()
  })
}
```

- [ ] **Step 3: Create `src/services/exportService.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export async function buildExportData({ from, to, include }: { from: string; to: string; include: Record<string, boolean> }) {
  const result: any = { exportedAt: new Date().toISOString(), dateRange: { from, to } }

  if (include.workoutSessions) {
    const all = JSON.parse((await AsyncStorage.getItem('workoutSessions')) ?? '[]')
    result.workoutSessions = all.filter((s: any) => s.date >= from && s.date <= to)
  }
  if (include.exerciseLogs) {
    const all = JSON.parse((await AsyncStorage.getItem('exerciseLogs')) ?? '[]')
    result.exerciseLogs = all.filter((l: any) => (l.completed_at?.split('T')[0] ?? '') >= from && (l.completed_at?.split('T')[0] ?? '') <= to)
  }
  if (include.nutritionLogs) {
    const all = JSON.parse((await AsyncStorage.getItem('nutritionLogs')) ?? '[]')
    result.nutritionLogs = all.filter((l: any) => l.date >= from && l.date <= to)
  }
  if (include.personalRecords) {
    const prs = JSON.parse((await AsyncStorage.getItem('personalRecords')) ?? '{}')
    result.personalRecords = Object.fromEntries(
      Object.entries(prs).filter(([, pr]: any) => (pr.achieved_at?.split('T')[0] ?? '') >= from && (pr.achieved_at?.split('T')[0] ?? '') <= to)
    )
  }
  return result
}

export async function shareExport(data: object, from: string, to: string) {
  const json = JSON.stringify(data, null, 2)
  const path = FileSystem.documentDirectory + `fitness-export-${from}-to-${to}.json`
  await FileSystem.writeAsStringAsync(path, json, { encoding: FileSystem.EncodingType.UTF8 })
  await Sharing.shareAsync(path, { mimeType: 'application/json', dialogTitle: 'Export Fitness Data' })
}
```

- [ ] **Step 4: Create `src/services/aiNutritionService.ts`**

```ts
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
```

- [ ] **Step 5: Commit**

```bash
git add mobile-app/src/services/
git commit -m "feat(mobile): adapt all services to AsyncStorage + expo-file-system"
```

---

### Task 7: Adapt all hooks

**Files:**
- Create: `mobile-app/src/hooks/useAuth.ts`
- Create: `mobile-app/src/hooks/useWorkout.ts`
- Create: `mobile-app/src/hooks/useNutrition.ts`
- Create: `mobile-app/src/hooks/useProgress.ts`
- Create: `mobile-app/src/hooks/useWorkoutPlan.ts`
- Create: `mobile-app/src/hooks/useWorkoutMode.ts`

- [ ] **Step 1: Create `src/hooks/useAuth.ts`**

```ts
import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function useAuth() {
  const [user, setUser]       = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signIn  = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password })
  const signOut = () => supabase.auth.signOut()

  return { user, loading, signIn, signOut }
}
```

- [ ] **Step 2: Create `src/hooks/useWorkout.ts`**

```ts
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getOrCreateSession, getSessionLogs, logSet, updateSet, getLastSetForExercise } from '../services/workoutService'

export function useWorkout(dayKey: string, type: string) {
  const { user }            = useAuth()
  const [session, setSession] = useState<any>(null)
  const [logs, setLogs]     = useState<any[]>([])

  useEffect(() => {
    if (!user || !dayKey) return
    getOrCreateSession(user.id, dayKey, type).then(async s => {
      setSession(s)
      setLogs(await getSessionLogs(s.id))
    })
  }, [user, dayKey, type])

  const recordSet = useCallback(async (exercise: any, setNumber: number, weight: number, reps: number) => {
    if (!session) return null
    const log = await logSet(session.id, { exercise_name: exercise.name, set_number: setNumber, weight, reps })
    setLogs(prev => [...prev, log])
    return log
  }, [session])

  const editSet = useCallback(async (logId: string, weight: number, reps: number) => {
    await updateSet(logId, { weight, reps })
    setLogs(prev => prev.map(l => l.id === logId ? { ...l, weight, reps } : l))
  }, [])

  const getLastSet = useCallback((exerciseName: string) =>
    session ? getLastSetForExercise(exerciseName, session.id) : Promise.resolve(null)
  , [session])

  return { session, logs, recordSet, editSet, getLastSet }
}
```

- [ ] **Step 3: Create `src/hooks/useNutrition.ts`**

```ts
import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'
import { getLogsByDate, logMeal, deleteMeal, calcTotals, todayStr } from '../services/nutritionService'

export function useNutrition() {
  const { user }                        = useAuth()
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const [meals, setMeals]               = useState<any[]>([])

  // Load meals when date changes
  const changeDate = useCallback(async (date: string) => {
    setSelectedDate(date)
    setMeals(await getLogsByDate(date))
  }, [])

  // Load today's meals on mount
  useState(() => { changeDate(todayStr()) })

  const addMeal = useCallback(async (meal: object) => {
    if (!user) return
    const entry = await logMeal(user.id, meal, selectedDate)
    setMeals(prev => [...prev, entry])
    return entry
  }, [user, selectedDate])

  const removeMeal = useCallback(async (id: string) => {
    await deleteMeal(id)
    setMeals(prev => prev.filter(m => m.id !== id))
  }, [])

  return { meals, totals: calcTotals(meals), addMeal, removeMeal, selectedDate, changeDate, todayStr: todayStr() }
}
```

- [ ] **Step 4: Create `src/hooks/useProgress.ts`**

```ts
import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from './useAuth'
import { supabase } from '../services/supabase'

const KEY_PR = 'personalRecords'

export function detectPR(current: any, existing: any) {
  if (!existing) return true
  if (current.weight > existing.weight) return true
  if (current.weight === existing.weight && current.reps > existing.reps) return true
  return false
}

export function useProgress() {
  const { user }          = useAuth()
  const [prs, setPRs]     = useState<Record<string, any>>({})
  const [newPR, setNewPR] = useState<string | null>(null)

  useEffect(() => {
    AsyncStorage.getItem(KEY_PR).then(raw => {
      if (raw) setPRs(JSON.parse(raw))
    })
  }, [])

  const checkAndSavePR = useCallback(async ({ exercise_name, weight, reps }: any) => {
    const existing = prs[exercise_name] ?? null
    if (!detectPR({ weight, reps }, existing)) return false
    const updated = { ...prs, [exercise_name]: { weight, reps, achieved_at: new Date().toISOString() } }
    await AsyncStorage.setItem(KEY_PR, JSON.stringify(updated))
    setPRs(updated)
    setNewPR(exercise_name)
    setTimeout(() => setNewPR(null), 3000)
    if (user) {
      supabase.from('personal_records').upsert({ user_id: user.id, exercise_name, weight, reps, achieved_at: new Date().toISOString() }, { onConflict: 'user_id,exercise_name' })
    }
    return true
  }, [prs, user])

  return { prs, newPR, checkAndSavePR }
}
```

- [ ] **Step 5: Create `src/hooks/useWorkoutPlan.ts`**

```ts
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GOALS, WEEK_CYCLES } from '../data/variations'

function todayStr() {
  const d = new Date()
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-')
}

export function useWorkoutPlan() {
  const [goal, setGoalState]               = useState<string>(GOALS.STRENGTH)
  const [weekCycle, setWeekCycleState]     = useState<number>(4)
  const [cycleStartDate, setCycleStartDate] = useState<string>(todayStr())
  const [loaded, setLoaded]                = useState(false)

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('workoutGoal'),
      AsyncStorage.getItem('weekCycle'),
      AsyncStorage.getItem('cycleStartDate'),
    ]).then(([g, wc, cd]) => {
      if (g) setGoalState(g)
      if (wc) setWeekCycleState(parseInt(wc, 10))
      if (cd) setCycleStartDate(cd)
      setLoaded(true)
    })
  }, [])

  async function setGoal(g: string) { await AsyncStorage.setItem('workoutGoal', g); setGoalState(g) }
  async function setWeekCycle(n: number) { await AsyncStorage.setItem('weekCycle', String(n)); setWeekCycleState(n) }
  async function resetCycle(dateStr?: string) {
    const d = dateStr || todayStr()
    await AsyncStorage.setItem('cycleStartDate', d)
    setCycleStartDate(d)
  }

  function getCurrentWeekIndex() {
    const days = Math.floor((Date.now() - new Date(cycleStartDate).getTime()) / 86400000)
    return Math.min(Math.max(Math.floor(days / 7), 0), weekCycle - 1)
  }

  const weekIndex = getCurrentWeekIndex()
  const cycles    = (WEEK_CYCLES as any)[goal]?.[weekCycle]
  const modifier  = cycles ? (cycles[weekIndex] || cycles[cycles.length - 1]) : null

  return { goal, weekCycle, cycleStartDate, weekIndex, modifier, allWeeks: cycles || [], setGoal, setWeekCycle, resetCycle, loaded }
}
```

- [ ] **Step 6: Create `src/hooks/useWorkoutMode.ts`**

```ts
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WORKOUT_MODES } from '../data/programs'

export function useWorkoutMode() {
  const [mode, setMode] = useState<string>(WORKOUT_MODES.GYM_CALI)

  useEffect(() => {
    AsyncStorage.getItem('workoutMode').then(v => { if (v) setMode(v) })
  }, [])

  async function applyMode(newMode: string) {
    await AsyncStorage.setItem('workoutMode', newMode)
    setMode(newMode)
  }

  return { mode, applyMode }
}
```

- [ ] **Step 7: Commit**

```bash
git add mobile-app/src/hooks/
git commit -m "feat(mobile): adapt all 6 hooks to AsyncStorage"
```

---

## Phase 3 — Navigation Skeleton

### Task 8: Root layout + auth guard + Login screen

**Files:**
- Create: `mobile-app/app/_layout.tsx`
- Create: `mobile-app/app/(auth)/_layout.tsx`
- Create: `mobile-app/app/(auth)/login.tsx`

- [ ] **Step 1: Create `app/_layout.tsx`**

```tsx
import '../global.css'
import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { useAuth } from '../src/hooks/useAuth'
import { registerOnlineListener } from '../src/services/offlineSync'

export default function RootLayout() {
  const { user, loading } = useAuth()

  useEffect(() => { registerOnlineListener() }, [])

  useEffect(() => {
    if (loading) return
    if (!user) router.replace('/(auth)/login')
  }, [user, loading])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
```

- [ ] **Step 2: Create `app/(auth)/_layout.tsx`**

```tsx
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
```

- [ ] **Step 3: Create `app/(auth)/login.tsx`**

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add mobile-app/app/
git commit -m "feat(mobile): root layout, auth guard, login screen"
```

---

### Task 9: Bottom tab navigator + placeholder screens

**Files:**
- Create: `mobile-app/app/(tabs)/_layout.tsx`
- Create: `mobile-app/app/(tabs)/index.tsx` (placeholder)
- Create: `mobile-app/app/(tabs)/workout/index.tsx` (placeholder)
- Create: `mobile-app/app/(tabs)/nutrition/index.tsx` (placeholder)
- Create: `mobile-app/app/(tabs)/progress/index.tsx` (placeholder)
- Create: `mobile-app/app/(tabs)/more/index.tsx` (placeholder)

- [ ] **Step 1: Create `app/(tabs)/_layout.tsx`**

```tsx
import { Tabs } from 'expo-router'
import { Text } from 'react-native'

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return <Text className={focused ? 'text-primary text-xs font-body' : 'text-muted text-xs font-body'}>{label}</Text>
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#1a1a1a', borderTopColor: '#2a2a2a', height: 60, paddingBottom: 8 },
      tabBarActiveTintColor: '#a3e635',
      tabBarInactiveTintColor: '#52525b',
    }}>
      <Tabs.Screen name="index"     options={{ title: 'Home',      tabBarLabel: 'Home' }} />
      <Tabs.Screen name="workout"   options={{ title: 'Workout',   tabBarLabel: 'Workout' }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition', tabBarLabel: 'Nutrition' }} />
      <Tabs.Screen name="progress"  options={{ title: 'Progress',  tabBarLabel: 'Progress' }} />
      <Tabs.Screen name="more"      options={{ title: 'More',      tabBarLabel: 'More' }} />
    </Tabs>
  )
}
```

- [ ] **Step 2: Create placeholder for each tab**

`app/(tabs)/index.tsx`:
```tsx
import { View, Text } from 'react-native'
export default function HomeScreen() {
  return <View className="flex-1 bg-bg items-center justify-center"><Text className="text-text">Home</Text></View>
}
```

Repeat the same pattern for:
- `app/(tabs)/workout/index.tsx` — "Workout"
- `app/(tabs)/workout/_layout.tsx` — `<Stack screenOptions={{ headerShown: false }} />`
- `app/(tabs)/nutrition/index.tsx` — "Nutrition"
- `app/(tabs)/nutrition/_layout.tsx` — `<Stack screenOptions={{ headerShown: false }} />`
- `app/(tabs)/progress/index.tsx` — "Progress"
- `app/(tabs)/progress/_layout.tsx` — `<Stack screenOptions={{ headerShown: false }} />`
- `app/(tabs)/more/index.tsx` — "More"
- `app/(tabs)/more/_layout.tsx` — `<Stack screenOptions={{ headerShown: false }} />`

- [ ] **Step 3: Smoke test**

```bash
cd mobile-app && npx expo start
```

Open Expo Go on device. Verify: login screen renders, tabs appear after login, 5 tabs visible.

- [ ] **Step 4: Commit**

```bash
git add mobile-app/app/
git commit -m "feat(mobile): bottom tab navigator + placeholder screens"
```

---

## Phase 4 — Core Components

### Task 10: MacroBar + MacroRing components

**Files:**
- Create: `mobile-app/src/components/MacroBar.tsx`
- Create: `mobile-app/src/components/MacroRing.tsx`

- [ ] **Step 1: Create `src/components/MacroBar.tsx`**

```tsx
import { View, Text } from 'react-native'

type Props = { label: string; value: number; target: number; color: string }

export default function MacroBar({ label, value, target, color }: Props) {
  const pct = Math.min(value / Math.max(target, 1), 1)
  return (
    <View className="mb-2">
      <View className="flex-row justify-between mb-1">
        <Text className="text-soft font-body text-xs">{label}</Text>
        <Text className="text-text font-mono text-xs">{Math.round(value)}g / {target}g</Text>
      </View>
      <View className="bg-border rounded-full h-2">
        <View className="rounded-full h-2" style={{ width: `${pct * 100}%`, backgroundColor: color }} />
      </View>
    </View>
  )
}
```

- [ ] **Step 2: Create `src/components/MacroRing.tsx`**

```tsx
import { View, Text } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

type Props = { calories: number; target: number; size?: number }

export default function MacroRing({ calories, target, size = 100 }: Props) {
  const radius = (size - 16) / 2
  const circ   = 2 * Math.PI * radius
  const pct    = Math.min(calories / Math.max(target, 1), 1)
  const dash   = pct * circ

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={size/2} cy={size/2} r={radius} stroke="#2a2a2a" strokeWidth={8} fill="none" />
        <Circle cx={size/2} cy={size/2} r={radius} stroke="#a3e635" strokeWidth={8} fill="none"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          rotation={-90} origin={`${size/2},${size/2}`} />
      </Svg>
      <View className="absolute items-center">
        <Text className="text-primary font-display text-lg">{Math.round(calories)}</Text>
        <Text className="text-soft font-body text-xs">kcal</Text>
      </View>
    </View>
  )
}
```

Install SVG dep:
```bash
npx expo install react-native-svg
```

- [ ] **Step 3: Commit**

```bash
git add mobile-app/src/components/MacroBar.tsx mobile-app/src/components/MacroRing.tsx
git commit -m "feat(mobile): MacroBar and MacroRing components"
```

---

### Task 11: ExerciseCard + SetLogger + RestTimer

**Files:**
- Create: `mobile-app/src/components/ExerciseCard.tsx`
- Create: `mobile-app/src/components/SetLogger.tsx`
- Create: `mobile-app/src/components/RestTimer.tsx`

- [ ] **Step 1: Create `src/components/ExerciseCard.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

type Set = { weight: number; reps: number }
type Props = {
  exercise: { name: string; sets: number; reps: string; compulsory?: boolean }
  logs: any[]
  lastSet: { weight: number; reps: number } | null
  onLogSet: (setNumber: number, weight: number, reps: number) => void
  onEditSet: (logId: string, weight: number, reps: number) => void
}

export default function ExerciseCard({ exercise, logs, lastSet, onLogSet, onEditSet }: Props) {
  const logged = logs.filter(l => l.exercise_name === exercise.name)
  const done   = logged.length >= exercise.sets
  const suggestWeight = lastSet ? lastSet.weight + 2.5 : null

  return (
    <View className="bg-card border border-border rounded-xl p-4 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-text font-display text-base">{exercise.name}</Text>
          <Text className="text-soft font-body text-xs">{exercise.sets} sets × {exercise.reps} reps</Text>
        </View>
        {done && <View className="bg-primary/20 px-2 py-1 rounded"><Text className="text-primary font-body text-xs">Done</Text></View>}
      </View>

      {suggestWeight && !done && (
        <Text className="text-accent font-body text-xs mb-2">↑ Try {suggestWeight}kg (last: {lastSet!.weight}kg × {lastSet!.reps})</Text>
      )}

      <View className="flex-row flex-wrap gap-2">
        {logged.map((log, i) => (
          <View key={log.id} className="bg-surface border border-border rounded px-2 py-1">
            <Text className="text-text font-mono text-xs">{log.weight}kg × {log.reps}</Text>
          </View>
        ))}
        {!done && (
          <TouchableOpacity
            onPress={() => onLogSet(logged.length + 1, lastSet?.weight ?? 0, parseInt(exercise.reps) || 8)}
            className="bg-primary/10 border border-primary/30 rounded px-3 py-1">
            <Text className="text-primary font-body text-xs">+ Set {logged.length + 1}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
```

- [ ] **Step 2: Create `src/components/SetLogger.tsx`**

```tsx
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

type Props = {
  exerciseName: string
  setNumber: number
  defaultWeight: number
  defaultReps: number
  onSave: (weight: number, reps: number) => void
  onCancel: () => void
}

export default function SetLogger({ exerciseName, setNumber, defaultWeight, defaultReps, onSave, onCancel }: Props) {
  const [weight, setWeight] = useState(String(defaultWeight || ''))
  const [reps, setReps]     = useState(String(defaultReps || ''))
  const [unit, setUnit]     = useState<'kg' | 'lbs'>('kg')

  function handleSave() {
    const w = parseFloat(weight)
    const r = parseInt(reps)
    if (!w || !r) return
    const kg = unit === 'lbs' ? w * 0.453592 : w
    onSave(parseFloat(kg.toFixed(2)), r)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="bg-surface p-6 rounded-t-2xl">
        <Text className="text-text font-display text-lg mb-1">{exerciseName}</Text>
        <Text className="text-soft font-body text-sm mb-4">Set {setNumber}</Text>

        <View className="flex-row gap-2 mb-4">
          {(['kg', 'lbs'] as const).map(u => (
            <TouchableOpacity key={u} onPress={() => setUnit(u)}
              className={`flex-1 py-2 rounded-lg items-center border ${unit === u ? 'border-primary bg-primary/10' : 'border-border'}`}>
              <Text className={unit === u ? 'text-primary font-body' : 'text-soft font-body'}>{u}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row gap-3 mb-6">
          <View className="flex-1">
            <Text className="text-soft font-body text-xs mb-1">Weight ({unit})</Text>
            <TextInput className="bg-card border border-border text-text font-mono text-xl px-4 py-3 rounded-lg text-center"
              value={weight} onChangeText={setWeight} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#52525b" />
          </View>
          <View className="flex-1">
            <Text className="text-soft font-body text-xs mb-1">Reps</Text>
            <TextInput className="bg-card border border-border text-text font-mono text-xl px-4 py-3 rounded-lg text-center"
              value={reps} onChangeText={setReps} keyboardType="number-pad" placeholder="0" placeholderTextColor="#52525b" />
          </View>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity onPress={onCancel} className="flex-1 py-3 border border-border rounded-lg items-center">
            <Text className="text-soft font-body">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} className="flex-1 py-3 bg-primary rounded-lg items-center">
            <Text className="text-bg font-display">Save Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
```

- [ ] **Step 3: Create `src/components/RestTimer.tsx`**

```tsx
import { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics'

type Props = { seconds: number; onDone: () => void }

export default function RestTimer({ seconds, onDone }: Props) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef               = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          onDone()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const pct  = remaining / seconds
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <View className="items-center py-4">
      <Text className="text-soft font-body text-sm mb-2">Rest Timer</Text>
      <Text className="text-primary font-mono text-4xl">
        {mins}:{String(secs).padStart(2, '0')}
      </Text>
      <TouchableOpacity onPress={onDone} className="mt-3 px-6 py-2 border border-border rounded-full">
        <Text className="text-soft font-body text-sm">Skip</Text>
      </TouchableOpacity>
    </View>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add mobile-app/src/components/
git commit -m "feat(mobile): ExerciseCard, SetLogger, RestTimer components"
```

---

## Phase 5 — Home Screen

### Task 12: Home screen

**Files:**
- Modify: `mobile-app/app/(tabs)/index.tsx`

- [ ] **Step 1: Build Home screen**

```tsx
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'
import { getWorkoutStreak, getBestStreak, getTodaySession } from '../../src/services/workoutService'
import { getLogsByDate, calcTotals } from '../../src/services/nutritionService'
import MacroRing from '../../src/components/MacroRing'

const CALORIE_TARGET = 2500

export default function HomeScreen() {
  const { user }                  = useAuth()
  const [streak, setStreak]       = useState(0)
  const [best, setBest]           = useState(0)
  const [totals, setTotals]       = useState({ protein: 0, carbs: 0, fats: 0, fiber: 0 })
  const [calories, setCalories]   = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  async function load() {
    const [s, b, meals] = await Promise.all([
      getWorkoutStreak(),
      getBestStreak(),
      getLogsByDate(new Date().toISOString().split('T')[0]),
    ])
    setStreak(s); setBest(b)
    const t = calcTotals(meals)
    setTotals(t)
    setCalories(t.protein * 4 + t.carbs * 4 + t.fats * 9)
  }

  useEffect(() => { load() }, [])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false) }} tintColor="#a3e635" />}
      >
        <Text className="text-primary font-display text-2xl">FITNESS</Text>
        <Text className="text-soft font-body text-sm mb-6">{today}</Text>

        {/* Streak row */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-primary font-display text-3xl">{streak}</Text>
            <Text className="text-soft font-body text-xs">Day streak</Text>
          </View>
          <View className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-accent font-display text-3xl">{best}</Text>
            <Text className="text-soft font-body text-xs">Best streak</Text>
          </View>
        </View>

        {/* Calories ring */}
        <View className="bg-card border border-border rounded-xl p-4 mb-4 flex-row items-center">
          <MacroRing calories={calories} target={CALORIE_TARGET} size={90} />
          <View className="ml-4 flex-1">
            <Text className="text-text font-display text-base mb-1">Today's Calories</Text>
            <Text className="text-soft font-body text-xs">{Math.round(calories)} / {CALORIE_TARGET} kcal</Text>
            <Text className="text-soft font-body text-xs mt-1">P: {Math.round(totals.protein)}g  C: {Math.round(totals.carbs)}g  F: {Math.round(totals.fats)}g</Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text className="text-soft font-body text-xs uppercase tracking-widest mb-2">Quick Log</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={() => router.push('/(tabs)/workout')}
            className="flex-1 bg-primary/10 border border-primary/30 rounded-xl py-4 items-center">
            <Text className="text-primary font-display text-base">💪 Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition')}
            className="flex-1 bg-accent/10 border border-accent/30 rounded-xl py-4 items-center">
            <Text className="text-accent font-display text-base">🥗 Meal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add mobile-app/app/(tabs)/index.tsx
git commit -m "feat(mobile): Home screen with streak, calories, quick actions"
```

---

## Phase 6 — Workout Tab

### Task 13: Programs screen (mode + goal select)

**Files:**
- Modify: `mobile-app/app/(tabs)/workout/index.tsx`

- [ ] **Step 1: Build Programs screen**

```tsx
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useWorkoutMode } from '../../../src/hooks/useWorkoutMode'
import { useWorkoutPlan } from '../../../src/hooks/useWorkoutPlan'
import { WORKOUT_MODES } from '../../../src/data/programs'
import { GOALS } from '../../../src/data/variations'

const MODES = [
  { key: WORKOUT_MODES.GYM,      label: 'Gym Only' },
  { key: WORKOUT_MODES.CALI,     label: 'Calisthenics' },
  { key: WORKOUT_MODES.GYM_CALI, label: 'Gym + Cali' },
  { key: WORKOUT_MODES.HIIT,     label: 'HIIT' },
  { key: WORKOUT_MODES.WARMUP,   label: 'Warmup' },
]

const GOAL_LIST = [
  { key: GOALS.STRENGTH,      label: 'Strength' },
  { key: GOALS.HYPERTROPHY,   label: 'Hypertrophy' },
  { key: GOALS.FAT_LOSS,      label: 'Fat Loss' },
  { key: GOALS.ATHLETIC,      label: 'Athletic' },
  { key: GOALS.RECOVERY,      label: 'Recovery' },
]

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

export default function ProgramsScreen() {
  const { mode, applyMode }     = useWorkoutMode()
  const { goal, setGoal, weekIndex } = useWorkoutPlan()

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-1">Programs</Text>
        <Text className="text-soft font-body text-sm mb-6">Week {weekIndex + 1} in cycle</Text>

        <Text className="text-soft font-body text-xs uppercase tracking-widest mb-2">Mode</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {MODES.map(m => (
            <TouchableOpacity key={m.key} onPress={() => applyMode(m.key)}
              className={`px-4 py-2 rounded-full border ${mode === m.key ? 'bg-primary border-primary' : 'border-border'}`}>
              <Text className={mode === m.key ? 'text-bg font-body' : 'text-soft font-body'}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-soft font-body text-xs uppercase tracking-widest mb-2">Goal</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {GOAL_LIST.map(g => (
            <TouchableOpacity key={g.key} onPress={() => setGoal(g.key)}
              className={`px-4 py-2 rounded-full border ${goal === g.key ? 'bg-accent border-accent' : 'border-border'}`}>
              <Text className={goal === g.key ? 'text-bg font-body' : 'text-soft font-body'}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-soft font-body text-xs uppercase tracking-widest mb-2">Start Session</Text>
        <View className="gap-2">
          {DAYS.map(day => (
            <TouchableOpacity key={day} onPress={() => router.push(`/(tabs)/workout/${day}`)}
              className="bg-card border border-border rounded-xl px-4 py-3 flex-row justify-between items-center">
              <Text className="text-text font-body capitalize">{day}</Text>
              <Text className="text-muted font-body text-sm">→</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => router.push('/(tabs)/workout/week-plan')}
          className="mt-4 border border-accent/30 bg-accent/10 rounded-xl py-3 items-center">
          <Text className="text-accent font-body">View 6-Week Cycle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add mobile-app/app/(tabs)/workout/index.tsx
git commit -m "feat(mobile): Programs screen with mode and goal selection"
```

---

### Task 14: Workout day screen

**Files:**
- Create: `mobile-app/app/(tabs)/workout/[day].tsx`

- [ ] **Step 1: Create workout day screen**

```tsx
import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useWorkout } from '../../../src/hooks/useWorkout'
import { useProgress } from '../../../src/hooks/useProgress'
import { useWorkoutMode } from '../../../src/hooks/useWorkoutMode'
import ExerciseCard from '../../../src/components/ExerciseCard'
import SetLogger from '../../../src/components/SetLogger'
import RestTimer from '../../../src/components/RestTimer'
import { WORKOUTS } from '../../../src/data/workouts'

export default function WorkoutDayScreen() {
  const { day }                         = useLocalSearchParams<{ day: string }>()
  const { mode }                        = useWorkoutMode()
  const { session, logs, recordSet, editSet, getLastSet } = useWorkout(day, 'gym')
  const { checkAndSavePR, newPR }       = useProgress()
  const [activeExercise, setActiveExercise] = useState<any>(null)
  const [lastSets, setLastSets]         = useState<Record<string, any>>({})
  const [showTimer, setShowTimer]       = useState(false)

  const exercises: any[] = (WORKOUTS as any)[day] ?? []

  useEffect(() => {
    exercises.forEach(async ex => {
      if (session) {
        const last = await getLastSet(ex.name)
        if (last) setLastSets(prev => ({ ...prev, [ex.name]: last }))
      }
    })
  }, [session])

  async function handleLogSet(exercise: any, setNumber: number, weight: number, reps: number) {
    const log = await recordSet(exercise, setNumber, weight, reps)
    if (log) {
      const isPR = await checkAndSavePR({ exercise_name: exercise.name, weight, reps })
      if (isPR) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      setShowTimer(true)
    }
    setActiveExercise(null)
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl capitalize mb-1">{day}</Text>
        <Text className="text-soft font-body text-sm mb-4">{exercises.length} exercises</Text>

        {exercises.map(ex => (
          <ExerciseCard
            key={ex.name}
            exercise={ex}
            logs={logs}
            lastSet={lastSets[ex.name] ?? null}
            onLogSet={(setNumber, weight, reps) => setActiveExercise({ ex, setNumber, weight, reps })}
            onEditSet={editSet}
          />
        ))}
      </ScrollView>

      {/* SetLogger modal */}
      <Modal visible={!!activeExercise} transparent animationType="slide">
        <TouchableOpacity className="flex-1 bg-black/60" onPress={() => setActiveExercise(null)} />
        {activeExercise && (
          <SetLogger
            exerciseName={activeExercise.ex.name}
            setNumber={activeExercise.setNumber}
            defaultWeight={activeExercise.weight}
            defaultReps={activeExercise.reps}
            onSave={(w, r) => handleLogSet(activeExercise.ex, activeExercise.setNumber, w, r)}
            onCancel={() => setActiveExercise(null)}
          />
        )}
      </Modal>

      {/* Rest timer modal */}
      <Modal visible={showTimer} transparent animationType="fade">
        <View className="flex-1 bg-black/80 items-center justify-center">
          <View className="bg-surface border border-border rounded-2xl p-6 mx-6 w-full">
            <RestTimer seconds={90} onDone={() => setShowTimer(false)} />
          </View>
        </View>
      </Modal>

      {/* PR toast */}
      {newPR && (
        <View className="absolute top-16 left-4 right-4 bg-primary rounded-xl px-4 py-3 flex-row items-center">
          <Text className="text-bg font-display text-base flex-1">🏆 New PR: {newPR}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
```

- [ ] **Step 2: Create `app/(tabs)/workout/week-plan.tsx`**

```tsx
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useWorkoutPlan } from '../../../src/hooks/useWorkoutPlan'

export default function WeekPlanScreen() {
  const { allWeeks, weekIndex, goal } = useWorkoutPlan()
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-1">6-Week Cycle</Text>
        <Text className="text-soft font-body text-sm mb-6 capitalize">{goal}</Text>
        {allWeeks.map((w: any, i: number) => (
          <View key={i} className={`bg-card border rounded-xl p-4 mb-3 ${i === weekIndex ? 'border-primary' : 'border-border'}`}>
            <Text className={`font-display text-base mb-1 ${i === weekIndex ? 'text-primary' : 'text-text'}`}>
              Week {i + 1} {i === weekIndex ? '← Current' : ''}
            </Text>
            <Text className="text-soft font-body text-xs">{w.sets} sets · {w.reps} reps · {w.rest}s rest</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 3: Create `app/(tabs)/workout/exercise-library.tsx`**

```tsx
import { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GYM_EXERCISES, CALI_EXERCISES } from '../../../src/data/workouts'

const ALL = [...(GYM_EXERCISES ?? []), ...(CALI_EXERCISES ?? [])]

export default function ExerciseLibraryScreen() {
  const [query, setQuery] = useState('')
  const filtered = ALL.filter((e: any) => e.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-text font-display text-2xl mb-3">Exercise Library</Text>
        <TextInput
          className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg"
          placeholder="Search exercises..." placeholderTextColor="#52525b"
          value={query} onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item.name}
        contentContainerClassName="px-4 pb-8"
        renderItem={({ item }: any) => (
          <View className="bg-card border border-border rounded-xl px-4 py-3 mb-2 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-text font-body">{item.name}</Text>
              {item.muscle && <Text className="text-muted font-body text-xs">{item.muscle}</Text>}
            </View>
            {item.youtube && (
              <TouchableOpacity onPress={() => Linking.openURL(item.youtube)}>
                <Text className="text-primary font-body text-xs">▶ Watch</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add mobile-app/app/(tabs)/workout/
git commit -m "feat(mobile): workout day, week plan, exercise library screens"
```

---

## Phase 7 — Nutrition Tab

### Task 15: Nutrition daily log screen

**Files:**
- Modify: `mobile-app/app/(tabs)/nutrition/index.tsx`
- Create: `mobile-app/app/(tabs)/nutrition/add-meal.tsx`

- [ ] **Step 1: Build Nutrition index screen**

```tsx
import { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useNutrition } from '../../../src/hooks/useNutrition'
import MacroBar from '../../../src/components/MacroBar'

const TARGETS = { protein: 180, carbs: 250, fats: 70, calories: 2500 }

export default function NutritionScreen() {
  const { meals, totals, removeMeal, selectedDate, changeDate, todayStr } = useNutrition()
  const calories = totals.protein * 4 + totals.carbs * 4 + totals.fats * 9

  function shiftDate(n: number) {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + n)
    changeDate(d.toISOString().split('T')[0])
  }

  const isToday = selectedDate === todayStr

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        {/* Date navigator */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => shiftDate(-1)} className="p-2"><Text className="text-soft text-xl">‹</Text></TouchableOpacity>
          <Text className="text-text font-body">{isToday ? 'Today' : selectedDate}</Text>
          <TouchableOpacity onPress={() => shiftDate(1)} disabled={isToday} className="p-2">
            <Text className={isToday ? 'text-muted text-xl' : 'text-soft text-xl'}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Macros */}
        <View className="bg-card border border-border rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-baseline mb-3">
            <Text className="text-text font-display text-lg">Macros</Text>
            <Text className="text-primary font-mono text-sm">{Math.round(calories)} kcal</Text>
          </View>
          <MacroBar label="Protein" value={totals.protein} target={TARGETS.protein} color="#60a5fa" />
          <MacroBar label="Carbs"   value={totals.carbs}   target={TARGETS.carbs}   color="#fb923c" />
          <MacroBar label="Fats"    value={totals.fats}    target={TARGETS.fats}    color="#facc15" />
        </View>

        {/* Meals list */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-soft font-body text-xs uppercase tracking-widest">Meals</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition/add-meal')}
            className="bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
            <Text className="text-primary font-body text-xs">+ Add Meal</Text>
          </TouchableOpacity>
        </View>

        {meals.length === 0 && (
          <Text className="text-muted font-body text-sm text-center py-8">No meals logged{isToday ? ' today' : ` on ${selectedDate}`}</Text>
        )}

        {meals.map(meal => (
          <View key={meal.id} className="bg-card border border-border rounded-xl px-4 py-3 mb-2 flex-row justify-between">
            <View>
              <Text className="text-text font-body">{meal.name ?? 'Meal'}</Text>
              <Text className="text-muted font-body text-xs">P:{meal.protein}g C:{meal.carbs}g F:{meal.fats}g</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Remove', 'Delete this meal?', [
              { text: 'Cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => removeMeal(meal.id) }
            ])}>
              <Text className="text-danger font-body text-sm">✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={() => router.push('/(tabs)/nutrition/weekly-summary')}
          className="mt-4 border border-border rounded-xl py-3 items-center">
          <Text className="text-soft font-body text-sm">View Weekly Summary →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 2: Create `app/(tabs)/nutrition/add-meal.tsx`**

```tsx
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNutrition } from '../../../src/hooks/useNutrition'
import { analyzeText, analyzeImage } from '../../../src/services/aiNutritionService'

export default function AddMealScreen() {
  const { addMeal }            = useNutrition()
  const [name, setName]        = useState('')
  const [protein, setProtein]  = useState('')
  const [carbs, setCarbs]      = useState('')
  const [fats, setFats]        = useState('')
  const [calories, setCalories] = useState('')
  const [aiText, setAiText]    = useState('')
  const [analyzing, setAnalyzing] = useState(false)

  async function handleAIText() {
    if (!aiText.trim()) return
    setAnalyzing(true)
    try {
      const result = await analyzeText(aiText)
      setName(result.name ?? '')
      setProtein(String(result.protein ?? ''))
      setCarbs(String(result.carbs ?? ''))
      setFats(String(result.fats ?? ''))
      setCalories(String(result.calories ?? ''))
    } catch (e: any) { Alert.alert('AI Error', e.message) }
    finally { setAnalyzing(false) }
  }

  async function handleCamera() {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) { Alert.alert('Permission needed', 'Camera access required'); return }
    const result = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.5 })
    if (result.canceled || !result.assets[0].base64) return
    setAnalyzing(true)
    try {
      const data = await analyzeImage(result.assets[0].base64)
      setName(data.name ?? ''); setProtein(String(data.protein ?? '')); setCarbs(String(data.carbs ?? '')); setFats(String(data.fats ?? '')); setCalories(String(data.calories ?? ''))
    } catch (e: any) { Alert.alert('AI Error', e.message) }
    finally { setAnalyzing(false) }
  }

  async function handleSave() {
    if (!protein && !carbs && !fats) { Alert.alert('Enter macros'); return }
    await addMeal({ name: name || 'Meal', protein: parseFloat(protein)||0, carbs: parseFloat(carbs)||0, fats: parseFloat(fats)||0, calories: parseFloat(calories)||0, fiber: 0 })
    router.back()
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerClassName="px-4 py-4">
          <Text className="text-text font-display text-2xl mb-4">Add Meal</Text>

          {/* AI section */}
          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-soft font-body text-xs uppercase tracking-widest mb-2">AI Analysis</Text>
            <TextInput className="bg-surface border border-border text-text font-body px-3 py-2 rounded-lg mb-2"
              placeholder="Describe your meal..." placeholderTextColor="#52525b"
              value={aiText} onChangeText={setAiText} multiline />
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={handleAIText} disabled={analyzing}
                className="flex-1 bg-primary/10 border border-primary/30 py-2 rounded-lg items-center">
                {analyzing ? <ActivityIndicator color="#a3e635" size="small" /> : <Text className="text-primary font-body text-sm">Analyze Text</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCamera} disabled={analyzing}
                className="flex-1 bg-accent/10 border border-accent/30 py-2 rounded-lg items-center">
                <Text className="text-accent font-body text-sm">📷 Photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Manual fields */}
          <TextInput className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg mb-3"
            placeholder="Meal name" placeholderTextColor="#52525b" value={name} onChangeText={setName} />
          {[['Protein (g)', protein, setProtein], ['Carbs (g)', carbs, setCarbs], ['Fats (g)', fats, setFats], ['Calories', calories, setCalories]].map(([label, value, setter]: any) => (
            <TextInput key={label}
              className="bg-surface border border-border text-text font-body px-4 py-3 rounded-lg mb-3"
              placeholder={label} placeholderTextColor="#52525b"
              value={value} onChangeText={setter} keyboardType="decimal-pad" />
          ))}

          <TouchableOpacity onPress={handleSave} className="bg-primary py-4 rounded-lg items-center mt-2">
            <Text className="text-bg font-display">Save Meal</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 3: Create `app/(tabs)/nutrition/weekly-summary.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getWeekLogs } from '../../../src/services/nutritionService'

export default function WeeklySummaryScreen() {
  const [week, setWeek] = useState<Record<string, any>>({})
  useEffect(() => { getWeekLogs().then(setWeek) }, [])
  const days = Object.keys(week).sort()

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-4">Weekly Summary</Text>
        {days.length === 0 && <Text className="text-muted font-body text-center py-8">No data this week</Text>}
        {days.map(d => (
          <View key={d} className="bg-card border border-border rounded-xl px-4 py-3 mb-2">
            <Text className="text-soft font-body text-xs mb-1">{d}</Text>
            <Text className="text-text font-body">P:{Math.round(week[d].protein)}g  C:{Math.round(week[d].carbs)}g  F:{Math.round(week[d].fats)}g</Text>
            <Text className="text-primary font-mono text-sm">{Math.round(week[d].calories)} kcal</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add mobile-app/app/(tabs)/nutrition/
git commit -m "feat(mobile): nutrition tab — daily log, add meal, AI analysis, weekly summary"
```

---

## Phase 8 — Progress Tab

### Task 16: Progress screen + Calculators

**Files:**
- Modify: `mobile-app/app/(tabs)/progress/index.tsx`
- Create: `mobile-app/app/(tabs)/progress/calculators.tsx`

- [ ] **Step 1: Build Progress index screen**

```tsx
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useProgress } from '../../../src/hooks/useProgress'

export default function ProgressScreen() {
  const { prs } = useProgress()
  const prList  = Object.entries(prs).sort(([a], [b]) => a.localeCompare(b))

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-4">Progress</Text>

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-soft font-body text-xs uppercase tracking-widest">Personal Records</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/progress/calculators')}
            className="border border-accent/30 bg-accent/10 px-3 py-1 rounded-full">
            <Text className="text-accent font-body text-xs">Calculators</Text>
          </TouchableOpacity>
        </View>

        {prList.length === 0 && <Text className="text-muted font-body text-sm text-center py-8">No PRs yet. Log your first workout!</Text>}

        {prList.map(([name, pr]: any) => (
          <View key={name} className="bg-card border border-border rounded-xl px-4 py-3 mb-2">
            <Text className="text-text font-body">{name}</Text>
            <Text className="text-primary font-mono text-sm">{pr.weight}kg × {pr.reps} reps</Text>
            <Text className="text-muted font-body text-xs">{pr.achieved_at?.split('T')[0]}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 2: Create `app/(tabs)/progress/calculators.tsx`**

```tsx
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function bmi(weight: number, heightCm: number) {
  const h = heightCm / 100
  return weight / (h * h)
}

function bmr(weight: number, heightCm: number, age: number, male: boolean) {
  return male
    ? 88.362 + 13.397 * weight + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weight + 3.098 * heightCm - 4.330 * age
}

function oneRM(weight: number, reps: number) {
  return weight * (1 + reps / 30) // Epley
}

export default function CalculatorsScreen() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge]       = useState('')
  const [male, setMale]     = useState(true)
  const [liftW, setLiftW]   = useState('')
  const [liftR, setLiftR]   = useState('')

  const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age)
  const bmiVal = w && h ? bmi(w, h) : null
  const bmrVal = w && h && a ? bmr(w, h, a, male) : null
  const rmVal  = parseFloat(liftW) && parseInt(liftR) ? oneRM(parseFloat(liftW), parseInt(liftR)) : null

  const bmiCat = bmiVal ? bmiVal < 18.5 ? 'Underweight' : bmiVal < 25 ? 'Normal' : bmiVal < 30 ? 'Overweight' : 'Obese' : null

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerClassName="px-4 py-4">
          <Text className="text-text font-display text-2xl mb-4">Calculators</Text>

          {/* BMI/BMR inputs */}
          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-soft font-body text-xs uppercase tracking-widest mb-3">Body Stats</Text>
            <View className="flex-row gap-2 mb-3">
              {[['Weight (kg)', weight, setWeight], ['Height (cm)', height, setHeight], ['Age', age, setAge]].map(([label, val, set]: any) => (
                <View key={label} className="flex-1">
                  <Text className="text-muted font-body text-xs mb-1">{label}</Text>
                  <TextInput className="bg-surface border border-border text-text font-mono px-2 py-2 rounded-lg text-center"
                    value={val} onChangeText={set} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#52525b" />
                </View>
              ))}
            </View>
            <View className="flex-row gap-2 mb-4">
              {['Male', 'Female'].map((s, i) => (
                <TouchableOpacity key={s} onPress={() => setMale(i === 0)}
                  className={`flex-1 py-2 rounded-lg border items-center ${male === (i === 0) ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <Text className={male === (i === 0) ? 'text-primary font-body' : 'text-muted font-body'}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {bmiVal && <Text className="text-text font-body mb-1">BMI: <Text className="text-primary font-mono">{bmiVal.toFixed(1)}</Text> ({bmiCat})</Text>}
            {bmrVal && <Text className="text-text font-body">BMR: <Text className="text-primary font-mono">{Math.round(bmrVal)}</Text> kcal/day</Text>}
            {bmrVal && <Text className="text-soft font-body text-xs mt-1">TDEE (moderate): {Math.round(bmrVal * 1.55)} kcal</Text>}
          </View>

          {/* 1RM */}
          <View className="bg-card border border-border rounded-xl p-4">
            <Text className="text-soft font-body text-xs uppercase tracking-widest mb-3">1RM Calculator (Epley)</Text>
            <View className="flex-row gap-2 mb-2">
              <View className="flex-1">
                <Text className="text-muted font-body text-xs mb-1">Weight (kg)</Text>
                <TextInput className="bg-surface border border-border text-text font-mono px-2 py-2 rounded-lg text-center"
                  value={liftW} onChangeText={setLiftW} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#52525b" />
              </View>
              <View className="flex-1">
                <Text className="text-muted font-body text-xs mb-1">Reps</Text>
                <TextInput className="bg-surface border border-border text-text font-mono px-2 py-2 rounded-lg text-center"
                  value={liftR} onChangeText={setLiftR} keyboardType="number-pad" placeholder="0" placeholderTextColor="#52525b" />
              </View>
            </View>
            {rmVal && <Text className="text-text font-body">Estimated 1RM: <Text className="text-primary font-display text-lg">{Math.round(rmVal)}kg</Text></Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add mobile-app/app/(tabs)/progress/
git commit -m "feat(mobile): progress tab — PRs list, BMI/BMR/1RM calculators"
```

---

## Phase 9 — More Tab

### Task 17: More tab (Training Guide + Settings)

**Files:**
- Modify: `mobile-app/app/(tabs)/more/index.tsx`
- Create: `mobile-app/app/(tabs)/more/training-guide.tsx`
- Create: `mobile-app/app/(tabs)/more/settings.tsx`

- [ ] **Step 1: Build More index screen**

```tsx
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuth } from '../../../src/hooks/useAuth'

const ITEMS = [
  { label: 'Training Guide', route: '/(tabs)/more/training-guide', icon: '📖' },
  { label: 'Settings & Export', route: '/(tabs)/more/settings', icon: '⚙️' },
]

export default function MoreScreen() {
  const { signOut } = useAuth()
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-6">More</Text>
        {ITEMS.map(item => (
          <TouchableOpacity key={item.label} onPress={() => router.push(item.route as any)}
            className="bg-card border border-border rounded-xl px-4 py-4 mb-3 flex-row items-center">
            <Text className="text-xl mr-3">{item.icon}</Text>
            <Text className="text-text font-body flex-1">{item.label}</Text>
            <Text className="text-muted">›</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={signOut}
          className="mt-4 border border-danger/30 bg-danger/10 rounded-xl py-4 items-center">
          <Text className="text-danger font-body">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 2: Create `app/(tabs)/more/training-guide.tsx`**

```tsx
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TIPS = [
  { title: 'Progressive Overload', body: 'Increase weight or reps each week by 2.5–5%. Track every set to spot plateaus early.' },
  { title: 'Rest & Recovery', body: 'Muscle grows during rest, not training. Aim for 7–9 hours sleep. Rest ≥48h before hitting the same muscle group.' },
  { title: 'Protein Timing', body: 'Hit your protein target daily — timing matters less than total intake. 1.6–2.2g per kg bodyweight.' },
  { title: 'Compound First', body: 'Start sessions with big compound lifts (Squat, Deadlift, Bench, Row) when energy is highest.' },
  { title: 'Mind-Muscle Connection', body: 'Slow the eccentric phase. Feel the target muscle working, not just moving weight from A to B.' },
  { title: 'Deload Weeks', body: 'Every 4–8 weeks, reduce volume by 40–50%. Prevents CNS fatigue and reduces injury risk.' },
]

export default function TrainingGuideScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-4">Training Guide</Text>
        {TIPS.map(tip => (
          <View key={tip.title} className="bg-card border border-border rounded-xl p-4 mb-3">
            <Text className="text-primary font-display text-base mb-2">{tip.title}</Text>
            <Text className="text-soft font-body text-sm leading-5">{tip.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 3: Create `app/(tabs)/more/settings.tsx`**

```tsx
import { useState } from 'react'
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { buildExportData, shareExport } from '../../../src/services/exportService'

export default function SettingsScreen() {
  const today = new Date().toISOString().split('T')[0]
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
  const [include, setInclude] = useState({ workoutSessions: true, exerciseLogs: true, nutritionLogs: true, personalRecords: true })
  const [exporting, setExporting] = useState(false)

  function toggle(key: keyof typeof include) {
    setInclude(prev => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleExport() {
    setExporting(true)
    try {
      const data = await buildExportData({ from: monthAgo, to: today, include })
      await shareExport(data, monthAgo, today)
    } catch (e: any) { Alert.alert('Export failed', e.message) }
    finally { setExporting(false) }
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-4 py-4">
        <Text className="text-text font-display text-2xl mb-4">Settings</Text>
        <Text className="text-soft font-body text-xs uppercase tracking-widest mb-2">Export Data (Last 30 Days)</Text>

        {Object.keys(include).map(key => (
          <View key={key} className="flex-row justify-between items-center bg-card border border-border rounded-xl px-4 py-3 mb-2">
            <Text className="text-text font-body capitalize">{key.replace(/([A-Z])/g, ' $1')}</Text>
            <Switch value={(include as any)[key]} onValueChange={() => toggle(key as any)} trackColor={{ true: '#a3e635' }} />
          </View>
        ))}

        <TouchableOpacity onPress={handleExport} disabled={exporting}
          className="mt-4 bg-primary py-4 rounded-lg items-center">
          {exporting ? <ActivityIndicator color="#0f0f0f" /> : <Text className="text-bg font-display">Export to Device</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add mobile-app/app/(tabs)/more/
git commit -m "feat(mobile): more tab — training guide, settings, data export"
```

---

## Phase 10 — Polish

### Task 18: Offline banner + OfflineBanner component

**Files:**
- Create: `mobile-app/src/components/OfflineBanner.tsx`
- Modify: `mobile-app/app/_layout.tsx`

- [ ] **Step 1: Create `src/components/OfflineBanner.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => setOffline(!state.isConnected))
    return unsub
  }, [])

  if (!offline) return null
  return (
    <View className="bg-danger px-4 py-2">
      <Text className="text-white font-body text-xs text-center">No internet — changes saved locally</Text>
    </View>
  )
}
```

- [ ] **Step 2: Add OfflineBanner to root layout**

In `app/_layout.tsx`, wrap the Stack with a View and add OfflineBanner:

```tsx
import '../global.css'
import { useEffect } from 'react'
import { View } from 'react-native'
import { Stack, router } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAuth } from '../src/hooks/useAuth'
import { registerOnlineListener } from '../src/services/offlineSync'
import OfflineBanner from '../src/components/OfflineBanner'

export default function RootLayout() {
  const { user, loading } = useAuth()

  useEffect(() => { registerOnlineListener() }, [])
  useEffect(() => {
    if (loading) return
    if (!user) router.replace('/(auth)/login')
  }, [user, loading])

  return (
    <SafeAreaProvider>
      <OfflineBanner />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add mobile-app/src/components/OfflineBanner.tsx mobile-app/app/_layout.tsx
git commit -m "feat(mobile): offline banner, SafeAreaProvider in root layout"
```

---

### Task 19: Final smoke test + push

- [ ] **Step 1: Run on iOS simulator**

```bash
cd mobile-app && npx expo run:ios
```

Test checklist:
- Login screen appears
- Tabs load after login
- Home shows streak + macro ring
- Workout tab: Programs → day → log a set → rest timer → PR toast
- Nutrition tab: add meal manually + AI text analysis
- Progress tab: PRs appear after logging, calculators work
- More tab: training guide readable, export triggers share sheet
- Sign out returns to login

- [ ] **Step 2: Run on Android**

```bash
npx expo run:android
```

Same checklist.

- [ ] **Step 3: Push branch**

```bash
git push -u origin mobile-app
```

---

## Summary

| Phase | Tasks | Outcome |
|-------|-------|---------|
| 1 — Scaffold | 1–3 | Expo project, NativeWind, Supabase client |
| 2 — Data Layer | 4–7 | All services + hooks adapted, data files copied |
| 3 — Navigation | 8–9 | Auth guard, login, 5-tab navigator |
| 4 — Components | 10–11 | MacroBar, MacroRing, ExerciseCard, SetLogger, RestTimer |
| 5 — Home | 12 | Dashboard with streak + calories |
| 6 — Workout | 13–14 | Programs, WeekPlan, Day workout, Exercise Library |
| 7 — Nutrition | 15 | Daily log, Add meal, AI analysis, Weekly summary |
| 8 — Progress | 16 | PRs, BMI/BMR/1RM calculators |
| 9 — More | 17 | Training guide, Settings + export |
| 10 — Polish | 18–19 | Offline banner, smoke test, push |
