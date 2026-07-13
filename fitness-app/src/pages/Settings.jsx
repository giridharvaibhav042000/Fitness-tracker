import { useState } from 'react'
import { buildExportData, triggerDownload } from '../services/exportService'

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

function daysAgoKey(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

export default function Settings() {
  const [from, setFrom]   = useState(daysAgoKey(30))
  const [to, setTo]       = useState(todayKey())
  const [include, setInclude] = useState({
    workoutSessions: true,
    exerciseLogs:    true,
    nutritionLogs:   true,
    personalRecords: true,
  })
  const [exported, setExported] = useState(false)

  const noneSelected = !Object.values(include).some(Boolean)

  function toggle(key) {
    setInclude(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleExport() {
    const data = buildExportData({ from, to, include })
    triggerDownload(data, from, to)
    setExported(true)
    setTimeout(() => setExported(false), 2500)
  }

  const CATEGORIES = [
    { key: 'workoutSessions', label: 'Workout Sessions' },
    { key: 'exerciseLogs',    label: 'Exercise Logs'    },
    { key: 'nutritionLogs',   label: 'Nutrition Logs'   },
    { key: 'personalRecords', label: 'Personal Records' },
  ]

  return (
    <div className="p-4 space-y-6 pb-24">
      <h1 className="text-white text-xl font-bold">Settings</h1>

      <div className="bg-card border border-line rounded-xl p-4 space-y-4">
        <h2 className="text-soft text-xs font-semibold uppercase tracking-wider">Export Data</h2>

        {/* Date range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-soft text-xs mb-1 block">From</label>
            <input
              type="date"
              value={from}
              max={to}
              onChange={e => setFrom(e.target.value)}
              className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
            />
          </div>
          <div>
            <label className="text-soft text-xs mb-1 block">To</label>
            <input
              type="date"
              value={to}
              min={from}
              max={todayKey()}
              onChange={e => setTo(e.target.value)}
              className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
            />
          </div>
        </div>

        {/* Category checkboxes */}
        <div className="space-y-2">
          <p className="text-soft text-xs">Include</p>
          {CATEGORIES.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={include[key]}
                onChange={() => toggle(key)}
                className="w-4 h-4 accent-gym"
              />
              <span className="text-white text-sm">{label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleExport}
          disabled={noneSelected}
          className="w-full py-3 rounded-lg bg-gym text-black font-semibold text-sm disabled:opacity-40"
        >
          {exported ? 'Downloaded!' : 'Export JSON'}
        </button>
      </div>
    </div>
  )
}
