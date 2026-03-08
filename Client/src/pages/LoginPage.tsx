import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAlert } from '../context/AlertConext'
import InputField from '../Components/InputField'
import Button from '../Components/Button'
import { useNavigate } from 'react-router'
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const { login,googleAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showAlert } = useAlert()

  /// Validation function for form fields
  const validate = () => {
    const e: Record<string, string> = {}
    if (!email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email.'
    if (!password) e.password = 'Password is required.'
    else if (password.length < 8) e.password = 'At least 8 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /// Handles the login process
  const loginUser = async (email: string, password: string) => {
    try {
      const success = await login({ email, password })
      if (success) {
        navigate('/')
      }
    } catch (err: any) {
      showAlert(err.response?.data?.message || 'Login failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  /// Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    loginUser(email, password)
  }

  // Replace with real Google OAuth when ready
  const handleGoogleLogin = async (GoogleCredentials : string) => {
    setLoading(true)
    try {
      const success = await googleAuth(GoogleCredentials)
      if (success) {
        navigate('/')
      }
    } catch (err: any) {
      showAlert(err.response?.data?.message || 'Google login failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} error={errors.email} />
            <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} error={errors.password} />

            <div className="flex justify-end -mt-2">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" disabled={loading} fullWidth>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* ── Google Button ── */}
      <GoogleLogin
        onSuccess={(credentialResponse : any) => {
          handleGoogleLogin(credentialResponse.credential)
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />

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