import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Nav from './components/Nav'
import Login from './pages/Login'
import Home from './pages/Home'
import Workout from './pages/Workout'
import Calisthenics from './pages/Calisthenics'
import Nutrition from './pages/Nutrition'
import Progress from './pages/Progress'
import ExerciseLibrary from './pages/ExerciseLibrary'
import DietPlan from './pages/DietPlan'
import TrainingGuide from './pages/TrainingGuide'
import WeekPlan from './pages/WeekPlan'
import Programs from './pages/Programs'
import Settings from './pages/Settings'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-bg">
      <div className="text-soft text-sm font-mono">Loading...</div>
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppShell() {
  return (
    <div className="pb-20 min-h-screen bg-bg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout/:day" element={<Workout />} />
        <Route path="/calisthenics/:day" element={<Calisthenics />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/training-guide" element={<TrainingGuide />} />
        <Route path="/week-plan" element={<WeekPlan />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Nav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
