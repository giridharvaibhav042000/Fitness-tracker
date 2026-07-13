import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getPRs } from '../hooks/useProgress'
import { getWorkoutStreak, getBestStreak } from '../services/workoutService'
import { getTodayKey, WORKOUT_DATA, DAY_LABELS, isRestDay } from '../data/workouts'
import { SPLITS, SPLIT_META, SPLIT_DATA } from '../data/splits'
import { WORKOUT_MODES, MODE_LABELS, MODE_GOALS } from '../data/programs'
import { GOAL_META } from '../data/variations'
import { useWorkoutPlan } from '../hooks/useWorkoutPlan'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function Home() {
  const { user, signOut } = useAuth()
  const todayKey  = getTodayKey()
  const mode      = localStorage.getItem('workoutMode')  || WORKOUT_MODES.GYM_CALI
  const split     = localStorage.getItem('workoutSplit') || SPLITS.FULL_BODY
  const splitMeta = SPLIT_META[split]
  const todayWorkout = split === SPLITS.FULL_BODY
    ? WORKOUT_DATA[todayKey]
    : SPLIT_DATA[split]?.[todayKey]
  const prs = getPRs()
  const prCount = Object.keys(prs).length
  const streak     = getWorkoutStreak()
  const bestStreak = getBestStreak()

  const { goal, weekIndex, weekCycle, modifier } = useWorkoutPlan()
  const goalMeta = goal ? GOAL_META[goal] : null

  const showGym    = [WORKOUT_MODES.GYM_ONLY, WORKOUT_MODES.GYM_CALI, WORKOUT_MODES.HIIT].includes(mode)
  const showCali   = [WORKOUT_MODES.CALI_ONLY, WORKOUT_MODES.GYM_CALI].includes(mode)
  const showWarmup = mode === WORKOUT_MODES.WARMUP

  const gymLabel  = mode === WORKOUT_MODES.HIIT ? 'HIIT Session' : 'Morning Gym'
  const gymColor  = mode === WORKOUT_MODES.HIIT ? 'text-warn' : 'text-gym'
  const gymBorder = mode === WORKOUT_MODES.HIIT ? 'bg-warn/10 border-warn/30' : 'bg-gym/10 border-gym/30'
  const gymArrow  = mode === WORKOUT_MODES.HIIT ? 'text-warn' : 'text-gym'

  return (
    <div className="p-4 space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-white">Good {getGreeting()}</h1>
          <p className="text-soft text-xs">{user?.email}</p>
        </div>
        <button onClick={signOut} className="text-muted text-xs">Sign out</button>
      </div>

      {/* Plan summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Current week card */}
        <Link to="/programs" className={`rounded-xl p-3 border ${goalMeta?.cardBg || 'bg-card border-line'}`}>
          <p className="text-soft text-xs mb-1">Week {weekIndex + 1} of {weekCycle}</p>
          <p className={`text-sm font-bold ${goalMeta?.color || 'text-gym'}`}>
            {goalMeta?.icon} {modifier?.label || 'Training'}
          </p>
          <p className="text-muted text-xs mt-0.5 truncate">{modifier?.intensity || ''}</p>
        </Link>

        {/* Active plan card */}
        <Link to="/programs" className={`rounded-xl p-3 border ${splitMeta?.cardBg || 'bg-card border-gym/30'}`}>
          <p className="text-soft text-xs mb-1">Active Split</p>
          <p className={`text-sm font-bold ${splitMeta?.color || 'text-gym'}`}>
            {splitMeta?.icon} {splitMeta?.label}
          </p>
          <p className="text-muted text-xs mt-0.5 truncate">{MODE_LABELS[mode]}</p>
        </Link>
      </div>

      {/* Today's workout links */}
      {isRestDay(todayKey) ? (
        <div className="bg-card border border-line rounded-xl p-4 text-center">
          <p className="text-2xl mb-2">😴</p>
          <p className="text-white font-semibold">Rest Day</p>
          <p className="text-soft text-xs mt-1">Light walk 30-45 min</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-white font-semibold text-sm">
            {split === SPLITS.FULL_BODY
              ? DAY_LABELS[todayKey]
              : (splitMeta?.dayLabels?.[todayKey] || DAY_LABELS[todayKey])}
          </h2>

          {/* Week coaching note */}
          {modifier?.note && (
            <div className="bg-card border border-line rounded-xl px-3 py-2">
              <p className="text-muted text-xs italic">{modifier.note}</p>
            </div>
          )}

          {showGym && (
            <Link to={`/workout/${todayKey}`} className={`block border rounded-xl p-4 ${gymBorder}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${gymColor} text-xs font-semibold uppercase tracking-wider`}>{gymLabel}</p>
                  <p className="text-white text-sm mt-1">{todayWorkout?.gym?.length ?? 0} exercises</p>
                </div>
                <span className={`${gymArrow} text-xl`}>→</span>
              </div>
            </Link>
          )}

          {showCali && (
            <Link to={`/calisthenics/${todayKey}`} className="block bg-cali/10 border border-cali/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cali text-xs font-semibold uppercase tracking-wider">Evening Calisthenics</p>
                  <p className="text-white text-sm mt-1">{todayWorkout?.cali?.length ?? 0} exercises</p>
                </div>
                <span className="text-cali text-xl">→</span>
              </div>
            </Link>
          )}

          {showWarmup && (
            <Link to={`/workout/${todayKey}`} className="block bg-cardio/10 border border-cardio/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cardio text-xs font-semibold uppercase tracking-wider">Warmup Session</p>
                  <p className="text-white text-sm mt-1">15 exercises · 10-15 min</p>
                </div>
                <span className="text-cardio text-xl">→</span>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-line rounded-xl p-3 text-center">
          <p className="text-gym text-xl font-bold font-mono">{streak}</p>
          <p className="text-soft text-xs mt-1">Day Streak</p>
        </div>
        <div className="bg-card border border-line rounded-xl p-3 text-center">
          <p className="text-gold text-xl font-bold font-mono">{bestStreak}</p>
          <p className="text-soft text-xs mt-1">Best Streak</p>
        </div>
        <div className="bg-card border border-line rounded-xl p-3 text-center">
          <p className="text-gold text-xl font-bold font-mono">{prCount}</p>
          <p className="text-soft text-xs mt-1">Personal Records</p>
        </div>
      </div>
    </div>
  )
}
