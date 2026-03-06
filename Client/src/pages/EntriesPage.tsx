import { useState, useMemo, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router'

import EntriesHeader from "../Components/Entries/EntriesHeader"
import EntriesGrid   from '../Components/Entries/EntriesGrid'
import Pagination    from '../Components/Entries/Pagination'
import EmptyState    from '../Components/Entries/EmptyState'
import { useProjects } from '../context/ProjectContext'

// ── Swap these out for your real router params + API data ─────────────────────

// ─────────────────────────────────────────────────────────────────────────────

export default function EntriesPage() {
  const navigate = useNavigate()
  const { projectId } = useParams() // Get project ID from route params
  const { fetchEntries , currentProject ,currentEntries, fetchCurrentProject } = useProjects() // Get fetchEntries from context
  const [currentPage, setCurrentPage] = useState(currentEntries?.pagination.currentPage ?? 1)
  const [perPage, setPerPage]         = useState(currentEntries?.pagination.limit ?? 10)

//   const paginatedEntries = useMemo(() => {
//     const start = (currentPage - 1) * perPage
//     return allEntries.slice(start, start + perPage)
//   }, [currentPage, perPage])

  useEffect(() => {
    if (projectId) {
      fetchCurrentProject(projectId) // Fetch current project details using the ID from params
      fetchEntries(projectId, currentPage, perPage) // Fetch entries for this project
      fetchEntries(projectId, currentPage, perPage) // Fetch entries for this project
    }
  }, [projectId, fetchCurrentProject, fetchEntries, currentPage, perPage])

  // Reset to page 1 whenever per-page changes
  const handlePerPageChange = (n: number) => {
    setPerPage(n)
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-zinc-950 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <EntriesHeader
          projectName={currentProject?.name?? 'Project'}
          entryCount={currentEntries?.CurrentEntries.length ?? 0}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
          onBack={() => navigate(-1)}
          onSettings={() => navigate(`/console/project/${currentProject?._id}/settings`)}
        />

        {/* Divider */}
        <div className="border-t border-zinc-800 my-6" />

        {/* Content */}
        {currentEntries?.CurrentEntries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <EntriesGrid entries={currentEntries?.CurrentEntries ?? []} />
            <Pagination
              currentPage={currentEntries?.pagination.currentPage ?? 1}
              totalPages={currentEntries?.pagination.totalPages ?? 1}
              onPageChange={setCurrentPage}
            />
          </>
        )}

      </div>
    </main>
  )
}