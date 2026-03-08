import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router'
import { AlertProvider } from './context/AlertConext'
import { ProjectProvider } from './context/ProjectContext'
import { SummaryProvider } from './context/SummaryContext'
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID =  import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AlertProvider>
    <ProjectProvider>
    <SummaryProvider>
    <AuthProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
    </SummaryProvider>
    </ProjectProvider>
    </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)
