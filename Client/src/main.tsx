import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext'
import { BrowserRouter } from 'react-router'
import { AlertProvider } from './context/AlertConext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AlertProvider>
    <AppProvider>
        <App />
    </AppProvider>
    </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)
