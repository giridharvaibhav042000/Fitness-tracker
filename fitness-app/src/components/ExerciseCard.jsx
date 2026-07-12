export default function ExerciseCard({ exercise, onLogSet, sessionSets = [] }) {
  const completedSets = sessionSets.filter(s => s.exercise_name === exercise.name)

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
              onClick={() => !done && onLogSet(exercise, i + 1)}
              className={`w-8 h-8 rounded text-xs font-mono transition-colors ${
                done ? 'bg-gym text-white' : 'bg-surface border border-line text-muted'
              }`}
            >
              {done ? '✓' : i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
