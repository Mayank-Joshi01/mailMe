import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'

import {
  login as apiLogin,
  register as apiRegister,
  verifyMagicLink as apiVerifyMagicLink,
  GetUserProfile as apiGetUserProfile,
  googleAuth as apiGoogleAuth
} from '../api/auth'

import { getErrorMessage } from '../Utils/errorHandler'

// ── Types ──────────────────────────────────────────────
export interface LoginData { email: string; password: string }
export interface RegisterData { name: string; email: string; password: string }
export interface User { name: string; email: string }
export interface MagicLinkData { token: string; email: string }

interface AuthContextType {
  user: User | null
  loading: boolean // Critical for protecting routes
  authError: { message: string; status?: number } | null
  login: (LoginInfo: LoginData) => Promise<boolean>
  logout: () => void
  register: (RegisterInfo: RegisterData) => Promise<boolean>
  verifyMagicLink: (MagicLinkData: MagicLinkData) => Promise<boolean>
  getUserProfile: () => Promise<void> 
  googleAuth: (token: string) => Promise<boolean>
}

// ── Storage Helpers ────────────────────────────────────
const STORAGE_KEY = 'token'
const saveToken = (token: string) => localStorage.setItem(STORAGE_KEY, token)
const clearToken = () => localStorage.removeItem(STORAGE_KEY)

// ── Context ────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true, // Start true to prevent premature redirects
  authError: null,
  login: async () => false,
  logout: () => { },
  register: async () => false,
  verifyMagicLink: async () => false,
  getUserProfile: async () => {},
  googleAuth: async () => false,
})

// ── Provider ───────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  
  // ✅ IMPORTANT: Start loading as TRUE so private routes wait for verification
  const [loading, setLoading] = useState(true) 
  const [authError, setAuthError] = useState<{ message: string, status?: number } | null>(null)

  const { showAlert } = useAlert()

  // ── Bootstrapping (Run once on mount) ────────────────
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) {
        setLoading(false); // No token, stop loading, user stays null
        return;
      }
      // If token exists, verify it with the database
      await getUserProfile();
    };

    initializeAuth();
  }, []); // Empty array = runs once when app starts

  // ── GetUserProfile (The Validator) ───────────────────
  const getUserProfile = async (): Promise<void> => {
    try {
      const profile = await apiGetUserProfile()
      setUser(profile.user)
      setAuthError(null)
    } catch (err: any) {
      console.error("Session invalid or expired. Logging out.");
      setUser(null);
      clearToken(); // Destroy the bad token
    } finally {
      setLoading(false); // App is ready to render
    }
  }

  // ── Login ─────────────────────────────────────────────
  const login = async (data: LoginData): Promise<boolean> => {
    setLoading(true)
    setAuthError(null)
    try {
      const json = await apiLogin(data.email, data.password)
      setUser({ name: json.user.name, email: json.user.email })
      saveToken(json.token)
      showAlert(`Welcome back, ${json.user.name}!`, 'success')
      return true
    } catch (err: any) {
      const errorData = getErrorMessage(err)
      setAuthError(errorData)
      showAlert(errorData.message || 'Login failed.', 'error')
      return false
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ────────────────────────────────────────────
  const logout = () => {
    setUser(null)
    clearToken()
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
      }

      setUser(verifiedUser)
      saveToken(json.token)
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

  // ── googleLogin ─────────────────────────────────
 const googleAuth = async (token: string): Promise<boolean> => {
    setLoading(true)
    setAuthError(null)
    try {      const json = await apiGoogleAuth(token)
      setUser({ name: json.user.name, email: json.user.email })
      saveToken(json.token)
      showAlert(`Welcome back, ${json.user.name}!`, 'success')
      return true
    }
    catch (err: any) {
      const errorData = getErrorMessage(err)
      setAuthError(errorData)
      showAlert(errorData.message || 'Google login failed.', 'error')
      return false
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, authError, login, logout, register, verifyMagicLink, getUserProfile , googleAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)