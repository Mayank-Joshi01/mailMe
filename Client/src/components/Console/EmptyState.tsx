interface EmptyStateProps {
  onNewProject: () => void
}

export default function EmptyState({ onNewProject }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        No projects yet
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
        Create your first project to start collecting responses.
      </p>
      <button
        onClick={onNewProject}
        className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Create a project
      </button>
    </div>
  )
}