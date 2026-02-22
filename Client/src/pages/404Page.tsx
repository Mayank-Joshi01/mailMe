import { useNavigate } from 'react-router'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">

      {/* 404 Number */}
      <h1 className="text-8xl font-bold text-indigo-600 dark:text-indigo-400">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
        Page not found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Go Back
        </button>
      </div>

    </div>
  )
}