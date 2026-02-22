import { createContext, useContext, useState,} from 'react'
import type { ReactNode } from 'react'

// ── Types ──────────────────────────────────────────────
export interface LoginData {
  name: string
  email: string
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

interface AuthContextType {
  user: User | null
  login: (LoginInfo: LoginData) => void
  logout: () => void
  register: (RegisterInfo: RegisterData) => void
}
// ── Contexts ───────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
})

// ── Provider ───────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (u: User) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = (u: User) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
  }

  return (
   
      <AuthContext.Provider value={{ user, login, logout, register}}>
        {children}
      </AuthContext.Provider>
  )
}

// ── Hooks ──────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)
