import { useNavigate } from 'react-router'

interface FormActionsProps {
  loading: boolean
  submitLabel: string
  loadingLabel: string
}

export default function FormActions({ loading, submitLabel, loadingLabel }: FormActionsProps) {
  const navigate = useNavigate()

  return (
    <>
      <div className="h-px bg-gray-100 dark:bg-gray-800" />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
            text-sm font-medium text-gray-600 dark:text-gray-400
            hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white
            text-sm font-medium hover:bg-indigo-700 transition-colors
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </>
  )
}