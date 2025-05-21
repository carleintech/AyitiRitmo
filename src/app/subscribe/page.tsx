'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Basic recommendations',
      'Limited support',
      'Community access',
    ],
    color: 'gray',
  },
  {
    name: 'Pro',
    price: 10,
    features: [
      'Advanced recommendations',
      'Priority support',
      'Access to beta features',
    ],
    color: 'blue',
  },
  {
    name: 'Premium',
    price: 25,
    features: [
      'All Pro features',
      'Personalized coaching',
      'Direct line to our team',
    ],
    color: 'yellow',
  },
];

export default function SubscribePage() {
  // Removed selectedPlan and setSelectedPlan as they were unused

  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (planName: string) => {
    setIsLoading(true);
    // Simulate async action
    setTimeout(() => {
      setIsLoading(false);
      alert(`Subscribed to ${planName}!`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Choose your plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 flex flex-col items-center shadow-md ${
              plan.name === 'Premium' ? 'border-yellow-400' : 'border-gray-200'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
            <div className="text-4xl font-bold mb-2">
              {plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className={`text-${plan.color}-500 mr-2 mt-0.5`}>
                    <Check className="h-5 w-5" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              disabled={isLoading}
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full ${
                plan.name === 'Premium'
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? 'Processing...' : 'Subscribe'}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-600">
        <p>
          You&apos;re not sure yet? That&apos;s okay! You can upgrade or downgrade your plan at any time.
        </p>
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          If you have questions, don&apos;t hesitate to contact our support team.
        </p>
      </div>
    </div>
  );
}
