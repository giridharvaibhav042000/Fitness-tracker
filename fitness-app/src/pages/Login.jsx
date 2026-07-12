import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError(err.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Fitness Tracker</h1>
        <p className="text-soft text-sm mb-8">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-soft text-xs mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-card border border-line rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gym"
            />
          </div>
          <div>
            <label className="block text-soft text-xs mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-card border border-line rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gym"
            />
          </div>

          {error && <p className="text-warn text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gym text-white font-semibold py-3 rounded-lg text-sm disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
