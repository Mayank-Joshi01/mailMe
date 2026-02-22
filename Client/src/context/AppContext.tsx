import { createContext, useContext, useState,} from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'

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
}
export interface MagicLinkData {
  token: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (LoginInfo: LoginData) => Promise<boolean>
  logout: () => void
  register: (RegisterInfo: RegisterData) => Promise<boolean>
  verifyMagicLink: (MagicLinkData: MagicLinkData) => Promise<boolean>
}
// ── Contexts ───────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  verifyMagicLink: async () => false
})

// ── Provider ───────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ABC')
    // return saved ? JSON.parse({"token"}) : null
    return null
  })

  const [loading, setLoading] = useState(false)
  const BackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
  const {showAlert} = useAlert();


  // ── Login ────────────────────────────────────────────
  const login = async (data: LoginData): Promise<boolean> => {
    try {
      setLoading(true)
      const res = await fetch(`${BackendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        showAlert(json.message || 'Login failed.','error')
        return false
      }

      setUser(json.user)

      localStorage.setItem('ABC', JSON.stringify(json.user.token))

      showAlert(`Welcome back, ${json.user.name}!`,'success')

      return true

    } catch (err) {
      showAlert('Network error. Please try again.','error')
      return false
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ───────────────────────────────────────────
  const logout = () => {
    setUser(null)
    localStorage.removeItem('ABC')
    showAlert('You have been logged out.','info')
  }


  // ── Register ─────────────────────────────────────────
  const register = async (data: RegisterData): Promise<boolean> => {
    setLoading(true)
    try {
      const res = await fetch(`${BackendUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        showAlert(json.message || 'Registration failed.','error')
        return false
      }

      showAlert('Registration successful! Please check your email to verify your account.','success')

      return true

    } catch (err) {
      showAlert('Network error. Please try again.','error')
      return false
    } finally {
      setLoading(false)
    }
  }

   // ── Verify Magic Link ─────────────────────────────────────────

   const verifyMagicLink = async (data: MagicLinkData): Promise<boolean> => {
          try {
        // NOW we call the backend API
        const response = await fetch(`${BackendUrl}/auth/verify-signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const responseJson = await response.json();

        if (response.ok) {
          showAlert("Email verified! ", "success");
          localStorage.setItem('ABC', JSON.stringify(responseJson.token))
          return true
        } else {
          showAlert(responseJson.message, "error");
            return false
        }
      } catch (err) {
        showAlert("Connection error", "error");
        return false
      }
   }

  return (
   
      <AuthContext.Provider value={{ user, login, logout, register, verifyMagicLink}}>
        {children}
      </AuthContext.Provider>
  )
}

// ── Hooks ──────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)
