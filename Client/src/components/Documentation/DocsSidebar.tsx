import { docsSections } from './docsData'

interface DocsSidebarProps {
  activeId: string
  onSelect: (id: string) => void
  open: boolean
  onClose: () => void
}

export default function DocsSidebar({ activeId, onSelect, open, onClose }: DocsSidebarProps) {

  const handleSelect = (id: string) => {
    onSelect(id)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-14 left-0 bottom-0 z-30 w-60 bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        overflow-y-auto p-4 flex flex-col gap-6
        transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {docsSections.map(section => (
          <div key={section.id}>
            {/* Section title */}
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
              {section.title}
            </p>

            {/* Subtitles */}
            <ul className="flex flex-col gap-0.5">
              {section.subtitles.map(sub => (
                <li key={sub.id}>
                  <button
                    onClick={() => handleSelect(sub.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors
                      ${activeId === sub.id
                        ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {sub.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </>
  )
}