import { useState } from 'react'
import { getPRs } from '../hooks/useProgress'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'

const LS_MEASUREMENTS = 'bodyMeasurements'

export default function Progress() {
  const { user } = useAuth()
  const prs = getPRs()
  const [weight, setWeight] = useState('')
  const [measurements, setMeasurements] = useState(() =>
    JSON.parse(localStorage.getItem(LS_MEASUREMENTS) || '[]')
  )

  function logWeight() {
    if (!weight) return
    const entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      weight_kg: parseFloat(weight),
      notes: ''
    }
    const updated = [entry, ...measurements]
    localStorage.setItem(LS_MEASUREMENTS, JSON.stringify(updated))
    setMeasurements(updated)
    setWeight('')
    if (user) {
      supabase.from('body_measurements').insert({ ...entry, user_id: user.id })
    }
  }

  const prList = Object.entries(prs).sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-white font-display text-xl font-bold">Progress</h1>

      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <h2 className="text-soft text-xs uppercase tracking-wider">Log Body Weight</h2>
        <div className="flex gap-3">
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="kg"
            className="flex-1 bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
          />
          <button onClick={logWeight}
            className="bg-gym text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Log
          </button>
        </div>
        {measurements.slice(0, 5).map(m => (
          <div key={m.id} className="flex justify-between text-sm">
            <span className="text-muted">{m.date}</span>
            <span className="text-white font-mono">{m.weight_kg} kg</span>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-soft text-xs uppercase tracking-wider mb-3">
          Personal Records ({prList.length})
        </h2>
        {prList.length === 0 && (
          <p className="text-muted text-sm">No PRs yet. Start logging sets!</p>
        )}
        <div className="space-y-2">
          {prList.map(([name, pr]) => (
            <div key={name}
              className="flex items-center justify-between bg-card border border-line rounded-xl px-4 py-3">
              <p className="text-white text-sm">{name}</p>
              <p className="text-gold font-mono text-sm">{pr.weight}kg × {pr.reps}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
