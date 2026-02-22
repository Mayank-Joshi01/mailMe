import { plans } from './pricingData'
import PricingCard from './PricingCard'

export default function PricingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {plans.map(plan => (
        <PricingCard key={plan.name} plan={plan} />
      ))}
    </div>
  )
}