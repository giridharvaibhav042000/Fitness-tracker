import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { WORKOUT_DATA } from '../data/workouts'
import { SPLITS, SPLIT_DATA, SPLIT_META } from '../data/splits'
import { WORKOUT_MODES, MODE_LABELS, HIIT_EXERCISES, WARMUP_EXERCISES } from '../data/programs'
import { GOAL_META } from '../data/variations'
import { useWorkout } from '../hooks/useWorkout'
import { getLastSetForExercise } from '../services/workoutService'
import { useProgress } from '../hooks/useProgress'
import { useWorkoutPlan } from '../hooks/useWorkoutPlan'
import ExerciseCard from '../components/ExerciseCard'
import SetLogger from '../components/SetLogger'
import PRBadge from '../components/PRBadge'

function resolveDayKey(day) {
  if (day === 'today') {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[new Date().getDay()]
  }
  return day
}

function getRawExercises(dayKey, mode) {
  if (mode === WORKOUT_MODES.HIIT)   return HIIT_EXERCISES
  if (mode === WORKOUT_MODES.WARMUP) return WARMUP_EXERCISES

  const split     = localStorage.getItem('workoutSplit') || SPLITS.FULL_BODY
  const dayData   = split === SPLITS.FULL_BODY
    ? (WORKOUT_DATA[dayKey] || {})
    : (SPLIT_DATA[split]?.[dayKey] || {})

  switch (mode) {
    case WORKOUT_MODES.GYM_ONLY:  return dayData.gym  ?? []
    case WORKOUT_MODES.CALI_ONLY: return dayData.cali ?? []
    case WORKOUT_MODES.GYM_CALI:
    default:
      return [...(dayData.gym ?? []), ...(dayData.cali ?? [])]
  }
}

function applyModifier(exercise, modifier) {
  if (!modifier) return exercise
  return { ...exercise, sets: modifier.sets, reps: modifier.reps, rest: modifier.rest }
}

const MODE_COLOR = {
  [WORKOUT_MODES.HIIT]:     'text-warn',
  [WORKOUT_MODES.WARMUP]:   'text-cardio',
  [WORKOUT_MODES.CALI_ONLY]: 'text-cali',
  [WORKOUT_MODES.GYM_ONLY]: 'text-gym',
  [WORKOUT_MODES.GYM_CALI]: 'text-gym',
}

export default function Workout() {
  const { day } = useParams()
  const dayKey = resolveDayKey(day)
  const mode = localStorage.getItem('workoutMode') || WORKOUT_MODES.GYM_CALI

  const { modifier, goal, weekIndex, weekCycle } = useWorkoutPlan()

  // HIIT and Warmup don't use plan modifiers (they're fixed protocols)
  const shouldApplyModifier = mode !== WORKOUT_MODES.HIIT && mode !== WORKOUT_MODES.WARMUP

  let exercises = getRawExercises(dayKey, mode)

  // Filter compulsory-only weeks
  if (shouldApplyModifier && modifier?.compulsoryOnly) {
    exercises = exercises.filter(ex => ex.compulsory)
  }

  // Apply sets/reps/rest overrides from goal cycle
  if (shouldApplyModifier) {
    exercises = exercises.map(ex => applyModifier(ex, modifier))
  }

  const sessionType = mode === WORKOUT_MODES.CALI_ONLY ? 'cali' : 'gym'
  const { session, logs, recordSet, editSet } = useWorkout(dayKey, sessionType)
  const { newPR, checkAndSavePR } = useProgress()
  const [activeExercise, setActiveExercise] = useState(null)

  async function handleSetComplete({ exercise_name, set_number, weight, reps }) {
    const exercise = exercises.find(e => e.name === exercise_name)
    if (!exercise) return
    const log = await recordSet(exercise, set_number, weight, reps)
    if (log) await checkAndSavePR({ exercise_name, weight, reps })
    setActiveExercise(null)
  }

  const goalMeta = goal ? GOAL_META[goal] : null
  const weekLabel = modifier ? `Wk ${weekIndex + 1}/${weekCycle} — ${modifier.label}` : null

  return (
    <div className="p-4 space-y-4">
      <PRBadge show={!!newPR} exerciseName={newPR} />

      {/* Header */}
      <div>
        <p className={`${MODE_COLOR[mode] || 'text-gym'} text-xs font-semibold uppercase tracking-wider`}>
          {MODE_LABELS[mode] || 'Workout'}
        </p>
        <h1 className="text-white font-display text-xl font-bold capitalize">{dayKey}</h1>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {goalMeta && (
            <span className={`text-xs font-semibold ${goalMeta.color}`}>
              {goalMeta.icon} {goalMeta.fullLabel}
            </span>
          )}
          {weekLabel && <span className="text-muted text-xs">{weekLabel}</span>}
          <span className="text-muted text-xs">{exercises.length} exercises</span>
        </div>
      </div>

      {/* Coaching note for the week */}
      {shouldApplyModifier && modifier?.note && (
        <div className={`rounded-xl p-3 border ${goalMeta?.cardBg || 'bg-card border-line'}`}>
          <p className={`text-xs font-bold ${goalMeta?.color || 'text-gym'}`}>
            {modifier.intensity} · {modifier.sets}×{modifier.reps} · {modifier.rest}s rest
          </p>
          <p className="text-soft text-xs mt-1 italic">{modifier.note}</p>
          {modifier.compulsoryOnly && (
            <p className="text-gold text-xs mt-1">⭐ Compulsory exercises only this week</p>
          )}
        </div>
      )}

      {activeExercise && (
        <SetLogger
          exercise={activeExercise.exercise}
          setNumber={activeExercise.setNumber}
          onComplete={handleSetComplete}
        />
      )}

      {exercises.length === 0 ? (
        <div className="bg-card border border-line rounded-xl p-6 text-center">
          {localStorage.getItem('workoutSplit') === SPLITS.REST_DAY ? (
            <>
              <p className="text-4xl mb-3">😴</p>
              <p className="text-white font-semibold">Rest Day</p>
              <p className="text-soft text-xs mt-1">Light walk 20-30 min. No training today.</p>
            </>
          ) : (
            <>
              <p className="text-soft text-sm">No exercises for this mode today</p>
              <p className="text-muted text-xs mt-1">Change plan in the Programs tab</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {exercises.map(exercise => (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              sessionSets={logs}
              lastSet={getLastSetForExercise(exercise.name, session?.id)}
              onLogSet={(ex, setNum) => setActiveExercise({ exercise: ex, setNumber: setNum })}
              onEditSet={editSet}
            />
          ))}
        </div>
      )}
    </div>
  )
}
