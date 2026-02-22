import { useState } from 'react'
import { useAuth } from '../../context/AppContext'
import { useNavigate } from 'react-router'

interface NavbarProps {
  showDocsToggle?: boolean;
  onMenuToggle?: () => void;
}

export default function Navbar({ showDocsToggle = false, onMenuToggle }: NavbarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* NEW: Docs Specific Sidebar Toggle (only shows when showDocsToggle is true) */}
            {showDocsToggle && (
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
            )}

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight flex items-center gap-2"
            >
              PostDrop  </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <NavButton onClick={() => navigate('/docs')} label="Docs" />
              <NavButton onClick={() => navigate('/pricing')} label="Pricing" />
              {user && <NavButton onClick={() => navigate('/dashboard')} label="Dashboard" />}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/console')}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Console
                </button>
                
                <div className="group relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold cursor-pointer hover:ring-4 ring-indigo-50 transition-all">
                    {userInitial}
                  </div>
                  <div className="absolute right-0 top-12 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                    {user.name}
                  </div>
                </div>

                <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Login</button>
                <button onClick={() => navigate('/register')} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">Get Started</button>
              </div>
            )}

            {/* Main Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b px-4 py-3 space-y-1">
          <MobileNavButton onClick={() => navigate('/docs')} label="Docs" />
          <MobileNavButton onClick={() => navigate('/pricing')} label="Pricing" />
          {user && <MobileNavButton onClick={() => navigate('/dashboard')} label="Dashboard" />}
        </div>
      )}
    </nav>
  )
}

function NavButton({ onClick, label }: { onClick: () => void, label: string }) {
  return <button onClick={onClick} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors">{label}</button>
}

function MobileNavButton({ onClick, label }: { onClick: () => void, label: string }) {
  return <button onClick={onClick} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100">{label}</button>
}