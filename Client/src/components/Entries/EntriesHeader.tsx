import BackButton from './BackButton'
import SettingsButton from './SettingsButton'
import PerPageSelector from './PerPageSelector'

interface EntriesHeaderProps {
  projectName: string
  entryCount: number
  perPage: number
  onPerPageChange: (n: number) => void
  onBack: () => void
  onSettings: () => void
}

export default function EntriesHeader({
  projectName,
  entryCount,
  perPage,
  onPerPageChange,
  onBack,
  onSettings,
}: EntriesHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left — back + project name + count */}
      <div className="flex flex-col gap-1.5">
        <BackButton projectName={projectName} onBack={onBack} />
        <span className="pl-11 text-xs text-zinc-500 font-medium tracking-wide uppercase">
          {entryCount} {entryCount === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {/* Right — per-page + settings */}
      <div className="flex items-center gap-3">
        <PerPageSelector value={perPage} onChange={onPerPageChange} />
        <div className="w-px h-5 bg-zinc-700" />
        <SettingsButton onClick={onSettings} />
      </div>
    </div>
  )
}