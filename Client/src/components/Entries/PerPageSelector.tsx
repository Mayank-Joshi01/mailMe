interface PerPageSelectorProps {
  value: number
  onChange: (n: number) => void
}

const OPTIONS = [3, 6, 9, 12]

export default function PerPageSelector({ value, onChange }: PerPageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-500 font-medium whitespace-nowrap">Per page</span>
      <div className="flex items-center gap-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-8 h-7 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer border ${
              value === opt
                ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}