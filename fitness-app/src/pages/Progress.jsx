import { useState } from 'react'
import { getPRs } from '../hooks/useProgress'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'

const LS_MEASUREMENTS = 'bodyMeasurements'
const LS_PROFILE      = 'userProfile'
const LS_BODY_CIRC    = 'bodyCircumferences'

const BODY_FIELDS = [
  { key: 'chest',       label: 'Chest' },
  { key: 'waist',       label: 'Waist' },
  { key: 'hips',        label: 'Hips' },
  { key: 'neck',        label: 'Neck' },
  { key: 'shoulders',   label: 'Shoulders' },
  { key: 'left_arm',    label: 'Left Arm' },
  { key: 'right_arm',   label: 'Right Arm' },
  { key: 'left_thigh',  label: 'Left Thigh' },
  { key: 'right_thigh', label: 'Right Thigh' },
  { key: 'calves',      label: 'Calves' },
]

// ─── Activity levels ──────────────────────────────────────────────────────────

const ACTIVITY = [
  { label: 'Sedentary', value: 1.2,   desc: 'Desk job, no gym' },
  { label: 'Light',     value: 1.375, desc: '1–3 days/wk' },
  { label: 'Moderate',  value: 1.55,  desc: '3–5 days/wk' },
  { label: 'Active',    value: 1.725, desc: '6–7 days/wk' },
  { label: 'Extra',     value: 1.9,   desc: 'Physical job + gym' },
]

// ─── Formulas ─────────────────────────────────────────────────────────────────

function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm || heightCm < 50) return null
  const h = heightCm / 100
  return +(weightKg / (h * h)).toFixed(1)
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-warn',   barColor: '#f97316', pos: Math.max(2, ((bmi - 15) / 25) * 100) }
  if (bmi < 25)   return { label: 'Normal',      color: 'text-gym',    barColor: '#22c55e', pos: ((bmi - 15) / 25) * 100 }
  if (bmi < 30)   return { label: 'Overweight',  color: 'text-gold',   barColor: '#eab308', pos: ((bmi - 15) / 25) * 100 }
  return                 { label: 'Obese',        color: 'text-cardio', barColor: '#ef4444', pos: Math.min(98, ((bmi - 15) / 25) * 100) }
}

function calcBMR(weightKg, heightCm, age, sex) {
  // Mifflin-St Jeor
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return Math.round(sex === 'female' ? base - 161 : base + 5)
}

// ─── Weight chart (SVG) ──────────────────────────────────────────────────────

function WeightChart({ measurements }) {
  const data = [...measurements]
    .filter(d => d.weight_kg > 0)
    .sort((a, b) => (a.date + (a.time || '00:00')).localeCompare(b.date + (b.time || '00:00')))
    .slice(-30)

  if (data.length < 2) {
    return <p className="text-muted text-xs text-center py-6">Log at least 2 entries to see chart</p>
  }

  const W = 320, H = 110, PX = 32, PY = 12
  const weights  = data.map(d => d.weight_kg)
  const minW     = Math.min(...weights)
  const maxW     = Math.max(...weights)
  const range    = maxW - minW || 1
  const latest   = data[data.length - 1]
  const earliest = data[0]
  const trend    = +(latest.weight_kg - earliest.weight_kg).toFixed(1)

  const cx = i => PX + (i / (data.length - 1)) * (W - PX * 2)
  const cy = w => PY + (1 - (w - minW) / range) * (H - PY * 2)

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${cx(i).toFixed(1)} ${cy(d.weight_kg).toFixed(1)}`).join(' ')
  const fillPath = `${linePath} L ${cx(data.length - 1).toFixed(1)} ${H - PY} L ${cx(0).toFixed(1)} ${H - PY} Z`

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-muted text-xs">{data.length} entries · last 30</p>
        <p className={`text-xs font-mono font-bold ${trend < -0.1 ? 'text-gym' : trend > 0.1 ? 'text-warn' : 'text-muted'}`}>
          {trend >= 0 ? '+' : ''}{trend} kg
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 110 }}>
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i} x1={PX} y1={(PY + t * (H - PY * 2)).toFixed(1)}
            x2={W - PX} y2={(PY + t * (H - PY * 2)).toFixed(1)} stroke="#1f1f1f" strokeWidth="1" />
        ))}
        {[minW, (minW + maxW) / 2, maxW].map((w, i) => (
          <text key={i} x={PX - 4} y={cy(w).toFixed(1)} textAnchor="end"
            fill="#555" fontSize="8" dominantBaseline="middle">{w.toFixed(1)}</text>
        ))}
        <path d={fillPath} fill="#22c55e" fillOpacity="0.07" />
        <path d={linePath} stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const isEnd = i === 0 || i === data.length - 1
          const isExtreme = d.weight_kg === minW || d.weight_kg === maxW
          if (!isEnd && !isExtreme) return null
          return <circle key={i} cx={cx(i).toFixed(1)} cy={cy(d.weight_kg).toFixed(1)}
            r={i === data.length - 1 ? 3.5 : 2.5} fill="#22c55e" />
        })}
        <text x={cx(data.length - 1).toFixed(1)} y={(cy(latest.weight_kg) - 7).toFixed(1)}
          textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">
          {latest.weight_kg} kg
        </text>
      </svg>
      <div className="flex justify-between mt-1">
        <span className="text-muted text-xs">{earliest.date}</span>
        <span className="text-muted text-xs">{latest.date}</span>
      </div>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function epley(weight, reps) {
  if (!weight || !reps || reps <= 0) return null
  const raw = weight * (1 + reps / 30)
  return Math.round(raw * 2) / 2  // round to nearest 0.5kg
}

const ONE_RM_ZONES = [
  { pct: 0.95, label: 'Strength',    reps: '1–3' },
  { pct: 0.85, label: 'Power',       reps: '~5'  },
  { pct: 0.75, label: 'Hypertrophy', reps: '8–10' },
  { pct: 0.65, label: 'Endurance',   reps: '12–15' },
]

function today()   { return new Date().toISOString().split('T')[0] }
function nowTime() { return new Date().toTimeString().slice(0, 5) }

function SectionHeader({ title }) {
  return <h2 className="text-soft text-xs font-semibold uppercase tracking-wider">{title}</h2>
}

// ─── Progress page ────────────────────────────────────────────────────────────

export default function Progress() {
  const { user } = useAuth()
  const prs = getPRs()

  // ── Weight log ──
  const [measurements, setMeasurements] = useState(() =>
    JSON.parse(localStorage.getItem(LS_MEASUREMENTS) || '[]')
  )
  const [weight,  setWeight]  = useState('')
  const [logDate, setLogDate] = useState(today)
  const [logTime, setLogTime] = useState(nowTime)
  const [editingId,  setEditingId]  = useState(null)
  const [editDate,   setEditDate]   = useState('')
  const [editTime,   setEditTime]   = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [showAll, setShowAll] = useState(false)

  // ── Profile (for BMI + TDEE) ──
  const [profile, setProfile] = useState(() =>
    JSON.parse(localStorage.getItem(LS_PROFILE) || 'null') || {
      height: '', age: '', sex: 'male', activity: 1.55
    }
  )
  const [profileOpen, setProfileOpen] = useState(false)

  // ── Body circumferences ──
  const [circEntries, setCircEntries] = useState(() =>
    JSON.parse(localStorage.getItem(LS_BODY_CIRC) || '[]')
  )
  const [circFormOpen, setCircFormOpen] = useState(false)
  const [circDate, setCircDate] = useState(today)
  const [circTime, setCircTime] = useState(nowTime)
  const [circFields, setCircFields] = useState({})
  const [expandedCircId, setExpandedCircId] = useState(null)
  const [circShowAll, setCircShowAll] = useState(false)

  function saveProfile(updated) {
    setProfile(updated)
    localStorage.setItem(LS_PROFILE, JSON.stringify(updated))
  }

  function persistCirc(updated) {
    localStorage.setItem(LS_BODY_CIRC, JSON.stringify(updated))
    setCircEntries(updated)
  }

  function logCircumferences() {
    const values = {}
    for (const [k, v] of Object.entries(circFields)) {
      const n = parseFloat(v)
      if (v !== '' && !isNaN(n)) values[k] = n
    }
    if (Object.keys(values).length === 0) return
    const entry = { id: crypto.randomUUID(), date: circDate, time: circTime, ...values }
    persistCirc([entry, ...circEntries])
    setCircFields({})
    setCircFormOpen(false)
    setCircDate(today())
    setCircTime(nowTime())
  }

  function deleteCircEntry(id) {
    persistCirc(circEntries.filter(e => e.id !== id))
    if (expandedCircId === id) setExpandedCircId(null)
  }

  // ── Derived: use latest logged weight ──
  const sortedMeasurements = [...measurements].sort((a, b) =>
    (b.date + (b.time || '00:00')).localeCompare(a.date + (a.time || '00:00'))
  )
  const latestWeight = sortedMeasurements[0]?.weight_kg || null

  // ── BMI ──
  const bmiWeight = latestWeight || (weight ? parseFloat(weight) : null)
  const bmi    = calcBMI(bmiWeight, parseFloat(profile.height) || null)
  const bmiCat = bmi ? bmiCategory(bmi) : null

  // ── TDEE ──
  const heightNum   = parseFloat(profile.height)
  const ageNum      = parseFloat(profile.age)
  const hasProfile  = bmiWeight && heightNum > 0 && ageNum > 0
  const bmr         = hasProfile ? calcBMR(bmiWeight, heightNum, ageNum, profile.sex) : null
  const maintenance = bmr ? Math.round(bmr * profile.activity) : null

  const CALORIE_GOALS = maintenance ? [
    { label: 'Aggressive Cut',  kcal: maintenance - 750, color: 'text-cardio', note: '−750 kcal/day' },
    { label: 'Cut',             kcal: maintenance - 500, color: 'text-warn',   note: '−500 kcal/day' },
    { label: 'Maintain',        kcal: maintenance,       color: 'text-soft',   note: 'TDEE',         active: true },
    { label: 'Lean Bulk',       kcal: maintenance + 300, color: 'text-cali',   note: '+300 kcal/day' },
    { label: 'Bulk',            kcal: maintenance + 500, color: 'text-gym',    note: '+500 kcal/day' },
  ] : []

  // ── Weight log mutations ──
  function persist(updated) {
    localStorage.setItem(LS_MEASUREMENTS, JSON.stringify(updated))
    setMeasurements(updated)
  }

  function logWeight() {
    if (!weight || isNaN(parseFloat(weight))) return
    const entry = {
      id: crypto.randomUUID(),
      date: logDate,
      time: logTime,
      weight_kg: +parseFloat(weight).toFixed(2),
      notes: '',
    }
    persist([entry, ...measurements])
    setWeight('')
    setLogDate(today())
    setLogTime(nowTime())
    if (user) supabase.from('body_measurements').insert({ ...entry, user_id: user.id })
  }

  function startEdit(m) {
    setEditingId(m.id)
    setEditDate(m.date)
    setEditTime(m.time || '')
    setEditWeight(String(m.weight_kg))
  }

  function saveEdit(id) {
    const w = parseFloat(editWeight)
    if (!editDate || isNaN(w)) return
    const updated = measurements.map(m =>
      m.id === id ? { ...m, date: editDate, time: editTime, weight_kg: w } : m
    )
    persist(updated)
    setEditingId(null)
    if (user) supabase.from('body_measurements').update({ date: editDate, time: editTime, weight_kg: w }).eq('id', id)
  }

  function deleteEntry(id) {
    persist(measurements.filter(m => m.id !== id))
    if (editingId === id) setEditingId(null)
    if (user) supabase.from('body_measurements').delete().eq('id', id)
  }

  // ── 1RM Calculator ──
  const [oneRmWeight, setOneRmWeight] = useState('')
  const [oneRmReps,   setOneRmReps]   = useState('')

  const PAGE      = 7
  const displayed = showAll ? sortedMeasurements : sortedMeasurements.slice(0, PAGE)
  const prList    = Object.entries(prs).sort((a, b) => a[0].localeCompare(b[0]))

  const sortedCirc = [...circEntries].sort((a, b) =>
    (b.date + (b.time || '00:00')).localeCompare(a.date + (a.time || '00:00'))
  )
  const latestCirc = sortedCirc[0] || null
  const oldestCirc = sortedCirc[sortedCirc.length - 1] || null

  return (
    <div className="p-4 space-y-5">
      <h1 className="text-white font-display text-xl font-bold">Progress</h1>

      {/* ── Weight trend chart ── */}
      {measurements.length >= 2 && (
        <div className="bg-card border border-line rounded-xl p-4">
          <SectionHeader title="Weight Trend" />
          <div className="mt-3">
            <WeightChart measurements={measurements} />
          </div>
        </div>
      )}

      {/* ── Log weight ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <SectionHeader title="Log Body Weight" />

        <div className="flex gap-2">
          <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)}
            className="flex-1 bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym" />
          <input type="time" value={logTime} onChange={e => setLogTime(e.target.value)}
            className="bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym w-28" />
        </div>

        <div className="flex gap-3">
          <input type="number" value={weight} step="0.1"
            onChange={e => setWeight(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && logWeight()}
            placeholder="Weight (kg)"
            className="flex-1 bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym" />
          <button onClick={logWeight} className="bg-gym text-black px-4 py-2 rounded-lg text-sm font-bold">Log</button>
        </div>

        {measurements.length === 0 ? (
          <p className="text-muted text-xs text-center py-2">No entries yet.</p>
        ) : (
          <div className="space-y-0 pt-1 border-t border-line">
            {displayed.map(m => (
              <div key={m.id}>
                {editingId === m.id ? (
                  <div className="bg-surface border border-gym/30 rounded-xl p-3 space-y-2 my-1">
                    <div className="flex gap-2">
                      <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)}
                        className="flex-1 bg-card border border-line rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-gym" />
                      <input type="time" value={editTime} onChange={e => setEditTime(e.target.value)}
                        className="bg-card border border-line rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-gym w-24" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="number" value={editWeight} step="0.1" onChange={e => setEditWeight(e.target.value)}
                        className="flex-1 bg-card border border-line rounded-lg px-2 py-1.5 text-white text-sm font-mono focus:outline-none focus:border-gym"
                        placeholder="kg" />
                      <span className="text-muted text-xs">kg</span>
                      <button onClick={() => saveEdit(m.id)} className="bg-gym text-black px-3 py-1.5 rounded-lg text-xs font-bold">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-line text-muted px-3 py-1.5 rounded-lg text-xs">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between py-2 border-b border-line/30 last:border-b-0">
                    <div>
                      <span className="text-white text-sm font-mono">{m.weight_kg} kg</span>
                      <div className="flex gap-1.5 mt-0.5">
                        <span className="text-muted text-xs">{m.date}</span>
                        {m.time && <span className="text-muted text-xs opacity-50">· {m.time}</span>}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => startEdit(m)} className="text-muted hover:text-soft text-sm">✎</button>
                      <button onClick={() => deleteEntry(m.id)} className="text-muted hover:text-cardio text-sm">✕</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {sortedMeasurements.length > PAGE && (
              <button onClick={() => setShowAll(s => !s)} className="text-gym text-xs w-full text-center pt-2">
                {showAll ? 'Show less ↑' : `Show all ${sortedMeasurements.length} entries ↓`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Body Measurements ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <SectionHeader title="Body Measurements (cm)" />
          <button onClick={() => setCircFormOpen(o => !o)} className="text-gym text-xs font-semibold">
            {circFormOpen ? 'Cancel' : '+ Log'}
          </button>
        </div>

        {circFormOpen && (
          <div className="space-y-3 border-t border-line pt-3">
            <div className="flex gap-2">
              <input type="date" value={circDate} onChange={e => setCircDate(e.target.value)}
                className="flex-1 bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym" />
              <input type="time" value={circTime} onChange={e => setCircTime(e.target.value)}
                className="bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym w-28" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BODY_FIELDS.map(f => (
                <div key={f.key}>
                  <p className="text-muted text-xs mb-1">{f.label}</p>
                  <input type="number" step="0.1" placeholder="cm"
                    value={circFields[f.key] || ''}
                    onChange={e => setCircFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym" />
                </div>
              ))}
            </div>
            <button onClick={logCircumferences} className="w-full bg-gym text-black py-2.5 rounded-lg text-sm font-bold">
              Save Measurements
            </button>
          </div>
        )}

        {latestCirc && (
          <div className="border-t border-line pt-3">
            <p className="text-muted text-xs mb-2">
              Latest · {latestCirc.date}{latestCirc.time ? ` · ${latestCirc.time}` : ''}
            </p>
            <div className="grid grid-cols-2 gap-y-1.5">
              {BODY_FIELDS.filter(f => latestCirc[f.key] != null).map(f => {
                const delta = oldestCirc && oldestCirc.id !== latestCirc.id && oldestCirc[f.key] != null
                  ? +(latestCirc[f.key] - oldestCirc[f.key]).toFixed(1)
                  : null
                return (
                  <div key={f.key} className="flex items-center justify-between pr-4">
                    <span className="text-muted text-xs">{f.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-xs font-mono">{latestCirc[f.key]} cm</span>
                      {delta !== null && delta !== 0 && (
                        <span className={`text-[10px] font-mono ${delta < 0 ? 'text-gym' : 'text-warn'}`}>
                          {delta > 0 ? '+' : ''}{delta}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {circEntries.length > 0 && (
          <div className="border-t border-line pt-2 space-y-0.5">
            {(circShowAll ? sortedCirc : sortedCirc.slice(0, 5)).map(entry => {
              const fieldCount = BODY_FIELDS.filter(f => entry[f.key] != null).length
              const isExpanded = expandedCircId === entry.id
              return (
                <div key={entry.id}>
                  <div className="flex items-center justify-between py-2">
                    <button
                      onClick={() => setExpandedCircId(isExpanded ? null : entry.id)}
                      className="flex-1 flex items-center gap-2 text-left">
                      <span className="text-white text-xs font-mono">{entry.date}</span>
                      {entry.time && <span className="text-muted text-xs opacity-60">{entry.time}</span>}
                      <span className="text-muted text-xs">· {fieldCount} fields</span>
                      <span className="text-muted text-xs ml-auto">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    <button onClick={() => deleteCircEntry(entry.id)} className="text-muted hover:text-cardio text-sm ml-3">✕</button>
                  </div>
                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-y-1.5 bg-surface/50 rounded-xl p-3 mb-1">
                      {BODY_FIELDS.filter(f => entry[f.key] != null).map(f => (
                        <div key={f.key} className="flex items-center justify-between pr-4">
                          <span className="text-muted text-xs">{f.label}</span>
                          <span className="text-white text-xs font-mono">{entry[f.key]} cm</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            {sortedCirc.length > 5 && (
              <button onClick={() => setCircShowAll(s => !s)} className="text-gym text-xs w-full text-center pt-1">
                {circShowAll ? 'Show less ↑' : `Show all ${sortedCirc.length} entries ↓`}
              </button>
            )}
          </div>
        )}

        {circEntries.length === 0 && !circFormOpen && (
          <p className="text-muted text-xs text-center py-2">Tap "+ Log" to record measurements.</p>
        )}
      </div>

      {/* ── BMI + Profile ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <SectionHeader title="BMI Calculator" />
          <button onClick={() => setProfileOpen(o => !o)}
            className="text-gym text-xs font-semibold">
            {profileOpen ? 'Hide' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile inputs */}
        {profileOpen && (
          <div className="space-y-3 pb-1">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-muted text-xs mb-1">Height (cm)</p>
                <input type="number" placeholder="175"
                  value={profile.height}
                  onChange={e => saveProfile({ ...profile, height: e.target.value })}
                  className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym" />
              </div>
              <div>
                <p className="text-muted text-xs mb-1">Age</p>
                <input type="number" placeholder="25"
                  value={profile.age}
                  onChange={e => saveProfile({ ...profile, age: e.target.value })}
                  className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym" />
              </div>
            </div>
            <div>
              <p className="text-muted text-xs mb-1">Sex</p>
              <div className="flex gap-2">
                {['male', 'female'].map(s => (
                  <button key={s} onClick={() => saveProfile({ ...profile, sex: s })}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border capitalize transition-colors ${
                      profile.sex === s ? 'bg-gym text-black border-gym' : 'bg-surface border-line text-muted'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BMI result */}
        {bmi && bmiCat ? (
          <>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-3xl font-bold font-mono ${bmiCat.color}`}>{bmi}</p>
                <p className={`text-sm font-semibold ${bmiCat.color}`}>{bmiCat.label}</p>
                {bmiWeight && <p className="text-muted text-xs mt-0.5">{bmiWeight} kg · {profile.height} cm</p>}
              </div>
              <div className="text-right text-xs text-muted space-y-0.5">
                <p>{'< 18.5'} · Underweight</p>
                <p>18.5–24.9 · Normal</p>
                <p>25–29.9 · Overweight</p>
                <p>{'≥ 30'} · Obese</p>
              </div>
            </div>

            {/* BMI scale bar */}
            <div className="relative h-3 rounded-full overflow-hidden" style={{
              background: 'linear-gradient(to right, #f97316 0%, #f97316 18%, #22c55e 18%, #22c55e 52%, #eab308 52%, #eab308 72%, #ef4444 72%, #ef4444 100%)'
            }}>
              <div className="absolute top-0 h-full w-0.5 bg-white shadow-lg transition-all"
                style={{ left: `${bmiCat.pos}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted -mt-1">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </>
        ) : (
          <div className="text-center py-3">
            <p className="text-muted text-xs">
              {!profile.height || !profile.age
                ? 'Tap "Edit Profile" to enter height and age'
                : 'Log a weight entry to calculate BMI'}
            </p>
          </div>
        )}
      </div>

      {/* ── Calorie calculator ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <SectionHeader title="Calorie Calculator (TDEE)" />

        {/* Activity selector */}
        <div>
          <p className="text-muted text-xs mb-2">Activity Level</p>
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {ACTIVITY.map(a => (
              <button key={a.value}
                onClick={() => saveProfile({ ...profile, activity: a.value })}
                className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  profile.activity === a.value
                    ? 'bg-gym text-black border-gym'
                    : 'bg-surface border-line text-muted'
                }`}>
                <span className="block">{a.label}</span>
                <span className="block opacity-60 font-normal text-[10px]">{a.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {hasProfile && bmr && maintenance ? (
          <>
            {/* BMR line */}
            <div className="flex justify-between items-center text-xs border-t border-line pt-2">
              <span className="text-muted">BMR (base metabolic rate)</span>
              <span className="text-soft font-mono">{bmr.toLocaleString()} kcal</span>
            </div>

            {/* Calorie targets */}
            <div className="space-y-2">
              {CALORIE_GOALS.map(g => (
                <div key={g.label}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${
                    g.active ? 'bg-gym/10 border-gym/30' : 'bg-surface border-line'
                  }`}>
                  <div>
                    <p className={`text-sm font-semibold ${g.color}`}>{g.label}</p>
                    <p className="text-muted text-xs">{g.note}</p>
                  </div>
                  <p className={`text-lg font-bold font-mono ${g.color}`}>
                    {g.kcal.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-muted text-xs text-center">
              Based on Mifflin-St Jeor · {profile.sex} · age {profile.age} · {profile.height} cm
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted text-xs">
              {!hasProfile
                ? 'Enter height, age, and sex in BMI section above'
                : 'Log a weight entry to calculate calories'}
            </p>
          </div>
        )}
      </div>

      {/* ── Personal Records + auto 1RM ── */}
      <div>
        <h2 className="text-soft text-xs font-semibold uppercase tracking-wider mb-3">
          Personal Records ({prList.length})
        </h2>
        {prList.length === 0 && (
          <p className="text-muted text-sm">No PRs yet. Start logging sets!</p>
        )}
        <div className="space-y-2">
          {prList.map(([name, pr]) => {
            const est1rm = epley(pr.weight, pr.reps)
            return (
              <div key={name}
                className="flex items-center justify-between bg-card border border-line rounded-xl px-4 py-3">
                <div>
                  <p className="text-white text-sm">{name}</p>
                  {est1rm && <p className="text-muted text-xs">~1RM: {est1rm} kg</p>}
                </div>
                <p className="text-gold font-mono text-sm">{pr.weight}kg × {pr.reps}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 1RM Calculator ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <SectionHeader title="1RM Calculator" />
        <p className="text-muted text-xs">Epley formula — enter any working set</p>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-muted text-xs block mb-1">Weight (kg)</label>
            <input
              type="number"
              value={oneRmWeight}
              onChange={e => setOneRmWeight(e.target.value)}
              placeholder="e.g. 80"
              className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
            />
          </div>
          <div className="flex-1">
            <label className="text-muted text-xs block mb-1">Reps</label>
            <input
              type="number"
              value={oneRmReps}
              onChange={e => setOneRmReps(e.target.value)}
              placeholder="e.g. 5"
              className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gym"
            />
          </div>
        </div>
        {(() => {
          const w = parseFloat(oneRmWeight)
          const r = parseInt(oneRmReps)
          const est = epley(w, r)
          if (!est) return null
          return (
            <div className="space-y-2">
              <div className="bg-surface border border-gym/30 rounded-xl px-4 py-3 text-center">
                <p className="text-gym text-3xl font-bold font-mono">{est} kg</p>
                <p className="text-muted text-xs mt-0.5">Estimated 1RM</p>
              </div>
              <div className="space-y-1.5">
                {ONE_RM_ZONES.map(z => (
                  <div key={z.label} className="flex items-center justify-between bg-surface rounded-lg px-3 py-2">
                    <div>
                      <span className="text-soft text-xs font-semibold">{z.label}</span>
                      <span className="text-muted text-xs ml-2">{z.reps} reps</span>
                    </div>
                    <span className="text-white font-mono text-sm">
                      {(Math.round(est * z.pct * 2) / 2).toFixed(1)} kg
                      <span className="text-muted text-xs ml-1">({Math.round(z.pct * 100)}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>

      {/* ── Suggested additions ── */}
      <div className="bg-card border border-line rounded-xl p-4 space-y-3">
        <SectionHeader title="Coming Soon" />
        <div className="space-y-2">
          {[
            { icon: '📸', title: 'Progress Photos', desc: 'Weekly side-by-side photo comparison log' },
            { icon: '🔥', title: 'Workout Streak',   desc: 'Consecutive days trained, weekly volume, monthly heatmap' },
            { icon: '💧', title: 'Water Intake',     desc: 'Daily hydration tracking (ml) with target reminders' },
            { icon: '😴', title: 'Sleep Tracker',    desc: 'Hours slept + quality score — linked to recovery split' },
          ].map(s => (
            <div key={s.title} className="flex gap-3 items-start">
              <span className="text-lg flex-shrink-0 mt-0.5">{s.icon}</span>
              <div>
                <p className="text-soft text-xs font-semibold">{s.title}</p>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
