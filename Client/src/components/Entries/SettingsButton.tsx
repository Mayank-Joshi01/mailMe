import { Settings } from 'lucide-react'

interface SettingsButtonProps {
  onClick: () => void
}

export default function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-zinc-500 hover:text-zinc-100 hover:bg-zinc-700"
    >
      <Settings
        size={14}
        strokeWidth={2}
        className="transition-transform duration-500 group-hover:rotate-90"
      />
      <span>Settings</span>
    </button>
  )
}