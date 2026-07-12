import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getPRs } from '../hooks/useProgress'
import { getTodayKey, WORKOUT_DATA, DAY_LABELS, isRestDay } from '../data/workouts'
import { getCurrentWeekConfig } from '../data/weekPlan'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function Home() {
  const { user, signOut } = useAuth()
  const todayKey = getTodayKey()
  const todayWorkout = WORKOUT_DATA[todayKey]
  const weekConfig = getCurrentWeekConfig()
  const prs = getPRs()
  const prCount = Object.keys(prs).length

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-white">Good {getGreeting()}</h1>
          <p className="text-soft text-xs">{user?.email}</p>
        </div>
        <button onClick={signOut} className="text-muted text-xs">Sign out</button>
      </div>

      <div className="bg-card border border-line rounded-xl p-4">
        <p className="text-soft text-xs mb-1">Current Phase</p>
        <p className="text-white font-semibold">Week {weekConfig.week} — {weekConfig.label}</p>
        <p className="text-muted text-xs mt-1">{weekConfig.note}</p>
      </div>

      {isRestDay(todayKey) ? (
        <div className="bg-card border border-line rounded-xl p-4 text-center">
          <p className="text-2xl mb-2">😴</p>
          <p className="text-white font-semibold">Rest Day</p>
          <p className="text-soft text-xs mt-1">Light walk 30-45 min</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-white font-semibold text-sm">{DAY_LABELS[todayKey]}</h2>
          <Link to={`/workout/${todayKey}`}
            className="block bg-gym/10 border border-gym/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gym text-xs font-semibold uppercase tracking-wider">Morning Gym</p>
                <p className="text-white text-sm mt-1">{todayWorkout?.gym?.length ?? 0} exercises</p>
              </div>
              <span className="text-gym text-xl">→</span>
            </div>
          </Link>
          <Link to={`/calisthenics/${todayKey}`}
            className="block bg-cali/10 border border-cali/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cali text-xs font-semibold uppercase tracking-wider">Evening Calisthenics</p>
                <p className="text-white text-sm mt-1">{todayWorkout?.cali?.length ?? 0} exercises</p>
              </div>
              <span className="text-cali text-xl">→</span>
            </div>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-line rounded-xl p-3 text-center">
          <p className="text-gold text-xl font-bold font-mono">{prCount}</p>
          <p className="text-soft text-xs mt-1">Personal Records</p>
        </div>
        <Link to="/nutrition" className="bg-card border border-line rounded-xl p-3 text-center">
          <p className="text-cardio text-xl font-bold font-mono">Track</p>
          <p className="text-soft text-xs mt-1">Today's Nutrition</p>
        </Link>
      </div>
    </div>
  )
}
