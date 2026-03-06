import type { UserSummaryData } from "./consoleData"

interface StatsBarProps {
userSummary: UserSummaryData | null ;
}

export default function StatsBar({ userSummary }: StatsBarProps) {

  const stats = [
    { label: 'Total Projects', value: userSummary?.totalProjects },
    { label: 'Active',         value: userSummary?.activeProjects      },
    { label: 'Total Entries',  value: userSummary?.totalEntries     },
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