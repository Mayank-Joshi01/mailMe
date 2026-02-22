import type { Plan } from './pricingData'

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div className={`
      relative flex flex-col rounded-2xl p-6 border transition-all
      ${plan.highlight
        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-950 scale-105'
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
      }
    `}>

      {/* Badge */}
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
          Most Popular
        </span>
      )}

      {/* Plan name */}
      <p className={`text-sm font-semibold mb-4 ${plan.highlight ? 'text-indigo-200' : 'text-gray-400 dark:text-gray-500'}`}>
        {plan.name}
      </p>

      {/* Price */}
      <div className="flex items-end gap-1 mb-1">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className={`text-sm mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>
          /{plan.period}
        </span>
      </div>

      {/* Description */}
      <p className={`text-xs mb-6 ${plan.highlight ? 'text-indigo-200' : 'text-gray-400 dark:text-gray-500'}`}>
        {plan.description}
      </p>

      {/* Divider */}
      <div className={`h-px mb-6 ${plan.highlight ? 'bg-indigo-500' : 'bg-gray-100 dark:bg-gray-800'}`} />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-8">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <span className={`text-xs ${plan.highlight ? 'text-indigo-200' : 'text-indigo-500'}`}>✓</span>
            <span className={plan.highlight ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className={`
        mt-auto w-full py-2.5 rounded-xl text-sm font-medium transition-colors
        ${plan.highlight
          ? 'bg-white text-indigo-600 hover:bg-indigo-50'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }
      `}>
        {plan.button}
      </button>

    </div>
  )
}