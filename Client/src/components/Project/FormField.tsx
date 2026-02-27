// Reusable wrapper for every field — label + error + children

interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}

export default function FormField({ label, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

// Shared input className — export so all inputs stay consistent
export const inputClass = `
  w-full px-3 py-2.5 rounded-xl border text-sm outline-none
  bg-white dark:bg-gray-800
  border-gray-200 dark:border-gray-700
  text-gray-900 dark:text-white
  placeholder:text-gray-400 dark:placeholder:text-gray-500
  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
  transition-all
`