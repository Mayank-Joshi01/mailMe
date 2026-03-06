import { Inbox } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-4">
        <Inbox size={22} strokeWidth={1.5} className="text-zinc-600" />
      </div>
      <p className="text-zinc-300 font-semibold text-sm">No entries yet</p>
      <p className="text-zinc-600 text-sm mt-1 max-w-xs leading-relaxed">
        Submissions will appear here once your form receives its first entry.
      </p>
    </div>
  )
}