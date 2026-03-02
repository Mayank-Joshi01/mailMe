import { docsContent } from './docsData'
import DocsSection from './DocsSection'

interface DocsContentProps {
  activeId: string,
  onNavigate?: (id: string) => void
}

export default function DocsContent({ activeId, onNavigate }: DocsContentProps) {
  const content = docsContent[activeId]

  if (!content) {
    return (
      <p className="text-gray-400 text-sm">Select a topic from the sidebar.</p>
    )
  }

  return (
    <div className="max-w-2xl w-full flex flex-col gap-8">
      <DocsSection
        title={content.title}
        body={content.body}
        code={content.code}
      />

      {/* Prev / Next buttons */}
      <PrevNext activeId={activeId} onNavigate={onNavigate} />
    </div>
  )
}

// ── Prev / Next ────────────────────────────────────────
import { docsSections } from './docsData'

function PrevNext({ activeId, onNavigate }: { activeId: string, onNavigate?: (id: string) => void }) {
  // Flatten all subtitles into a single list
  const allItems = docsSections.flatMap(s => s.subtitles)
  const currentIndex = allItems.findIndex(item => item.id === activeId)

  const prev = allItems[currentIndex - 1] ?? null
  const next = allItems[currentIndex + 1] ?? null

  const handleNavigation = (id: string) => {
    onNavigate && onNavigate(id);
    // Optional: Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
      {prev ? (
        <div className="text-sm cursor-pointer" onClick={() => handleNavigation(prev.id)}>
          <p className="text-gray-400 text-xs mb-0.5">Previous</p>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">← {prev.label}</span>
        </div>
      ) : <div />}

      {next ? (
        <div className="text-sm text-right cursor-pointer" onClick={() => handleNavigation(next.id)}>
          <p className="text-gray-400 text-xs mb-0.5">Next</p>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">{next.label} →</span>
        </div>
      ) : <div />}
    </div>
  )
}