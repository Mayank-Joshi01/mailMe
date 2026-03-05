import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router'
import { AlertProvider } from './context/AlertConext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AlertProvider>
    <AuthProvider>
        <App />
    </AuthProvider>
    </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)
