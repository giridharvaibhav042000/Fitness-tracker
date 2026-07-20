# Mobile App Design — Fitness Tracker (Expo / React Native)

**Date:** 2026-07-20  
**Branch:** `mobile-app`  
**Project:** `mobile-app/` folder inside existing repo  
**Platform:** iOS + Android  
**Framework:** Expo SDK 53 + Expo Router + NativeWind v4

---

## 1. Architecture

### Repository Layout

```
fitness--development/
├── fitness-app/          ← existing web app (untouched)
└── mobile-app/           ← new Expo project (this spec)
    ├── app/
    │   ├── _layout.tsx              ← root layout, auth guard
    │   ├── (auth)/
    │   │   └── login.tsx
    │   └── (tabs)/
    │       ├── _layout.tsx          ← bottom tab navigator
    │       ├── index.tsx            ← Home
    │       ├── workout/
    │       │   ├── _layout.tsx
    │       │   ├── index.tsx        ← Programs / mode select
    │       │   ├── week-plan.tsx
    │       │   ├── [day].tsx        ← Gym workout day
    │       │   ├── calisthenics/
    │       │   │   └── [day].tsx
    │       │   └── exercise-library.tsx
    │       ├── nutrition/
    │       │   ├── _layout.tsx
    │       │   ├── index.tsx        ← Daily log + date nav
    │       │   ├── diet-plan.tsx
    │       │   └── weekly-summary.tsx
    │       ├── progress/
    │       │   ├── _layout.tsx
    │       │   ├── index.tsx        ← PRs + measurements
    │       │   └── calculators.tsx  ← BMI/BMR/1RM
    │       └── more/
    │           ├── _layout.tsx
    │           ├── index.tsx        ← More menu
    │           ├── training-guide.tsx
    │           └── settings.tsx
    ├── src/
    │   ├── components/              ← mobile-specific components
    │   ├── hooks/                   ← adapted from web app
    │   ├── services/                ← supabase + business logic
    │   ├── data/                    ← copied from web app (pure JS)
    │   └── theme/                   ← NativeWind + color tokens
    ├── assets/                      ← icons, splash, images
    ├── app.json                     ← Expo config (bundle IDs, etc.)
    ├── tailwind.config.js
    ├── babel.config.js
    └── package.json
```

### Key Principles

- **Expo Router** for file-based routing (same mental model as web, standard in Expo SDK 50+)
- **Offline-first**: AsyncStorage as primary store, background Supabase sync
- **Same Supabase backend** as the web app — shared DB tables and edge functions
- **No shared package** between web and mobile — hooks/services/data copied and adapted independently; simpler than a monorepo for current scale
- Web app remains completely untouched on `mobile-app` branch

---

## 2. Screens & Navigation

### Bottom Tab Navigator (5 tabs)

```
Home        Workout      Nutrition      Progress      More
 🏠           💪            🥗              📈           ☰
```

### Tab: Home
- Workout streak (current + best)
- Today's macro ring (calories progress)
- Today's workout summary card
- Quick-log CTA buttons (Log Set, Log Meal)
- Pull-to-refresh

### Tab: Workout (stack)
1. **Programs** — mode select (Gym / Cali / Gym+Cali / HIIT / Warmup) + goal select
2. **Week Plan** — 6-week cycle overview with current week highlighted
3. **[Day] Workout** — ExerciseCard list, progressive overload hints, SetLogger bottom sheet
4. **Calisthenics [Day]** — bodyweight variant, PR detection
5. **Exercise Library** — searchable, muscle-group filtered, YouTube links

### Tab: Nutrition (stack)
1. **Daily Log** — date navigator, macro bars, meal list, add meal FAB
2. **Add Meal** — text input + camera photo → AI edge function analysis
3. **Diet Plan** — preset meal reference (read-only)
4. **Weekly Summary** — 7-day macro breakdown

### Tab: Progress (stack)
1. **Overview** — personal records list + body measurements
2. **Calculators** — BMI / BMR / TDEE / 1RM (Epley formula)

### Tab: More (list → stack)
- Training Guide
- Settings (data export to internal storage)
- Sign Out

### Screen-to-Web-Page Mapping (all 12 web pages covered)

| Web Page | Mobile Screen |
|---|---|
| Home.jsx | (tabs)/index.tsx |
| Workout.jsx | (tabs)/workout/[day].tsx |
| Calisthenics.jsx | (tabs)/workout/calisthenics/[day].tsx |
| Nutrition.jsx | (tabs)/nutrition/index.tsx |
| Progress.jsx | (tabs)/progress/index.tsx |
| ExerciseLibrary.jsx | (tabs)/workout/exercise-library.tsx |
| DietPlan.jsx | (tabs)/nutrition/diet-plan.tsx |
| TrainingGuide.jsx | (tabs)/more/training-guide.tsx |
| Programs.jsx | (tabs)/workout/index.tsx |
| WeekPlan.jsx | (tabs)/workout/week-plan.tsx |
| Settings.jsx | (tabs)/more/settings.tsx |
| Login.jsx | (auth)/login.tsx |

---

## 3. Data & State Layer

### Storage Layers

| Data Type | Storage |
|---|---|
| App state (meals, sets, PRs, plans) | `AsyncStorage` — key-value, fast reads |
| Exported files (JSON reports) | `expo-file-system` → device internal storage |
| Meal photos (AI analysis) | `expo-file-system` temp cache → edge function → deleted |
| Offline sync queue | `AsyncStorage` key `offline_queue` |
| Cloud backup | Supabase (same tables as web app) |

### Hook Adaptation Map

All 6 hooks from the web app are copied into `src/hooks/` and adapted:

| Hook | Change |
|---|---|
| `useAuth.js` | No change — Supabase auth works natively |
| `useWorkout.js` | `localStorage` → `AsyncStorage` |
| `useNutrition.js` | `localStorage` → `AsyncStorage` |
| `useProgress.js` | `localStorage` → `AsyncStorage` |
| `useWorkoutPlan.js` | `localStorage` → `AsyncStorage` |
| `useWorkoutMode.js` | `localStorage` → `AsyncStorage` |

AsyncStorage is async (Promise-based); hooks use `useEffect` with `await` on mount and wrap writes in async helpers. Hook interfaces (what pages consume) stay identical.

### Services

| Service | Adaptation |
|---|---|
| `supabase.js` | `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY` env vars |
| `workoutService.js` | AsyncStorage reads/writes instead of localStorage |
| `nutritionService.js` | AsyncStorage reads/writes instead of localStorage |
| `aiNutritionService.js` | No change — fetch to edge function works in RN |
| `offlineSync.js` | `NetInfo` replaces `navigator.onLine` |
| `exportService.js` | `expo-file-system` + `expo-sharing` replaces browser download |

### Data Files (copied verbatim — pure JS, zero browser deps)

- `workouts.js`, `splits.js`, `programs.js`, `nutrition.js`, `variations.js`, `weekPlan.js`

---

## 4. Mobile Components

### New Components (no web equivalent)

| Component | Purpose |
|---|---|
| `BottomSheet.tsx` | Reusable drag-up sheet for SetLogger, add meal |
| `TabBar.tsx` | Custom bottom tab bar with active indicators |
| `DateNavigator.tsx` | Swipeable date picker strip |
| `MacroRing.tsx` | Circular progress ring for calorie display on Home |
| `OfflineBanner.tsx` | Native top banner when no connection |
| `PRToast.tsx` | Native haptic + animated toast on new PR |

### Adapted Components (from web)

| Web Component | Mobile Adaptation |
|---|---|
| `ExerciseCard.jsx` | Port to RN View/Text, same props interface |
| `SetLogger.jsx` | Inside BottomSheet, `KeyboardAvoidingView` |
| `RestTimer.jsx` | Circular timer + background notification via `expo-notifications` |
| `MacroBar.jsx` | Port to RN, same logic |
| `WeeklyNutritionSummary.jsx` | Port to RN ScrollView |
| `Nav.jsx` | Replaced by Expo Router tab navigator |
| `PRBadge.jsx` | Replaced by `PRToast.tsx` with haptics |

---

## 5. Mobile-Specific Features

### Native Enhancements

| Feature | Implementation |
|---|---|
| Haptic feedback | `expo-haptics` — on PR, set logged, timer done |
| Background rest timer | `expo-notifications` — fires when app minimized |
| Meal photo → AI | `expo-image-picker` → base64 → edge function |
| Biometric login | `expo-local-authentication` (Face ID / fingerprint) |
| Pull-to-refresh | `RefreshControl` on Home, Nutrition, Progress |
| Safe areas | `react-native-safe-area-context` on all screens |
| Keyboard avoiding | `KeyboardAvoidingView` on all input forms |
| Internal storage | `expo-file-system` for exports and temp files |
| File sharing | `expo-sharing` to share exported JSON |

### Intentionally Deferred (v2)

- JSON meal import tab (replaced by camera meal analysis in v1)
- Apple Health / Google Fit integration
- Push notification reminders (workout reminders)
- Watch app (watchOS / WearOS)

---

## 6. Styling

**NativeWind v4** — Tailwind class syntax in React Native. Same color tokens as the web app:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#your-primary',   // match web app CSS vars
      surface: '#your-surface',
      // ... all 12 color variables from web index.css
    },
    fontFamily: {
      display: ['Oxanium'],       // same as web
      mono:    ['SpaceMono'],
      body:    ['DMSans'],
    }
  }
}
```

Fonts loaded via `expo-font`. All screens use `SafeAreaView` from `react-native-safe-area-context`.

---

## 7. Expo Configuration

```json
// app.json (key fields)
{
  "expo": {
    "name": "Fitness Tracker",
    "slug": "fitness-tracker",
    "version": "1.0.0",
    "orientation": "portrait",
    "ios": {
      "bundleIdentifier": "com.kilowott.fitnesstracker",
      "supportsTablet": false
    },
    "android": {
      "package": "com.kilowott.fitnesstracker",
      "adaptiveIcon": true
    },
    "plugins": [
      "expo-router",
      "expo-camera",
      "expo-notifications",
      "expo-local-authentication",
      "expo-file-system"
    ]
  }
}
```

---

## 8. Full Dependency List

```
expo ~53
expo-router
expo-file-system
expo-sharing
expo-image-picker
expo-camera
expo-haptics
expo-notifications
expo-local-authentication
expo-network
expo-splash-screen
expo-font
nativewind
tailwindcss
@supabase/supabase-js
@react-native-async-storage/async-storage
react-native-safe-area-context
react-native-gesture-handler
react-native-reanimated
react-native-screens
@react-native-community/netinfo
```

---

## 9. Implementation Order

1. Expo project scaffold (`npx create-expo-app mobile-app`)
2. NativeWind + font setup
3. Supabase client + auth flow (Login screen, root auth guard)
4. Copy + adapt all 6 hooks (AsyncStorage)
5. Copy + adapt all services
6. Copy data files verbatim
7. Bottom tab navigator + placeholder screens
8. Home screen
9. Workout tab (Programs → WeekPlan → Day → SetLogger)
10. Nutrition tab (Daily log → Add meal → AI analysis)
11. Progress tab (PRs → Measurements → Calculators)
12. More tab (Training Guide → Settings/export)
13. Mobile-specific features (haptics, notifications, camera)
14. Polish (safe areas, keyboard avoiding, pull-to-refresh, offline banner)
