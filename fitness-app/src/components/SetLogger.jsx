import { useState } from 'react'
import RestTimer from './RestTimer'

export default function SetLogger({ exercise, setNumber, onComplete }) {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [unit, setUnit] = useState('kg')
  const [resting, setResting] = useState(false)

  function handleComplete() {
    const w = parseFloat(weight) || 0
    const r = parseInt(reps) || 0
    if (r === 0) return
    const weightKg = unit === 'lbs' ? parseFloat((w / 2.2046).toFixed(2)) : w
    onComplete({ exercise_name: exercise.name, set_number: setNumber, weight: weightKg, reps: r })
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
          <div className="flex items-center justify-between mb-1">
            <label className="text-muted text-xs">Weight</label>
            <button
              onClick={() => setUnit(u => u === 'kg' ? 'lbs' : 'kg')}
              className="text-xs font-semibold px-2 py-0.5 rounded border border-line text-gym bg-surface"
            >
              {unit}
            </button>
          </div>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="0"
            className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
          />
          {unit === 'lbs' && weight && (
            <p className="text-muted text-xs mt-1">
              = {((parseFloat(weight) || 0) / 2.2046).toFixed(1)} kg stored
            </p>
          )}
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
