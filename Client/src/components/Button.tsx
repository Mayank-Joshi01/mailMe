interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  fullWidth?: boolean
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const base = `px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${fullWidth ? 'w-full' : ''}`

  const styles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  )
}