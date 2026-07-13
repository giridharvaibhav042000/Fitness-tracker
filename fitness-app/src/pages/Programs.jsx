import { useState } from 'react'
import { WORKOUT_MODES, MODE_LABELS, MODE_GOALS, HIIT_EXERCISES, WARMUP_EXERCISES } from '../data/programs'
import { GOALS, GOAL_META, WEEK_CYCLES } from '../data/variations'
import { WORKOUT_DATA, getAllExercises } from '../data/workouts'
import { SPLITS, SPLIT_META, SPLIT_DATA } from '../data/splits'
import { useWorkoutMode } from '../hooks/useWorkoutMode'
import { useWorkoutPlan } from '../hooks/useWorkoutPlan'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MODE_TABS = [
  { mode: WORKOUT_MODES.GYM_CALI, label: 'Gym + Cali' },
  { mode: WORKOUT_MODES.GYM_ONLY, label: 'Gym Only' },
  { mode: WORKOUT_MODES.CALI_ONLY, label: 'Cali Only' },
  { mode: WORKOUT_MODES.HIIT, label: 'HIIT' },
  { mode: WORKOUT_MODES.WARMUP, label: 'Warmup' },
]

const MODE_DESC = {
  'gym+cali': 'Full program — heavy compounds + bodyweight skills. Best for overall athleticism.',
  'gym': 'Pure gym strength. Barbell, dumbbell, and machine only. Focused progressive overload.',
  'cali': 'Bodyweight only. Relative strength, skill, coordination. Great for travel.',
  'hiit': 'High-intensity intervals. Cardio + strength circuits for maximum calorie burn.',
  'warmup': 'Mobility, activation, movement prep. Use before any session or on rest days.',
}

function getExercisesForMode(mode) {
  switch (mode) {
    case WORKOUT_MODES.HIIT:    return HIIT_EXERCISES
    case WORKOUT_MODES.WARMUP:  return WARMUP_EXERCISES
    case WORKOUT_MODES.GYM_ONLY: {
      const seen = new Set(); const result = []
      for (const day of Object.values(WORKOUT_DATA))
        for (const ex of (day.gym || []))
          if (!seen.has(ex.name)) { seen.add(ex.name); result.push(ex) }
      return result.sort((a, b) => a.name.localeCompare(b.name))
    }
    case WORKOUT_MODES.CALI_ONLY: {
      const seen = new Set(); const result = []
      for (const day of Object.values(WORKOUT_DATA))
        for (const ex of (day.cali || []))
          if (!seen.has(ex.name)) { seen.add(ex.name); result.push(ex) }
      return result.sort((a, b) => a.name.localeCompare(b.name))
    }
    default: return getAllExercises()
  }
}

function getExercisesForDay(mode, day, split) {
  if (mode === WORKOUT_MODES.HIIT)   return HIIT_EXERCISES
  if (mode === WORKOUT_MODES.WARMUP) return WARMUP_EXERCISES

  const isFullBody = !split || split === SPLITS.FULL_BODY

  if (day === 'all') {
    if (isFullBody) return getExercisesForMode(mode)
    const seen = new Set(); const result = []
    for (const d of ['monday','tuesday','wednesday','thursday','friday','saturday']) {
      const dd = SPLIT_DATA[split]?.[d] || {}
      const pool = mode === WORKOUT_MODES.GYM_ONLY  ? (dd.gym  || [])
                 : mode === WORKOUT_MODES.CALI_ONLY ? (dd.cali || [])
                 : [...(dd.gym || []), ...(dd.cali || [])]
      for (const ex of pool) if (!seen.has(ex.name)) { seen.add(ex.name); result.push(ex) }
    }
    return result.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (day === 'sunday') return []

  const dayData = isFullBody ? (WORKOUT_DATA[day] || {}) : (SPLIT_DATA[split]?.[day] || {})
  switch (mode) {
    case WORKOUT_MODES.GYM_ONLY:  return dayData.gym  || []
    case WORKOUT_MODES.CALI_ONLY: return dayData.cali || []
    default: return [...(dayData.gym || []), ...(dayData.cali || [])]
  }
}

function filterByMuscle(exercises, muscleKey) {
  if (muscleKey === 'all') return exercises
  const f = MUSCLE_FILTERS.find(m => m.key === muscleKey)
  if (!f?.match) return exercises
  return exercises.filter(ex => f.match.some(kw => ex.muscle.toLowerCase().includes(kw)))
}

function calcStats(exercises) {
  const total      = exercises.length
  const totalSets  = exercises.reduce((s, ex) => s + (ex.sets || 0), 0)
  const compulsory = exercises.filter(ex => ex.compulsory).length
  const seconds    = exercises.reduce((s, ex) => s + ex.sets * (45 + (ex.rest || 0)), 0)
  const minutes    = Math.ceil(seconds / 60)
  return { total, totalSets, compulsory, optional: total - compulsory, minutes }
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="pt-2">
      <p className="text-white text-sm font-bold uppercase tracking-wider">{title}</p>
      {subtitle && <p className="text-muted text-xs mt-0.5">{subtitle}</p>}
    </div>
  )
}

function Divider() { return <div className="border-t border-line" /> }

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_TABS = [
  { key: 'all',       label: 'All' },
  { key: 'monday',    label: 'Mon' },
  { key: 'tuesday',   label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday',  label: 'Thu' },
  { key: 'friday',    label: 'Fri' },
  { key: 'saturday',  label: 'Sat' },
  { key: 'sunday',    label: 'Sun' },
]

const MUSCLE_FILTERS = [
  { key: 'all',       label: 'All Body Parts', match: null },
  { key: 'chest',     label: 'Chest',          match: ['chest'] },
  { key: 'back',      label: 'Back',           match: ['back', 'lat', 'rhomboid', 'erector', 'posterior chain'] },
  { key: 'legs',      label: 'Legs',           match: ['quad', 'glute', 'hamstring', 'leg', 'lower body', 'calf', 'calves'] },
  { key: 'shoulders', label: 'Shoulders',      match: ['shoulder', 'delt', 'trap', 'rotator'] },
  { key: 'arms',      label: 'Arms',           match: ['bicep', 'tricep', 'arm', 'brachialis'] },
  { key: 'core',      label: 'Core / Abs',     match: ['core', 'abs', 'abdominal', 'oblique', 'lower abs', 'crunch', 'hip flexor'] },
  { key: 'forearms',  label: 'Forearms',       match: ['forearm', 'wrist', 'grip', 'pinch', 'roller'] },
  { key: 'glutes',    label: 'Glutes',         match: ['glute', 'hip'] },
]

const SPLIT_ORDER = [SPLITS.FULL_BODY, SPLITS.PPL, SPLITS.UPPER_LOWER, SPLITS.BRO_SPLIT, SPLITS.ARNOLD, SPLITS.RECOVERY, SPLITS.CARDIO, SPLITS.YOGA, SPLITS.REST_DAY]

const WEEK_DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

// ─── Programs Page ────────────────────────────────────────────────────────────

export default function Programs() {
  const { mode: activeMode, applyMode } = useWorkoutMode()
  const {
    goal: activeGoal,
    weekCycle: activeWeekCycle,
    weekIndex: activeWeekIndex,
    modifier: activeModifier,
    setGoal,
    setWeekCycle,
    resetCycle,
  } = useWorkoutPlan()

  const activeSplit = localStorage.getItem('workoutSplit') || SPLITS.FULL_BODY

  const [selSplit,  setSelSplit]  = useState(activeSplit)
  const [selMode,   setSelMode]   = useState(activeMode)
  const [selGoal,   setSelGoal]   = useState(activeGoal)
  const [selCycle,  setSelCycle]  = useState(activeWeekCycle)
  const [selDay,    setSelDay]    = useState('all')
  const [selMuscle, setSelMuscle] = useState('all')
  const [applied,   setApplied]   = useState(false)

  const selWeeks     = WEEK_CYCLES[selGoal]?.[selCycle] || []
  const dayExercises = getExercisesForDay(selMode, selDay, selSplit)
  const exercises    = filterByMuscle(dayExercises, selMuscle)
  const stats        = calcStats(exercises)

  const isDirty =
    selSplit  !== activeSplit         ||
    selMode   !== activeMode          ||
    selGoal   !== activeGoal          ||
    selCycle  !== activeWeekCycle

  function handleApply() {
    localStorage.setItem('workoutSplit', selSplit)
    applyMode(selMode)
    setGoal(selGoal)
    setWeekCycle(selCycle)
    resetCycle()
    setApplied(true)
    setTimeout(() => setApplied(false), 2500)
  }

  const splitMeta = SPLIT_META[selSplit]

  return (
    <div className="p-4 space-y-4">

      {/* ── Header ── */}
      <div>
        <h1 className="font-display text-xl font-bold text-white">Training Programs</h1>
        <p className="text-soft text-xs mt-0.5">
          <span className={SPLIT_META[activeSplit]?.color || 'text-gym'}>{SPLIT_META[activeSplit]?.label}</span>
          {' · '}<span className={GOAL_META[activeGoal].color}>{GOAL_META[activeGoal].fullLabel}</span>
          {' · '}<span className="text-soft">Wk {activeWeekIndex + 1}/{activeWeekCycle} — {activeModifier?.label}</span>
        </p>
      </div>

      <Divider />

      {/* ── Section 1: Workout Split ── */}
      <SectionHeader title="Workout Split" subtitle="Muscle groups trained each day" />

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {SPLIT_ORDER.map(key => {
          const meta = SPLIT_META[key]
          const isActive = selSplit === key
          return (
            <button
              key={key}
              onClick={() => setSelSplit(key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isActive ? meta.activeBg : 'bg-card text-muted border-line'
              }`}
            >
              {meta.icon} {meta.label}
            </button>
          )
        })}
      </div>

      {/* Split detail card */}
      <div className={`rounded-xl p-3 border ${splitMeta.cardBg}`}>
        <div className="flex items-center justify-between mb-2">
          <p className={`text-xs font-bold ${splitMeta.color}`}>{splitMeta.icon} {splitMeta.label}</p>
          <p className="text-muted text-xs">{splitMeta.frequency}</p>
        </div>
        <p className="text-soft text-xs leading-relaxed">{splitMeta.description}</p>
        <div className="mt-3 space-y-1">
          {WEEK_DAYS.map(d => {
            const label = splitMeta.dayLabels[d]
            const isRest = d === 'sunday'
            return (
              <div key={d} className="flex items-baseline gap-2">
                <span className="text-muted text-xs w-6 flex-shrink-0 capitalize font-mono">{d.slice(0,3)}</span>
                <span className={`text-xs ${isRest ? 'text-muted italic' : 'text-soft'}`}>{label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <Divider />

      {/* ── Section 2: Exercise Mode ── */}
      <SectionHeader title="Exercise Mode" subtitle="What type of exercises to show in your workout" />

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {MODE_TABS.map(tab => (
          <button
            key={tab.mode}
            onClick={() => setSelMode(tab.mode)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              selMode === tab.mode ? 'bg-gym text-black border-gym' : 'bg-card text-muted border-line'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-line rounded-xl p-3">
        <p className="text-white text-xs font-semibold">{MODE_LABELS[selMode]}</p>
        <p className="text-muted text-xs mt-1 leading-relaxed">{MODE_DESC[selMode]}</p>
      </div>

      <Divider />

      {/* ── Section 3: Training Goal ── */}
      <SectionHeader title="Training Goal" subtitle="Changes sets, reps, and rest across your whole plan" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Object.values(GOALS).map(g => {
          const meta = GOAL_META[g]
          const isSelected = selGoal === g
          return (
            <button
              key={g}
              onClick={() => setSelGoal(g)}
              className={`rounded-xl p-3 border text-left transition-colors ${
                isSelected ? meta.activeBg : 'bg-card border-line'
              }`}
            >
              <p className="text-lg leading-none">{meta.icon}</p>
              <p className={`text-xs font-bold mt-1.5 ${isSelected ? '' : meta.color}`}>{meta.label}</p>
              <p className={`text-xs mt-0.5 ${isSelected ? 'opacity-70' : 'text-muted'}`}>{meta.repFocus}</p>
            </button>
          )
        })}
      </div>

      <div className={`rounded-xl p-3 border ${GOAL_META[selGoal].cardBg}`}>
        <p className={`text-xs font-bold ${GOAL_META[selGoal].color}`}>{GOAL_META[selGoal].fullLabel}</p>
        <p className="text-soft text-xs mt-1 leading-relaxed">{GOAL_META[selGoal].description}</p>
        <p className="text-muted text-xs mt-1">{GOAL_META[selGoal].repFocus} · {GOAL_META[selGoal].restFocus}</p>
      </div>

      <Divider />

      {/* ── Section 4: Week Cycle ── */}
      <SectionHeader title="Week Cycle" subtitle="How many weeks before the program resets" />

      <div className="flex gap-2">
        {[3, 4].map(n => (
          <button
            key={n}
            onClick={() => setSelCycle(n)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
              selCycle === n ? 'bg-gym text-black border-gym' : 'bg-card text-muted border-line'
            }`}
          >
            {n}-Week Cycle
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {selWeeks.map((w, i) => {
          const isCurrent = selGoal === activeGoal && selCycle === activeWeekCycle && i === activeWeekIndex
          return (
            <div
              key={w.week}
              className={`rounded-xl p-3 border ${isCurrent ? GOAL_META[selGoal].cardBg : 'bg-card border-line'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-white text-xs font-bold">
                  Week {w.week} — {w.label}
                  {isCurrent && <span className={`ml-2 text-xs ${GOAL_META[selGoal].color}`}>← current</span>}
                </p>
                <p className="text-muted text-xs">{w.intensity}</p>
              </div>
              <p className="text-soft text-xs">{w.sets} sets × {w.reps} · {w.rest}s rest</p>
              <p className="text-muted text-xs mt-0.5 italic">{w.note}</p>
              {w.compulsoryOnly && (
                <p className="text-gold text-xs mt-1">⭐ Compulsory exercises only this week</p>
              )}
            </div>
          )
        })}
      </div>

      <Divider />

      {/* ── Apply button ── */}
      <button
        onClick={handleApply}
        disabled={!isDirty && !applied}
        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-colors ${
          applied
            ? 'bg-cardio/20 text-cardio border border-cardio/30'
            : isDirty
            ? 'bg-gym text-black'
            : 'bg-line text-muted cursor-default'
        }`}
      >
        {applied
          ? '✓ Plan Applied — Cycle Reset to Week 1'
          : isDirty
          ? 'Apply Plan & Reset Cycle'
          : 'No Changes'}
      </button>

      <Divider />

      {/* ── Section 5: Exercise Preview ── */}
      <SectionHeader
        title={`${splitMeta.label} — ${MODE_LABELS[selMode]}`}
        subtitle={selDay !== 'all' ? splitMeta.dayLabels[selDay] : 'Select a day to preview your session'}
      />

      {/* Day filter */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {DAY_TABS.map(d => (
          <button
            key={d.key}
            onClick={() => setSelDay(d.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              selDay === d.key
                ? d.key === 'sunday'
                  ? 'bg-muted text-white border-muted'
                  : `${splitMeta.activeBg}`
                : 'bg-card text-muted border-line'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Body part filter */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {MUSCLE_FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setSelMuscle(f.key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              selMuscle === f.key
                ? 'bg-cali text-black border-cali'
                : 'bg-card text-muted border-line'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Rest day message — Sunday always, or all days when split is rest_day */}
      {(selDay === 'sunday' || selSplit === SPLITS.REST_DAY) ? (
        <div className="bg-card border border-line rounded-xl p-6 text-center">
          <p className="text-2xl mb-2">😴</p>
          <p className="text-white font-semibold text-sm">
            {selSplit === SPLITS.REST_DAY ? 'Full Rest — No Training' : 'Sunday — Rest Day'}
          </p>
          <p className="text-muted text-xs mt-1">
            {selSplit === SPLITS.REST_DAY
              ? 'Light walk 20-30 min. Sleep, eat well, recover.'
              : 'No exercises scheduled. Light walk or stretching only.'}
          </p>
        </div>
      ) : (
        <>
          {/* Preview stats card */}
          <div className="bg-card border border-line rounded-xl p-4">
            <p className="text-soft text-xs font-semibold uppercase tracking-wider mb-3">
              Session Preview
              {selDay !== 'all' && (
                <span className={`${splitMeta.color} ml-2 normal-case capitalize`}>{selDay}</span>
              )}
              {selMuscle !== 'all' && (
                <span className="text-cali ml-2 normal-case">
                  · {MUSCLE_FILTERS.find(f => f.key === selMuscle)?.label}
                </span>
              )}
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-gym text-lg font-bold font-mono">{stats.total}</p>
                <p className="text-muted text-xs mt-0.5">Exercises</p>
              </div>
              <div>
                <p className="text-gold text-lg font-bold font-mono">{stats.totalSets}</p>
                <p className="text-muted text-xs mt-0.5">Total Sets</p>
              </div>
              <div>
                <p className="text-cali text-lg font-bold font-mono">{stats.compulsory}</p>
                <p className="text-muted text-xs mt-0.5">⭐ Must-Do</p>
              </div>
              <div>
                <p className="text-soft text-lg font-bold font-mono">~{stats.minutes}m</p>
                <p className="text-muted text-xs mt-0.5">Est. Time</p>
              </div>
            </div>
            {stats.optional > 0 && (
              <p className="text-muted text-xs text-center mt-2">
                + {stats.optional} optional exercise{stats.optional > 1 ? 's' : ''} if energy allows
              </p>
            )}
          </div>

          {/* Exercise list */}
          {exercises.length === 0 ? (
            <div className="bg-card border border-line rounded-xl p-4 text-center">
              <p className="text-soft text-sm">No exercises for this selection</p>
            </div>
          ) : (
            <div className="space-y-2">
              {exercises.map((ex, idx) => (
                <div key={ex.name} className="bg-card border border-line rounded-xl p-3 flex items-center gap-3">
                  <span className="text-muted text-xs font-mono w-5 flex-shrink-0">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">
                      {ex.compulsory && <span className="text-gold mr-1">⭐</span>}
                      {ex.name}
                    </p>
                    <p className="text-muted text-xs mt-0.5">{ex.muscle}</p>
                    <p className="text-soft text-xs mt-0.5">
                      {ex.sets} sets × {ex.reps}{ex.rest > 0 ? ` · ${ex.rest}s rest` : ''}
                    </p>
                  </div>
                  {ex.youtube ? (
                    <a href={ex.youtube} target="_blank" rel="noreferrer" className="text-warn text-xl flex-shrink-0">▶</a>
                  ) : (
                    <span className="w-5 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
