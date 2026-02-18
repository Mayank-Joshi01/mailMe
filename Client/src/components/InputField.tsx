interface InputFieldProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`px-3 py-2 rounded-lg border text-sm outline-none
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error
            ? 'border-red-400 dark:border-red-500'
            : 'border-gray-300 dark:border-gray-600'
          }`}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}