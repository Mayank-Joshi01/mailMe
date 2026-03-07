import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import EntriesHeader from "../Components/Entries/EntriesHeader"
import EntriesGrid   from '../Components/Entries/EntriesGrid'
import Pagination    from '../Components/Entries/Pagination'
import EmptyState    from '../Components/Entries/EmptyState'
import { useProjects } from '../context/ProjectContext'

export default function EntriesPage() {
  const navigate = useNavigate()
  const { projectId } = useParams() 
  const { fetchEntries, currentProject, currentEntries, fetchCurrentProject } = useProjects() 
  
  // Hardcode defaults initially to prevent stale state bugs from previous projects
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage]         = useState(10)

  // 1. Fetch Project Details ONLY when the URL (projectId) changes
  useEffect(() => {
    if (projectId) {
      fetchCurrentProject(projectId)
    }
    // We intentionally exclude fetchCurrentProject to break the infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  // 2. Fetch Entries when the URL OR the pagination changes
  useEffect(() => {
    if (projectId) {
      // Notice: Only calling this ONCE now!
      fetchEntries(projectId, currentPage, perPage) 
    }
    // Exclude fetchEntries for the same reason
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, currentPage, perPage])

  const handlePerPageChange = (n: number) => {
    setPerPage(n)
    setCurrentPage(1) // Reset to page 1 whenever per-page changes
  }

  // Safe fallbacks for the UI
  const entries = currentEntries?.CurrentEntries || []
  const pagination = currentEntries?.pagination || { currentPage: 1, totalPages: 1 }

  return (
    <main className="min-h-screen bg-zinc-950 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <EntriesHeader
          projectName={currentProject?.name ?? 'Project'}
          entryCount={currentProject?.totalEntries ?? 0}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
          onBack={() => navigate(-1)}
          onSettings={() => navigate(`/console/project/${currentProject?._id}/settings`)}
        />

        {/* Divider */}
        <div className="border-t border-zinc-800 my-6" />

        {/* Content */}
        {entries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <EntriesGrid entries={entries} />
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

      </div>
    </main>
  )
}