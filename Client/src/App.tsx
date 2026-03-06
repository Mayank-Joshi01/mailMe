import { Routes, Route, Navigate } from 'react-router'
import { useAuth } from './context/AuthContext'
import { useAlert } from './context/AlertConext'
import Alert from './Components/Alert/Alert'

// Layout
import MainLayout from './layout/MainLayout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyPage from './pages/VerifyPage'
import NotFoundPage from './pages/404Page'
import PricingPage from './pages/PricingPage'
import DocsPage from './pages/DocumentationPage'
import ConsolePage from './pages/ConsolePage'
import CreateProjectPage from './pages/CreateProjectPage'
import EntriesPage from './pages/EntriesPage'
import ProjectSettingsPage from './pages/ProjectSettingsPagae'
import ConsoleLayout from './layout/ConsoleLayout'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <Navigate to="/" replace /> : <>{children}</>
}

export default function App() {
  const { alert } = useAlert()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Global Alert remains outside the routes to stay on top */}
      {alert.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 z-100">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <Routes>
        {/* --- ROUTES WITHOUT NAVBAR --- */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/verify-signup" element={<PublicRoute><VerifyPage /></PublicRoute>} />

        {/* --- ROUTES WITH NAVBAR (Nested in MainLayout) --- */}
        <Route element={<MainLayout />}>
          {/* Open Routes (Anyone can see) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Protected Routes (Only logged in) */}
          <Route path="/console/" element={<ConsoleLayout />}>
          <Route path="/console/" element={
            <PrivateRoute>
              <ConsolePage />
            </PrivateRoute>
          } />
          <Route path="/console/create-project" element={
            <PrivateRoute>
              <CreateProjectPage />
            </PrivateRoute>
          } />
          <Route path="/console/project/:projectId" element={
            <PrivateRoute>
              <EntriesPage />
            </PrivateRoute>
          } />
          <Route path="/console/project/:projectId/settings" element={
            <PrivateRoute>
              <ProjectSettingsPage />
            </PrivateRoute>
          } />
          </Route>
        </Route>


        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}