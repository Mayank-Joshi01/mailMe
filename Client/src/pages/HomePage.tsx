import Hero from '../Components/Home/Hero'
import HowItWorks from '../Components/Home/HowItWorks'
import Features from '../Components/Home/Features'
import CTA from '../Components/Home/CAT'

export default function HomePage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen w-full">
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
    </div>
  )
}