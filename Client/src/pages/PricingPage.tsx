import PricingHeader from '../Components/Pricing/PricingHeader'
import PricingGrid from '../Components/Pricing/PricingGrid'

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center w-full">

      <PricingHeader />

      <PricingGrid />

      <p className="text-xs text-gray-400 dark:text-gray-600 mt-10">
        All plans include a 14-day free trial. No credit card required.
      </p>

    </div>
  )
}