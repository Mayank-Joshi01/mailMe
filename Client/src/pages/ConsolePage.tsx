import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { mockProjects } from '../Components/Console/consoleData'
import ConsoleHeader from '../Components/Console/ConsoleHeader'
import StatsBar from '../Components/Console/StatsBar'
import ProjectTable from '../Components/Console/ProjectTable'
import EmptyState from '../Components/Console/EmptyState'

export default function DashboardPage() {
  const { user } = useAuth()
  const [projects] = useState(mockProjects)

  const handleNewProject = () => {
    // hook up your create project modal/page here
    alert('Create new project')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 w-full">
      <div className="max-w-5xl mx-auto px-4 py-10">

        <ConsoleHeader
          name={user?.name ?? 'there'}
          onNewProject={handleNewProject}
        />

        <StatsBar projects={projects} />

        {projects.length === 0
          ? <EmptyState onNewProject={handleNewProject} />
          : <ProjectTable projects={projects} />
        }

      </div>
    </div>
  )
}