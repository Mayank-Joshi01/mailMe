// import { createContext, useContext, useState } from 'react'
// import type { ReactNode } from 'react'
// import { useAlert } from './AlertConext'

// // ✅ 1. Alias the imports to prevent naming collisions with your context functions
// import {
//   login as apiLogin,
//   register as apiRegister,
//   verifyMagicLink as apiVerifyMagicLink,
//   GetUserProfile as apiGetUserProfile
// } from '../api/auth'

// import { getErrorMessage } from '../Utils/errorHandler'

// // ── Types ──────────────────────────────────────────────
// export interface LoginData {
//   email: string
//   password: string
// }
// export interface RegisterData {
//   name: string
//   email: string
//   password: string
// }
// export interface User {
//   name: string
//   email: string
// }
// export interface MagicLinkData {
//   token: string
//   email: string
// }

// interface AuthContextType {
//   user: User | null
//   loading: boolean
//   // ✅ 2. Expose authError to your components so they can use it
//   authError: { message: string; status?: number } | null
//   login: (LoginInfo: LoginData) => Promise<boolean>
//   logout: () => void
//   register: (RegisterInfo: RegisterData) => Promise<boolean>
//   verifyMagicLink: (MagicLinkData: MagicLinkData) => Promise<boolean>
// }

// // ── Storage Helpers ────────────────────────────────────

// // Here we are storing the entire user object (including the token) under a single key in localStorage for simplicity.
// // Later , we might dont store the basic user info in localStorage and just store the token, 
// // and then decode the token to get the user info when needed. But for now this is simpler to implement and understand.

// const STORAGE_KEY = 'token'

// const saveToken = (token: string) =>
//   localStorage.setItem(STORAGE_KEY, token)

// const clearToken = () =>
//   localStorage.removeItem(STORAGE_KEY)

// const loadUser = async (): Promise<User | null> => {
//   try {
//     const token = localStorage.getItem(STORAGE_KEY)
//     if (!token) return null
//        const profile = await apiGetUserProfile() // Attempt to fetch user profile with the token to validate it
//         if(profile) return profile.user 
//         return null // If fetching profile fails, we consider the token invalid and return null
//     return null // If the token is valid, the user state will be set in the context after fetching the profile
//   } catch {
//     return null
//   }
// }

// // ── Context ────────────────────────────────────────────
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: false,
//   authError: null,
//   login: async () => false,
//   logout: () => { },
//   register: async () => false,
//   verifyMagicLink: async () => false,
// })

// // ── Provider ───────────────────────────────────────────
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(() => loadUser())
//   const [loading, setLoading] = useState(false)
//   const [authError, setAuthError] = useState<{ message: string, status?: number } | null>(null)

//   const { showAlert } = useAlert()

//   // ── Helper: persist & update user state ───────────────
//   const persistUser = (user: User, token: string) => {
//     setUser(user)
//     saveToken(token)
//   }

//   // ── Login ─────────────────────────────────────────────
//   const login = async (data: LoginData): Promise<boolean> => {
//     setLoading(true)
//     setAuthError(null) // Clear previous errors on new attempt

//     try {
//       // Assuming your apiLogin returns response.data directly
//       const json = await apiLogin(data.email, data.password)

//       const loggedInUser: User = {
//         name: json.user.name,
//         email: json.user.email,
//       }

//       persistUser(loggedInUser, json.token)
//       showAlert(`Welcome back, ${loggedInUser.name}!`, 'success')
//       return true
//     } catch (err: any) {
//       const errorData = getErrorMessage(err)
//       setAuthError(errorData)

//       // Combine custom status logic with your global alert
//       if (errorData.status === 401) {
//         console.error("Invalid credentials, please try again.")
//       }

//       showAlert(errorData.message || 'Login failed.', 'error')
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ── Logout ────────────────────────────────────────────
//   const logout = () => {
//     setUser(null)
//     clearToken()
//     setAuthError(null)
//     showAlert('You have been logged out.', 'info')
//   }

//   // ── Register ──────────────────────────────────────────
//   const register = async (data: RegisterData): Promise<boolean> => {
//     setLoading(true)
//     setAuthError(null)

//     try {
//       await apiRegister(data.name, data.email, data.password)

//       showAlert(
//         'Registration successful! Please check your email to verify your account.',
//         'success'
//       )
//       return true
//     } catch (err: any) {
//       const errorData = getErrorMessage(err)
//       setAuthError(errorData)

//       if (errorData.status === 409) {
//         console.error("User already exists!")
//       }

//       showAlert(errorData.message || 'Registration failed.', 'error')
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ── Verify Magic Link ─────────────────────────────────
//   const verifyMagicLink = async (data: MagicLinkData): Promise<boolean> => {
//     setLoading(true)
//     setAuthError(null)

//     try {
//       // Pass the destructured token and email depending on how your api function expects it
//       const json = await apiVerifyMagicLink(data.token, data.email)

//       const verifiedUser: User = {
//         name: json.user.name ?? '',
//         email: json.user.email ?? data.email,
//       }

//       persistUser(verifiedUser, json.token)
//       showAlert('Email verified! You are now logged in.', 'success')
//       return true
//     } catch (err: any) {
//       const errorData = getErrorMessage(err)
//       setAuthError(errorData)

//       if (errorData.status === 400 || errorData.status === 401) {
//         console.error("Token is invalid or has expired.")
//       }

//       showAlert(errorData.message || 'Verification failed.', 'error')
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ── GetUserProfile ─────────────────────────────────────
//   const getUserProfile = async (): Promise<User> => {
//     setLoading(true)
//     setAuthError(null)
//     try {
//       const profile = await apiGetUserProfile()
//       setUser(profile.user)
//       persistUser(profile.user, localStorage.getItem(STORAGE_KEY) || '')
//       return profile.user
//     } catch (err: any) {
//     const errorData = getErrorMessage(err)
//     setAuthError(errorData)
//     showAlert(errorData.message || 'Failed to fetch user profile.', 'error')
//     return null as any
//   } finally {
//     setLoading(false)
//   }
// }

// return (
//   <AuthContext.Provider
//     value={{ user, loading, authError, login, logout, register, verifyMagicLink }}
//   >
//     {children}
//   </AuthContext.Provider>
// )
// }

// // ── Hook ───────────────────────────────────────────────
// export const useAuth = () => useContext(AuthContext)

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAlert } from './AlertConext'

import {
  login as apiLogin,
  register as apiRegister,
  verifyMagicLink as apiVerifyMagicLink,
  GetUserProfile as apiGetUserProfile
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
  getUserProfile: async () => {}
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

  return (
    <AuthContext.Provider value={{ user, loading, authError, login, logout, register, verifyMagicLink, getUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)