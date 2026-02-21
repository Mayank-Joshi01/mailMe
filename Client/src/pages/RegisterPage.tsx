import { useState } from 'react'
import { useAuth } from '../context/AppContext'
import InputField from '../components/InputField'
import Button from '../components/Button'

interface RegisterPageProps {
  onNavigate: (page: 'home' | 'login' | 'register') => void
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Name is required.'
    if (!email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email.'
    if (!password) e.password = 'Password is required.'
    else if (password.length < 8) e.password = 'At least 8 characters.'
    if (password !== confirm) e.confirm = 'Passwords do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      register({ name, email })
      setLoading(false)
      onNavigate('home')
    }, 800)
  }

  // Replace with real Google OAuth when ready
  const handleGoogleRegister = async () => {

  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Register</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Create your account</p>
            </div>
        
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField label="Full Name" placeholder="John Doe" value={name} onChange={setName} error={errors.name} />
            <InputField label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} error={errors.email} />
            <InputField label="Password" type="password" placeholder="Min. 8 characters" value={password} onChange={setPassword} error={errors.password} />
            <InputField label="Confirm Password" type="password" placeholder="Repeat your password" value={confirm} onChange={setConfirm} error={errors.confirm} />
            <Button type="submit" disabled={loading} fullWidth>
              {loading ? 'Creating account...' : 'Create Account'}
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
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border
              border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
              text-sm font-medium text-gray-700 dark:text-gray-200
              hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
            Continue with Google
          </button>

          

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}