import { useState } from 'react'
import { useNavigate } from 'react-router'

interface DocsNavbarProps {
  onMenuToggle: () => void
}

export default function DocsNavbar({ onMenuToggle }: DocsNavbarProps) {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4">

      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        ☰
      </button>

      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="text-lg font-bold text-indigo-600 dark:text-indigo-400 shrink-0"
      >
        MyApp
      </button>

      <span className="text-gray-300 dark:text-gray-600">|</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">Docs</span>

      {/* Search — decorative */}
      <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-400 w-48 cursor-pointer">
        <span>🔍</span>
        <span>Search docs...</span>
      </div>
    </header>
  )
}