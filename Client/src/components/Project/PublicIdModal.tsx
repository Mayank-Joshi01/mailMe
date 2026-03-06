import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'

interface PublicIdModalProps {
  publicId: string | null
  onClose: () => void
}

export default function PublicIdModal({ publicId, onClose }: PublicIdModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(publicId || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-500 transition-all duration-150 hover:border-zinc-500 hover:text-zinc-200 cursor-pointer"
        >
          <X size={13} strokeWidth={2} />
        </button>

        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-zinc-100 font-semibold text-base leading-tight mb-1">
          Your project is ready
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
          Use this Public ID in your form's <code className="text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">action</code> URL. Keep this page — you won't see it again.
        </p>

        {/* Public ID display */}
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 mb-3">
          <span className="flex-1 font-mono text-sm text-zinc-200 tracking-wide select-all break-all">
            {publicId}
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer flex-shrink-0 ${
              copied
                ? 'bg-emerald-900/40 border-emerald-700 text-emerald-400'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100'
            }`}
          >
            {copied ? (
              <><Check size={12} strokeWidth={2.5} /> Copied</>
            ) : (
              <><Copy size={12} strokeWidth={2} /> Copy</>
            )}
          </button>
        </div>

        <p className="text-zinc-600 text-xs text-center">
          Click anywhere outside to dismiss
        </p>
      </div>
    </div>
  )
}