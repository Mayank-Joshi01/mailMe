import type  { Project } from './consoleData'

interface ProjectTableProps {
  projects: Project[]
  OpenProject: (projectId: string) => void
}

function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
      ${status === 'active'
        ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
      }
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function ProjectTable({ projects , OpenProject }: ProjectTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">

      {/* Table header */}
      <div className="grid grid-cols-3 px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        {['Project Name', 'Entries', 'Status'].map(col => (
          <p key={col} className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {col}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {projects.map(project => (
          <div
            key={project._id}
            className="grid grid-cols-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer items-center"
            onClick={() => OpenProject(project._id)}
          >
            {/* Name */}
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {project.name}
            </p>

            {/* Entries */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {project.totalEntries.toLocaleString()}
            </p>

            {/* Status */}
            <StatusBadge status={project.status} />
          </div>
        ))}
      </div>

    </div>
  )
}