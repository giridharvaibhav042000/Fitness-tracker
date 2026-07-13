export function buildExportData({ from, to, include }) {
  const result = {
    exportedAt: new Date().toISOString(),
    dateRange: { from, to },
  }

  if (include.workoutSessions) {
    const all = JSON.parse(localStorage.getItem('workoutSessions') || '[]')
    result.workoutSessions = all.filter(s => s.date >= from && s.date <= to)
  }

  if (include.exerciseLogs) {
    const all = JSON.parse(localStorage.getItem('exerciseLogs') || '[]')
    result.exerciseLogs = all.filter(l => {
      const d = l.completed_at?.split('T')[0] ?? ''
      return d >= from && d <= to
    })
  }

  if (include.nutritionLogs) {
    const all = JSON.parse(localStorage.getItem('nutritionLogs') || '[]')
    result.nutritionLogs = all.filter(l => l.date >= from && l.date <= to)
  }

  if (include.personalRecords) {
    const prs = JSON.parse(localStorage.getItem('personalRecords') || '{}')
    result.personalRecords = Object.fromEntries(
      Object.entries(prs).filter(([, pr]) => {
        const d = pr.achieved_at?.split('T')[0] ?? ''
        return d >= from && d <= to
      })
    )
  }

  return result
}

export function triggerDownload(data, from, to) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fitness-export-${from}-to-${to}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
