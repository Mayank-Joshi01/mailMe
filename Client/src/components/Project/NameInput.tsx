import FormField, { inputClass } from './FormField'

interface NameInputProps {
  value: string
  onChange: (val: string) => void
  error?: string
}

export default function NameInput({ value, onChange, error }: NameInputProps) {
  return (
    <FormField label="Project Name" error={error}>
      <input
        type="text"
        placeholder="My Contact Form"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${inputClass} ${error ? 'border-red-400 dark:border-red-500' : ''}`}
      />
    </FormField>
  )
}