import { useEffect, useState } from 'react'

export default function PRBadge({ show, exerciseName }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) return
    setVisible(true)
    const id = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(id)
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gold text-bg text-xs font-bold px-4 py-2 rounded-full animate-bounce">
      🏆 NEW PR — {exerciseName}!
    </div>
  )
}
