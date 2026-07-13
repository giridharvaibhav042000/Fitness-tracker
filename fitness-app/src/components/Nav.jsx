import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/', label: 'Home', icon: '⊕' },
  { to: '/workout/today', label: 'Workout', icon: '🏋' },
  { to: '/nutrition', label: 'Nutrition', icon: '🥗' },
  { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/exercises', label: 'Library', icon: '▶' },
  { to: '/programs', label: 'Programs', icon: '◈' },
]

export default function Nav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-surface border-t border-line z-50 flex justify-around items-center"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))', paddingTop: '8px' }}
    >
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-1 py-1 text-xs ${isActive ? 'text-gym' : 'text-muted'}`
          }
        >
          <span className="text-base leading-none">{tab.icon}</span>
          <span style={{ fontSize: '10px' }}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
