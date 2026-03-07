import { useNavigate } from 'react-router'
import {useAuth} from '../../context/AuthContext'

export default function CTA() {
  const navigate = useNavigate()
  const {user} = useAuth()

  return (
    <section className="px-4 py-20 flex flex-col items-center text-center">

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white max-w-md">
        Start collecting responses today
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-sm">
        Free for small projects. 
      </p>

      { !user && <button
        onClick={() => navigate('/register')}
        className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none"
      >
        Create free account
      </button>}

      <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
        Trusted by thousands of developers and makers
      </p>

    </section>
  )
}