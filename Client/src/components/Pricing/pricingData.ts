export interface Plan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  button: string
  highlight: boolean
}

export const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started.',
    features: ['1 Project', '5GB Storage', 'Basic Support', 'API Access'],
    button: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Best for growing teams.',
    features: ['10 Projects', '50GB Storage', 'Priority Support', 'API Access', 'Analytics'],
    button: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Business',
    price: '$39',
    period: 'per month',
    description: 'For large scale applications.',
    features: ['Unlimited Projects', '500GB Storage', '24/7 Support', 'API Access', 'Analytics', 'Custom Domain'],
    button: 'Contact Sales',
    highlight: false,
  },
]