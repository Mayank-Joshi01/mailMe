import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// ── Types ──────────────────────────────────────────────
export interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  register: (user: User) => void
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
   
      <AuthContext.Provider value={{ user, login, logout, register }}>
        {children}
      </AuthContext.Provider>
  )
}

// ── Hooks ──────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)
