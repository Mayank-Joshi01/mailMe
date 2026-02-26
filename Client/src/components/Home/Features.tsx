const features = [
  {
    icon: '⚡',
    title: 'Zero backend',
    description: 'No server setup, no databases, no DevOps. Just paste and go.',
  },
  {
    icon: '📬',
    title: 'Email delivery',
    description: 'Every form submission is delivered directly to your email.',
  },
  {
    icon: '🔒',
    title: 'Spam protection',
    description: 'Built-in filtering keeps your inbox clean from bots.',
  },
  {
    icon: '🌐',
    title: 'Works anywhere',
    description: 'Any website or framework — React, Vue, plain HTML, anything.',
  },
  {
    icon: '📊',
    title: 'Submission dashboard',
    description: 'View and manage all your submissions in one place.',
  },
  {
    icon: '🚀',
    title: 'Instant setup',
    description: 'From signup to receiving messages in under 2 minutes.',
  },
]

export default function Features() {
  return (
    <section className="px-4 py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2">
            Features
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Everything you need, nothing you don't
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 flex flex-col gap-2"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}