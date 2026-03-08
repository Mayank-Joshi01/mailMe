import { Routes, Route, Navigate } from 'react-router'
import { useAuth } from './context/AuthContext'
import { useAlert } from './context/AlertConext'
import Alert from './Components/Alert/Alert'
import { lazy, Suspense } from "react";

// ✅ 1. Lazy load the Main Layout too!
const MainLayout = lazy(() => import('./layout/MainLayout'));
const ConsoleLayout = lazy(() => import('./layout/ConsoleLayout'));

// Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const VerifyPage = lazy(() => import('./pages/VerifyPage'));
const NotFoundPage = lazy(() => import('./pages/404Page'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DocsPage = lazy(() => import('./pages/DocumentationPage'));
const ConsolePage = lazy(() => import('./pages/ConsolePage'));
const CreateProjectPage = lazy(() => import('./pages/CreateProjectPage'));
const EntriesPage = lazy(() => import('./pages/EntriesPage'));
const ProjectSettingsPage = lazy(() => import('./pages/ProjectSettingsPagae')); // Check spelling here (Pagae?)

// Guards
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <Navigate to="/console" replace /> : <>{children}</>; // Changed to redirect to /console
}

export default function App() {
  const { alert } = useAlert();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {alert.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
      
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-zinc-500">
          Loading...
        </div>
      }>
        <Routes>
          {/* --- ROUTES WITHOUT NAVBAR --- */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/verify-signup" element={<PublicRoute><VerifyPage /></PublicRoute>} />

          {/* --- ROUTES WITH NAVBAR (Nested in MainLayout) --- */}
          <Route element={<MainLayout />}>
            
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* ✅ 2. FIXED NESTED ROUTES */}
            {/* The parent handles the "/console" prefix */}
            <Route path="/console" element={<ConsoleLayout />}>
              {/* "index" means it loads exactly at "/console" */}
              <Route index element={<PrivateRoute><ConsolePage /></PrivateRoute>} />
              
              {/* Children paths are relative! */}
              <Route path="create-project" element={<PrivateRoute><CreateProjectPage /></PrivateRoute>} />
              <Route path="project/:projectId" element={<PrivateRoute><EntriesPage /></PrivateRoute>} />
              <Route path="project/:projectId/settings" element={<PrivateRoute><ProjectSettingsPage /></PrivateRoute>} />
            </Route>

          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}