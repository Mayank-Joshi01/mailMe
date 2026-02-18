import { useAuth } from '../context/AppContext'
import UserCard from '../components/home/UserCard'
import MailForm from '../components/home/MailForm'
import Button from '../components/Button'

interface HomePageProps {
  onNavigate: (page: 'home' | 'login' | 'register') => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { user } = useAuth()

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to MyApp
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please login or register to continue.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate('login')}>Login</Button>
          <Button variant="secondary" onClick={() => onNavigate('register')}>Register</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* User info */}
      <UserCard />

      {/* Gallery + Mail form side by side on larger screens */}
      <div className="">

        <MailForm />
      </div>
    </div>
  )
}