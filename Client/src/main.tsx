import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router'
import { AlertProvider } from './context/AlertConext'
import { ProjectProvider } from './context/ProjectContext'
import { SummaryProvider } from './context/SummaryContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AlertProvider>
    <ProjectProvider>
    <SummaryProvider>
    <AuthProvider>
        <App />
    </AuthProvider>
    </SummaryProvider>
    </ProjectProvider>
    </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)
