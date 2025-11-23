import React from 'react';
import { Container } from '@/shared/components/Container';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for trying out Lomira',
    features: [
      'Up to 3 landing pages',
      'Basic templates',
      'Mobile responsive',
      'Basic analytics',
      'Community support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For growing businesses',
    popular: true,
    features: [
      'Unlimited landing pages',
      'All premium templates',
      'Custom domains',
      'Advanced analytics',
      'Priority support',
      'A/B testing',
      'Email integrations',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'Team collaboration',
      'Advanced security',
    ],
    cta: 'Contact Sales',
  },
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <Card className={`flex flex-col h-full ${plan.popular ? 'ring-2 ring-blue-500 shadow-2xl' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Free' && plan.price !== 'Custom' && (
                      <span className="text-gray-600">/mo</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{plan.period}</p>
                  <p className="text-gray-600 mt-3">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

