import FormField, { inputClass } from './FormField'

interface DescriptionInputProps {
  value: string
  onChange: (val: string) => void
  error?: string
}

export default function DescriptionInput({ value, onChange, error }: DescriptionInputProps) {
  return (
    <FormField label="Description (optional)" error={error}>
      <textarea
        rows={3}
        placeholder="What is this project for?"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${inputClass} resize-none ${error ? 'border-red-400 dark:border-red-500' : ''}`}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
        {value.length}/200
      </p>
    </FormField>
  )
}