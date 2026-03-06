import type { Entries } from './Types'
import EntryCard from './EntryCard'

interface EntriesGridProps {
  entries: Entries[]
}

export default function EntriesGrid({ entries }: EntriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {entries.map((entry, index) => (
        /// Currently using createdAt as key since API doesn't return unique IDs for entries, but ideally should use a proper unique identifier
        <EntryCard key={entry.createdAt} entry={entry} index={index} />
      ))}
    </div>
  )
}