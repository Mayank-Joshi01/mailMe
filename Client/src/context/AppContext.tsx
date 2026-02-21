import { createContext, useContext, useRef, useState,useCallback } from 'react'
import type { ReactNode } from 'react'

// ── Types ──────────────────────────────────────────────
export interface User {
  name: string
  email: string
}


  // 1. Define types for our Alert
type AlertType = 'success' | 'error' | 'info';

interface AlertState {
  show: boolean;
  message: string;
  type: AlertType;
}


interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  register: (user: User) => void
  showAlert: (msg: string, type?: AlertType) => void;
  alert: AlertState;
}
// ── Contexts ───────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  showAlert: () => {},
  alert: { show: false, message: '', type: 'info' },
})

// ── Provider ───────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [alert, setAlert] = useState<AlertState>({ show: false, message: '', type: 'info' });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const showAlert = useCallback((message: string, type: AlertType = 'info') => {
    // 3. THE FIX: If a timer is already running from a previous alert, KILL IT.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 4. Update state to show the new alert
    setAlert({ show: true, message, type });

    // 5. Start a fresh timer and store its ID in the ref
    timeoutRef.current = setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
      timeoutRef.current = null;
    }, 3000); // 3 seconds
  }, []);


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
   
      <AuthContext.Provider value={{ user, login, logout, register, showAlert , alert}}>
        {children}
      </AuthContext.Provider>
  )
}

// ── Hooks ──────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)
