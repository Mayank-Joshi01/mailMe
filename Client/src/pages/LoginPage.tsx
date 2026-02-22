import { useState } from 'react'
import { useAuth } from '../context/AppContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useNavigate } from 'react-router'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setTimeout(() => {
      const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      login({ name, email })
      setLoading(false)
      navigate('/')
    }, 800)
  }

  // Replace this with real Google OAuth when ready
  const handleGoogleLogin = () => {
    login({ name: 'Google User', email: 'googleuser@gmail.com' })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
            <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={loading} fullWidth>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* ── Divider (new) ── */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* ── Google Button (new) ── */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border
              border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
              text-sm font-medium text-gray-700 dark:text-gray-200
              hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
            Continue with Google
          </button>
          
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Register
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}