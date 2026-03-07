const steps = [
  {
    number: '01',
    title: 'Create an Project',
    description: 'Sign up and create a project to get your unique public ID instantly.',
  },
  {
    number: '02',
    title: 'Add the script',
    description: 'Paste one script tag into your HTML. That\'s all the code you need.',
  },
  {
    number: '03',
    title: 'Get responses',
    description: 'Customer messages land directly in your inbox in real time.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-4 py-16 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2">
          How it works
        </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Up and running in 3 steps
        </h2>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map(step => (
          <div
            key={step.number}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col gap-3"
          >
            <span className="text-3xl font-bold text-indigo-100 dark:text-indigo-900">
              {step.number}
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}