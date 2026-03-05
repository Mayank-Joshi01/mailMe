import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'
import { login , register ,verifyMagicLink } from '../api/auth'
import { getErrorMessage } from '../Utils/errorHandler'

// ── Types ──────────────────────────────────────────────
export interface LoginData {
  email: string
  password: string
}
export interface RegisterData {
  name: string
  email: string
  password: string
}
export interface User {
  name: string
  email: string
  token: string
}
export interface MagicLinkData {
  token: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (LoginInfo: LoginData) => Promise<boolean>
  logout: () => void
  register: (RegisterInfo: RegisterData) => Promise<boolean>
  verifyMagicLink: (MagicLinkData: MagicLinkData) => Promise<boolean>
}

// ── Storage Helpers ────────────────────────────────────
const STORAGE_KEY = 'auth_user'

const saveUser = (user: User) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))

const clearUser = () =>
  localStorage.removeItem(STORAGE_KEY)

const loadUser = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

// ── Context ────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  verifyMagicLink: async () => false,

})

// ── Provider ───────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  // Restore full user (including token) from localStorage on mount
  const [user, setUser] = useState<User | null>(() => loadUser())
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState<{message: string, status?: number} | null>(null); 
  const BackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'
  const { showAlert } = useAlert()

  // ── Helper: persist & update user state ───────────────
  const persistUser = (user: User) => {
    setUser(user)
    saveUser(user)
  }

  // ── Login ─────────────────────────────────────────────
  // const login = async (data: LoginData): Promise<boolean> => {
  //   setLoading(true)
  //   try {
  //     const res = await fetch(`${BackendUrl}/auth/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     })

  //     const json = await res.json()

  //     if (!res.ok) {
  //       showAlert(json.message || 'Login failed.', 'error')
  //       return false
  //     }

  //     // Expect backend to return { user: { name, email }, token: string }
  //     // Merge token into the user object for a single source of truth
  //     const loggedInUser: User = {
  //       name: json.user.name,
  //       email: json.user.email,
  //       token: json.token ?? json.user.token,
  //     }

  //     persistUser(loggedInUser)
  //     showAlert(`Welcome back, ${loggedInUser.name}!`, 'success')
  //     return true
  //   } catch {
  //     showAlert('Network error. Please try again.', 'error')
  //     return false
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // ── Logout ────────────────────────────────────────────
  const logout = () => {
    setUser(null)
    clearUser()
    showAlert('You have been logged out.', 'info')
  }

  // ── Register ──────────────────────────────────────────
  // const register = async (data: RegisterData): Promise<boolean> => {
  //   setLoading(true)
  //   try {
  //     const res = await fetch(`${BackendUrl}/auth/register`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     })

  //     const json = await res.json()

  //     if (!res.ok) {
  //       showAlert(json.message || 'Registration failed.', 'error')
  //       return false
  //     }

  //     showAlert(
  //       'Registration successful! Please check your email to verify your account.',
  //       'success'
  //     )
  //     return true
  //   } catch {
  //     showAlert('Network error. Please try again.', 'error')
  //     return false
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // ── Verify Magic Link ─────────────────────────────────
  // const verifyMagicLink = async (data: MagicLinkData): Promise<boolean> => {
  //   setLoading(true)
  //   try {
  //     const res = await fetch(`${BackendUrl}/auth/verify-signup`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     })

  //     const json = await res.json()

  //     if (!res.ok) {
  //       showAlert(json.message || 'Verification failed.', 'error')
  //       return false
  //     }

  //     // Expect backend to return { user: { name, email }, token: string }
  //     const verifiedUser: User = {
  //       name: json.user?.name ?? '',
  //       email: json.user?.email ?? data.email,
  //       token: json.token ?? json.user?.token,
  //     }

  //     persistUser(verifiedUser)
  //     showAlert('Email verified! You are now logged in.', 'success')
  //     return true
  //   } catch (err: any) {
  //     showAlert('Connection error. Please try again.', 'error')
  //     return false
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, verifyMagicLink }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)