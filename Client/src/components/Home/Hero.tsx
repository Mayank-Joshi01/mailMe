import { useNavigate } from 'react-router'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col items-center text-center px-4 pt-20 pb-16">

      {/* Badge */}
      <span className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full mb-6">
        No backend required
      </span>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight max-w-2xl">
        Receive customer messages{' '}
        <span className="text-indigo-600 dark:text-indigo-400">straight to your inbox</span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 dark:text-gray-400 text-base mt-4 max-w-lg">
        PostDrop lets you collect form submissions from any website with just a public ID and one script tag. No backend, no setup, no stress.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-8 flex-wrap justify-center">
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Get started free
        </button>
        <button
          onClick={() => navigate('/docs')}
          className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          View docs →
        </button>
      </div>

      {/* Hero code snippet */}
      <div className="mt-12 w-full max-w-lg bg-gray-950 rounded-2xl p-4 text-left border border-gray-800 shadow-xl">
        <div className="flex gap-1.5 mb-3">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <pre className="text-sm font-mono text-green-400 whitespace-pre">{`<script 
  src="https://postdrop.io/sdk.js"
  data-id="YOUR_PUBLIC_ID">
</script>`}
        </pre>
      </div>

    </section>
  )
}