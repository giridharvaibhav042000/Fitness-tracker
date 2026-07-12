import { WEEK_CONFIG, getCurrentWeek, PROGRAM_START_DATE } from '../data/weekPlan'

const SCHEDULE = [
  { day: 'monday', gym: 'Lower Body Heavy', cali: 'Core + Leg Endurance', cardio: 'Incline Walk 10-15min' },
  { day: 'tuesday', gym: 'Chest + Triceps', cali: 'Push Skills', cardio: 'Bike 12-15min' },
  { day: 'wednesday', gym: 'Back + Biceps', cali: 'Pull + Core', cardio: 'Incline Walk 10-12min' },
  { day: 'thursday', gym: 'Shoulders + Traps', cali: 'Shoulder + Core', cardio: 'Bike 12-15min' },
  { day: 'friday', gym: 'Arms Hypertrophy', cali: 'Full Body Flow', cardio: 'Incline Walk 10-12min' },
  { day: 'saturday', gym: 'Full Body Power', cali: 'Skill + Strength', cardio: 'HIIT Sprints 10-12min' },
  { day: 'sunday', gym: 'REST', cali: 'REST', cardio: 'Light walk 30-45min' },
]

export default function WeekPlan() {
  const currentWeek = getCurrentWeek()
  const weekConfig = WEEK_CONFIG[currentWeek - 1]

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-white font-display text-xl font-bold">Week Plan</h1>
      <p className="text-soft text-xs">Program start: {PROGRAM_START_DATE}</p>

      <div className="grid grid-cols-3 gap-2">
        {WEEK_CONFIG.map(w => (
          <div key={w.week}
            className={`rounded-xl p-3 border text-center ${
              w.week === currentWeek ? 'bg-gym/20 border-gym' : 'bg-card border-line'
            }`}>
            <p className="text-white text-xs font-bold">W{w.week}</p>
            <p className="text-soft text-xs">{w.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-line rounded-xl p-4">
        <p className="text-gym text-xs font-semibold uppercase tracking-wider">
          Week {currentWeek} — {weekConfig.label}
        </p>
        <p className="text-white text-sm mt-1">{weekConfig.sets} sets × {weekConfig.reps} reps</p>
        <p className="text-soft text-xs mt-1">{weekConfig.note}</p>
      </div>

      <div className="space-y-2">
        {SCHEDULE.map(s => (
          <div key={s.day} className="bg-card border border-line rounded-xl p-3">
            <p className="text-white text-sm font-semibold capitalize">{s.day}</p>
            <p className="text-gym text-xs">Gym: {s.gym}</p>
            <p className="text-cali text-xs">Cali: {s.cali}</p>
            <p className="text-cardio text-xs">Cardio: {s.cardio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
