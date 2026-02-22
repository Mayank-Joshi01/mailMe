import { useAuth } from '../context/AppContext'
import UserCard from '../Components/home/UserCard'
import MailForm from '../Components/home/MailForm'
import Button from '../Components/Button'
import { useNavigate } from 'react-router'

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate();

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-center px-4 w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to PostDrop
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please login or register to continue.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button variant="secondary" onClick={() => navigate('/register')}>Register</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* User info */}
      <UserCard />

      {/* Gallery + Mail form side by side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <MailForm />
      </div>
    </div>
  )
}