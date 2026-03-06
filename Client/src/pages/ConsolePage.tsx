import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../context/ProjectContext'
import { useSummary } from '../context/SummaryContext'
import ConsoleHeader from '../Components/Console/ConsoleHeader'
import StatsBar from '../Components/Console/StatsBar'
import ProjectTable from '../Components/Console/ProjectTable'
import EmptyState from '../Components/Console/EmptyState'
import { useNavigate } from 'react-router' // or 'react-router-dom' depending on your version

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Make sure loading and error are destructured
  const { projects, loading, error } = useProjects()
  const { summary } = useSummary()


  const handleNewProject = () => {
    navigate('/console/create-project')
  }
  const OpenProject = (projectId: string) => {
    navigate(`/console/project/${projectId}`)
  }

  // ✅ 1. Guard clause for Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-xl font-semibold">Loading your workspace...</p>
      </div>
    )
  }

  // ✅ 2. Guard clause for Errors
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 w-full">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <ConsoleHeader
          name={user?.name ?? 'there'}
          onNewProject={handleNewProject}
        />

        <StatsBar userSummary={summary} />

        {/* ✅ 3. Optional chaining just in case projects is null/undefined */}
        {!projects || projects.length === 0
          ? <EmptyState onNewProject={handleNewProject} />
          : <ProjectTable projects={projects} OpenProject={OpenProject} />
        }

      </div>
    </div>
  )
}