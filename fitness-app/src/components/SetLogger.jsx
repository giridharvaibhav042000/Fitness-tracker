import { useState } from 'react'
import RestTimer from './RestTimer'

export default function SetLogger({ exercise, setNumber, onComplete }) {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [resting, setResting] = useState(false)

  function handleComplete() {
    const w = parseFloat(weight) || 0
    const r = parseInt(reps) || 0
    if (r === 0) return
    onComplete({ exercise_name: exercise.name, set_number: setNumber, weight: w, reps: r })
    setResting(true)
  }

  if (resting) {
    return <RestTimer seconds={exercise.rest} onDone={() => setResting(false)} />
  }

  return (
    <div className="bg-card rounded-xl border border-line p-4 space-y-3">
      <p className="text-soft text-xs">Set {setNumber} — {exercise.name}</p>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-muted text-xs block mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="0"
            className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
          />
        </div>
        <div className="flex-1">
          <label className="text-muted text-xs block mb-1">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={e => setReps(e.target.value)}
            placeholder="0"
            className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
          />
        </div>
      </div>
      <button
        onClick={handleComplete}
        className="w-full bg-gym text-white rounded-lg py-2 text-sm font-semibold"
      >
        Complete Set
      </button>
    </div>
  )
}
