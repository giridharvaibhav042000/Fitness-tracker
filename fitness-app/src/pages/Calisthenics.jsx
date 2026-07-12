import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { WORKOUT_DATA } from '../data/workouts'
import { useWorkout } from '../hooks/useWorkout'
import { useProgress } from '../hooks/useProgress'
import ExerciseCard from '../components/ExerciseCard'
import SetLogger from '../components/SetLogger'
import PRBadge from '../components/PRBadge'

function resolveDayKey(day) {
  if (day === 'today') {
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    return days[new Date().getDay()]
  }
  return day
}

export default function Calisthenics() {
  const { day } = useParams()
  const dayKey = resolveDayKey(day)
  const exercises = WORKOUT_DATA[dayKey]?.cali ?? []
  const cardio = WORKOUT_DATA[dayKey]?.cardio
  const { logs, recordSet } = useWorkout(dayKey, 'cali')
  const { newPR, checkAndSavePR } = useProgress()
  const [activeExercise, setActiveExercise] = useState(null)

  async function handleSetComplete({ exercise_name, set_number, weight, reps }) {
    const exercise = exercises.find(e => e.name === exercise_name)
    if (!exercise) return
    const log = await recordSet(exercise, set_number, weight, reps)
    if (log) await checkAndSavePR({ exercise_name, weight, reps })
    setActiveExercise(null)
  }

  return (
    <div className="p-4 space-y-4">
      <PRBadge show={!!newPR} exerciseName={newPR} />

      <div>
        <p className="text-cali text-xs font-semibold uppercase tracking-wider">Evening Calisthenics</p>
        <h1 className="text-white font-display text-xl font-bold capitalize">{dayKey}</h1>
      </div>

      {activeExercise && (
        <SetLogger
          exercise={activeExercise.exercise}
          setNumber={activeExercise.setNumber}
          onComplete={handleSetComplete}
        />
      )}

      <div className="space-y-3">
        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.name}
            exercise={exercise}
            sessionSets={logs}
            onLogSet={(ex, setNum) => setActiveExercise({ exercise: ex, setNumber: setNum })}
          />
        ))}
      </div>

      {cardio && (
        <div className="bg-cardio/10 border border-cardio/30 rounded-xl p-4">
          <p className="text-cardio text-xs font-semibold uppercase tracking-wider mb-1">Cardio</p>
          <p className="text-white font-semibold">{cardio.type}</p>
          <p className="text-soft text-xs mt-1">{cardio.duration} · {cardio.details}</p>
          <a href={cardio.youtube} target="_blank" rel="noreferrer"
            className="inline-block mt-2 text-cali text-xs border border-cali/30 rounded px-2 py-1">
            ▶ Watch
          </a>
        </div>
      )}
    </div>
  )
}
