const COLORS = { protein: '#22D3EE', carbs: '#F97316', fats: '#FBBF24' }

export default function MacroBar({ label, current, target, type }) {
  const pct = Math.min((current / target) * 100, 100)
  const color = COLORS[type] || '#94A3B8'

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-soft">{label}</span>
        <span className="text-white font-mono">{Math.round(current)}<span className="text-muted">/{target}g</span></span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
