import FormField, { inputClass } from './FormField'

interface StatusInputProps {
  value: 'active' | 'inactive'
  onChange: (val: 'active' | 'inactive') => void
  disabled?: boolean
}

export default function StatusInput({ value, onChange, disabled = false }: StatusInputProps) {
  return (
    <FormField
      label="Status"
      hint={disabled ? 'All new projects start as active by default.' : undefined}
    >
      <select
        value={value}
        onChange={e => onChange(e.target.value as 'active' | 'inactive')}
        disabled={disabled}
        className={`${inputClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </FormField>
  )
}