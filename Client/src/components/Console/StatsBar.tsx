import type { Project } from './consoleData'

interface StatsBarProps {
  projects: Project[]
}

export default function StatsBar({ projects }: StatsBarProps) {
  const totalEntries = projects.reduce((sum, p) => sum + p.entries, 0)
  const activeCount  = projects.filter(p => p.status === 'active').length

  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Active',         value: activeCount      },
    { label: 'Total Entries',  value: totalEntries     },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4"
        >
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}