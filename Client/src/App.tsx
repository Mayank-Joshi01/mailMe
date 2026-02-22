import { Routes, Route, Navigate } from 'react-router'
import { useAuth } from './context/AppContext'
import { useAlert } from './context/AlertConext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Alert from './components/Alert/Alert'

// Protect routes — redirect to /login if not logged in
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

// Redirect logged-in users away from login/register
function PublicRoute({ children }: { children: React.ReactNode }) {
  // const { user } = useAuth()
  // return user ? <Navigate to="/" replace /> : <>{children}</>
  return <>{children}</>
}

export default function App() {
  const { alert } = useAlert()

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* Global Alert */}
        {alert.show && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}

        <Routes>
          {/* Public routes — no Navbar */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />

          {/* Private routes — with Navbar */}
          <Route path="/" element={
            <PublicRoute>
              <>
                <Navbar />
                <HomePage />
              </>
            </PublicRoute>
          } />

          {/* Catch all — redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>

  )
}
