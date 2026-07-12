const TIPS = [
  { icon: '⭐', title: 'Compulsory Exercises', body: 'Exercises marked ★ are MUST-DO. Never skip these foundational movements. Optional exercises can be skipped if tired or short on time.' },
  { icon: '📈', title: 'Progressive Overload', body: 'Try to increase weight or reps each week. Even 1kg or 1 extra rep is progress. The app detects new PRs automatically.' },
  { icon: '🥗', title: 'Nutrition Priority', body: 'Hit 125g protein EVERY DAY. Eat 1 hour before gym (banana + eggs). Post-workout meal within 45 minutes is most important.' },
  { icon: '⏱️', title: 'Rest Periods', body: 'Heavy compound lifts: 90s rest. Isolation exercises: 45-60s. Calisthenics: 30-60s. Use the built-in timer — do not cut rest short.' },
  { icon: '💤', title: 'Recovery', body: 'Get 7-8 hours of sleep. Sunday is complete rest. Week 4 Deload is crucial — reduce weight by 20% and let your body recover.' },
  { icon: '🏃', title: 'Cardio Guidelines', body: 'Incline walk: 5-6 km/h, 10-12% grade. Stationary bike: Level 5-8, 70-90 RPM. HIIT Sprints: 20s on, 40s off, 8-10 rounds.' },
]

export default function TrainingGuide() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-white font-display text-xl font-bold">Training Guide</h1>
      <p className="text-soft text-sm">6-Week Dual Training System — Norbert's Fitness Studio</p>

      <div className="space-y-3">
        {TIPS.map(tip => (
          <div key={tip.title} className="bg-card border border-line rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{tip.icon}</span>
              <h3 className="text-white font-semibold text-sm">{tip.title}</h3>
            </div>
            <p className="text-soft text-sm leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
