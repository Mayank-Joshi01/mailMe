import { useState } from 'react'
import { X, Trash2 } from 'lucide-react'

interface DeleteProjectModalProps {
  projectName: string
  onConfirm: () => void
  onClose: () => void
}

export default function DeleteProjectModal({ projectName, onConfirm, onClose }: DeleteProjectModalProps) {
  const [input, setInput] = useState('')

  const matches = input.trim() === projectName.trim()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
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
        <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-900/60 flex items-center justify-center mb-5">
          <Trash2 size={17} strokeWidth={1.8} className="text-rose-400" />
        </div>

        {/* Text */}
        <h2 className="text-zinc-100 font-semibold text-base leading-tight mb-1">
          Delete project
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
          This action is permanent and cannot be undone. All entries associated with{' '}
          <span className="text-zinc-300 font-medium">{projectName}</span> will be lost.
        </p>

        {/* Confirmation input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-2">
            Type project name to confirm
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={projectName}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-700 font-mono outline-none transition-all duration-150 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-700"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-400 text-sm font-medium transition-all duration-150 hover:border-zinc-500 hover:text-zinc-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!matches}
            className="flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed border-rose-800 bg-rose-950/60 text-rose-400 hover:bg-rose-900/50 hover:border-rose-600 hover:text-rose-300"
          >
            Delete project
          </button>
        </div>
      </div>
    </div>
  )
}