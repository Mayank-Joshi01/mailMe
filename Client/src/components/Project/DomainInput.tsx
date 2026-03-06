import FormField, { inputClass } from './FormField'

interface DomainInputProps {
  value: string
  onChange: (val: string) => void
  error?: string
}

export default function DomainInput({ value, onChange, error }: DomainInputProps) {
  return (
    <FormField
      label="Allowed Domain"
      error={error}
      hint="Only requests from this domain will be accepted."
    >
      <input
        type="text"
        placeholder="example.com"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${inputClass} ${error ? 'border-red-400 dark:border-red-500' : ''}`}
      />
    </FormField>
  )
}