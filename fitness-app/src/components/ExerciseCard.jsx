import { useState } from 'react'

export default function ExerciseCard({ exercise, onLogSet, onEditSet, sessionSets = [] }) {
  const completedSets = sessionSets.filter(s => s.exercise_name === exercise.name)
  const [editingIdx, setEditingIdx] = useState(null)
  const [editWeight, setEditWeight] = useState('')
  const [editReps, setEditReps] = useState('')

  function openEdit(i) {
    const done = completedSets[i]
    setEditWeight(String(done.weight))
    setEditReps(String(done.reps))
    setEditingIdx(i)
  }

  function saveEdit() {
    const done = completedSets[editingIdx]
    const w = parseFloat(editWeight) || 0
    const r = parseInt(editReps) || 0
    if (r > 0 && onEditSet) onEditSet(done.id, w, r)
    setEditingIdx(null)
  }

  return (
    <div className={`bg-card rounded-xl border p-4 ${exercise.compulsory ? 'border-gym/40' : 'border-line'}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-2">
            {exercise.compulsory && <span className="text-gold text-xs">★</span>}
            <h3 className="text-white text-sm font-semibold">{exercise.name}</h3>
          </div>
          <p className="text-soft text-xs mt-0.5">{exercise.muscle}</p>
        </div>
        <a
          href={exercise.youtube}
          target="_blank"
          rel="noreferrer"
          className="text-cali text-xs border border-cali/30 rounded px-2 py-1 shrink-0"
        >
          ▶ Watch
        </a>
      </div>

      <p className="text-muted text-xs mb-3">
        {exercise.sets} sets × {exercise.reps} reps · Rest {exercise.rest}s
      </p>

      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: exercise.sets }).map((_, i) => {
          const done = completedSets[i]
          return (
            <button
              key={i}
              onClick={() => done ? openEdit(i) : onLogSet(exercise, i + 1)}
              className={`w-8 h-8 rounded text-xs font-mono transition-colors ${
                done ? 'bg-gym text-white' : 'bg-surface border border-line text-muted'
              }`}
            >
              {done ? '✓' : i + 1}
            </button>
          )
        })}
      </div>

      {editingIdx !== null && completedSets[editingIdx] && (
        <div className="mt-3 bg-surface border border-gym/30 rounded-xl p-3 space-y-2">
          <p className="text-gym text-xs font-semibold">Edit Set {completedSets[editingIdx].set_number}</p>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-muted text-xs block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={editWeight}
                onChange={e => setEditWeight(e.target.value)}
                className="w-full bg-card border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
              />
            </div>
            <div className="flex-1">
              <label className="text-muted text-xs block mb-1">Reps</label>
              <input
                type="number"
                value={editReps}
                onChange={e => setEditReps(e.target.value)}
                className="w-full bg-card border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="flex-1 bg-gym text-black rounded-lg py-2 text-xs font-semibold"
            >
              Save
            </button>
            <button
              onClick={() => setEditingIdx(null)}
              className="flex-1 bg-surface border border-line text-muted rounded-lg py-2 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
