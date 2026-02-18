import { useAuth } from '../../context/AppContext'

export default function UserCard() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-300 shrink-0">
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">
          Logged in as
        </p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {user.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
      </div>
    </div>
  )
}