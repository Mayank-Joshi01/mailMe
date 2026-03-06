import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'

// ✅ 1. Alias the imports to prevent naming collisions with your context functions
import { 
  login as apiLogin, 
  register as apiRegister, 
  verifyMagicLink as apiVerifyMagicLink 
} from '../api/auth'
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
  // ✅ 2. Expose authError to your components so they can use it
  authError: { message: string; status?: number } | null 
  login: (LoginInfo: LoginData) => Promise<boolean>
  logout: () => void
  register: (RegisterInfo: RegisterData) => Promise<boolean>
  verifyMagicLink: (MagicLinkData: MagicLinkData) => Promise<boolean>
}

// ── Storage Helpers ────────────────────────────────────

// Here we are storing the entire user object (including the token) under a single key in localStorage for simplicity.
// Later , we might dont store the basic user info in localStorage and just store the token, 
// and then decode the token to get the user info when needed. But for now this is simpler to implement and understand.

const STORAGE_KEY = 'User'

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
  authError: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  verifyMagicLink: async () => false,
})

// ── Provider ───────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser())
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState<{message: string, status?: number} | null>(null)
  
  const { showAlert } = useAlert()

  // ── Helper: persist & update user state ───────────────
  const persistUser = (user: User) => {
    setUser(user)
    saveUser(user)
  }

  // ── Login ─────────────────────────────────────────────
  const login = async (data: LoginData): Promise<boolean> => {
    setLoading(true)
    setAuthError(null) // Clear previous errors on new attempt
    
    try {
      // Assuming your apiLogin returns response.data directly
      const json = await apiLogin(data.email, data.password)

      const loggedInUser: User = {
        name: json.user.name,
        email: json.user.email,
        token: json.token ,
      }

      persistUser(loggedInUser)
      showAlert(`Welcome back, ${loggedInUser.name}!`, 'success')
      return true
    } catch (err: any) {
      const errorData = getErrorMessage(err)
      setAuthError(errorData) 
      
      // Combine custom status logic with your global alert
      if (errorData.status === 401) {
         console.error("Invalid credentials, please try again.")
      }
      
      showAlert(errorData.message || 'Login failed.', 'error')
      return false
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ────────────────────────────────────────────
  const logout = () => {
    setUser(null)
    clearUser()
    setAuthError(null)
    showAlert('You have been logged out.', 'info')
  }

  // ── Register ──────────────────────────────────────────
  const register = async (data: RegisterData): Promise<boolean> => {
    setLoading(true)
    setAuthError(null)

    try {
      await apiRegister(data.name, data.email, data.password)

      showAlert(
        'Registration successful! Please check your email to verify your account.',
        'success'
      )
      return true
    } catch (err: any) {
      const errorData = getErrorMessage(err)
      setAuthError(errorData)
      
      if (errorData.status === 409) {
         console.error("User already exists!")
      }

      showAlert(errorData.message || 'Registration failed.', 'error')
      return false
    } finally {
      setLoading(false)
    }
  }

  // ── Verify Magic Link ─────────────────────────────────
  const verifyMagicLink = async (data: MagicLinkData): Promise<boolean> => {
    setLoading(true)
    setAuthError(null)

    try {
      // Pass the destructured token and email depending on how your api function expects it
      const json = await apiVerifyMagicLink(data.token, data.email) 

      const verifiedUser: User = {
        name: json.user.name ?? '',
        email: json.user.email ?? data.email,
        token: json.token ,
      }

      persistUser(verifiedUser)
      showAlert('Email verified! You are now logged in.', 'success')
      return true
    } catch (err: any) {
      const errorData = getErrorMessage(err)
      setAuthError(errorData)
      
      if (errorData.status === 400 || errorData.status === 401) {
        console.error("Token is invalid or has expired.")
      }

      showAlert(errorData.message || 'Verification failed.', 'error')
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider 
      value={{ user, loading, authError, login, logout, register, verifyMagicLink }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)