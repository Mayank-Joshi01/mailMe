import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

type Page = 'home' | 'login' | 'register'

function AppContent() {
  const [page, setPage] = useState<Page>('home')

  // Login and Register don't show the Navbar
  if (page === 'login')    return <LoginPage onNavigate={setPage} />
  if (page === 'register') return <RegisterPage onNavigate={setPage} />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onNavigate={setPage} />
      <HomePage onNavigate={setPage} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}