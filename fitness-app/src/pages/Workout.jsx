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

export default function Workout() {
  const { day } = useParams()
  const dayKey = resolveDayKey(day)
  const exercises = WORKOUT_DATA[dayKey]?.gym ?? []
  const { logs, recordSet } = useWorkout(dayKey, 'gym')
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
        <p className="text-gym text-xs font-semibold uppercase tracking-wider">Morning Gym</p>
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
    </div>
  )
}
