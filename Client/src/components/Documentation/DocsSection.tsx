interface DocsSectionProps {
  title: string
  body: string
  code?: string
}

export default function DocsSection({ title, body, code }: DocsSectionProps) {
  return (
    <div className="flex flex-col gap-4">

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700" />

      {/* Body */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {body}
      </p>

      {/* Code block */}
      {code && (
        <div className="bg-gray-950 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto border border-gray-800 dark:border-gray-700">
          <pre className="text-sm text-green-400 font-mono whitespace-pre">
            {code}
          </pre>
        </div>
      )}
    </div>
  )
}