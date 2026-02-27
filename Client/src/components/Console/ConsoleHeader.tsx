interface ConsoleHeaderProps {
  name: string
  onNewProject: () => void
}

export default function ConsoleHeader({ name, onNewProject }: ConsoleHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Console
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Welcome back, {name}
        </p>
      </div>

      <button
        onClick={onNewProject}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        <span className="text-lg leading-none">+</span>
        New Project
      </button>

    </div>
  )
}