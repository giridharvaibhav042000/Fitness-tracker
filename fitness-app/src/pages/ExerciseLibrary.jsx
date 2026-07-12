import { useState } from 'react'
import { getAllExercises } from '../data/workouts'

const ALL = getAllExercises()

export default function ExerciseLibrary() {
  const [search, setSearch] = useState('')

  const filtered = search.length > 1
    ? ALL.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.muscle.toLowerCase().includes(search.toLowerCase()))
    : ALL

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-white font-display text-xl font-bold">Exercise Library</h1>
      <p className="text-soft text-xs">{ALL.length} exercises</p>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or muscle..."
        className="w-full bg-card border border-line rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gym"
      />

      <div className="space-y-2">
        {filtered.map(ex => (
          <div key={ex.name}
            className="bg-card border border-line rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                {ex.compulsory && <span className="text-gold text-xs">★</span>}
                <p className="text-white text-sm">{ex.name}</p>
              </div>
              <p className="text-muted text-xs mt-0.5">{ex.muscle}</p>
              <p className="text-soft text-xs">{ex.sets} × {ex.reps}</p>
            </div>
            <a href={ex.youtube} target="_blank" rel="noreferrer"
              className="text-cali text-xs border border-cali/30 rounded px-2 py-1 shrink-0">
              ▶
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
