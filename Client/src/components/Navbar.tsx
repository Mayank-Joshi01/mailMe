import { useAuth } from '../context/AppContext'
import { useNavigate } from 'react-router'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          MyApp
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
         

          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                Hi -  <span className="font-bold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-sm font-medium
                  bg-red-50 text-red-600 border border-red-200 hover:bg-red-100
                  dark:bg-red-950 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium
                  bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}