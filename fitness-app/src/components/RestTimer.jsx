import { useState, useEffect, useCallback } from 'react'

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function RestTimer({ seconds, onDone }) {
  const [remaining, setRemaining] = useState(seconds)

  const done = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate([200, 100, 200])
    onDone()
  }, [onDone])

  useEffect(() => {
    if (remaining <= 0) { done(); return }
    const id = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(id); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [remaining, done])

  const pct = ((seconds - remaining) / seconds) * 100

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-line">
      <p className="text-soft text-xs uppercase tracking-widest">Rest</p>
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#1C2333" strokeWidth="6" />
          <circle cx="40" cy="40" r="36" fill="none" stroke="#F97316" strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (pct / 100)}`}
            strokeLinecap="round" />
        </svg>
        <span className="font-mono text-xl text-white">{formatTime(remaining)}</span>
      </div>
      <button onClick={done} className="text-muted text-xs hover:text-soft transition-colors">Skip</button>
    </div>
  )
}
