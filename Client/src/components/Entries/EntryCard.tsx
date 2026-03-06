import type { Entries } from './Types'

interface EntryCardProps {
  entry: Entries
  index: number
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const AVATAR_COLORS = [
  'bg-amber-900/60  text-amber-300',
  'bg-sky-900/60    text-sky-300',
  'bg-emerald-900/60 text-emerald-300',
  'bg-rose-900/60   text-rose-300',
  'bg-violet-900/60 text-violet-300',
  'bg-orange-900/60 text-orange-300',
]

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold flex-shrink-0 ${color}`}>
      {initials}
    </span>
  )
}

export default function EntryCard({ entry, index }: EntryCardProps) {
  const nameField    = "Name"
  const emailField   = "Email"
  const otherFields  = Object.entries(entry.data)
    .filter(([key]) => key !== nameField && key !== emailField)
    .map(([key, value]) => ({ label: key, value }))

  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800/60"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {nameField && <Avatar name={nameField} />}
          <div>
            {nameField && (
              <p className="text-zinc-100 font-semibold text-sm leading-tight">{nameField}</p>
            )}
            {emailField && (
              <p className="text-zinc-500 text-xs mt-0.5">{emailField}</p>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-zinc-400 text-xs font-medium">{formatDate(entry.createdAt)}</p>
          <p className="text-zinc-600 text-xs mt-0.5">{formatTime(entry.createdAt)}</p>
        </div>
      </div>

      {/* Extra fields */}
      {otherFields.length > 0 && (
        <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
          {otherFields.map((field) => (
            <div key={field.label}>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold mb-0.5">
                {field.label}
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed">{field.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}