type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertProps {
  type: AlertType
  message: string
  onClose?: () => void
}

const config = {
  success: {
    icon: '✓',
    classes: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-300',
    iconClasses: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  },
  error: {
    icon: '✕',
    classes: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-300',
    iconClasses: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
  },
  warning: {
    icon: '!',
    classes: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300',
    iconClasses: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
  },
  info: {
    icon: 'i',
    classes: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300',
    iconClasses: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  },
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const { icon, classes, iconClasses } = config[type]

  return (
    <div className={`flex fixed top-0 left-0 w-full items-center gap-3 px-4 py-3 rounded-xl border text-sm ${classes}`}>
      {/* Icon */}
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${iconClasses}`}>
        {icon}
      </span>

      {/* Message */}
      <span className="flex-1">{message}</span>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
        >
          ✕
        </button>
      )}
    </div>
  )
}