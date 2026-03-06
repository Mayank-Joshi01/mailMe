import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  projectName: string
  onBack: () => void
}

export default function BackButton({ projectName, onBack }: BackButtonProps) {
  return (
    <button
      onClick={onBack}
      className="group flex items-center gap-3 text-left bg-transparent border-none cursor-pointer"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 transition-all duration-200 group-hover:border-zinc-500 group-hover:text-zinc-100 group-hover:bg-zinc-700">
        <ArrowLeft size={14} strokeWidth={2} />
      </span>
      <span className="text-zinc-100 font-semibold text-lg tracking-tight leading-none">
        {projectName}
      </span>
    </button>
  )
}