// src/components/features/SubscriptionPlans.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { subscriptionPlans } from '@/lib/plans';
import { formatCurrency } from '@/utils/payment';
import { useRouter } from 'next/navigation';

interface SubscriptionPlansProps {
  currentPlan?: string;
}

export function SubscriptionPlans({ currentPlan = 'free' }: SubscriptionPlansProps) {
  const router = useRouter();

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') {
      // Handle free plan selection
      return;
    }

    try {
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: subscriptionPlans.find(p => p.id === planId)?.stripePriceId,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {subscriptionPlans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative overflow-hidden ${
            plan.id === 'premium' ? 'border-haitian-blue shadow-lg' : ''
          }`}
        >
          {plan.id === 'premium' && (
            <div className="absolute top-0 right-0">
              <Badge className="bg-haitian-blue text-white px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Most Popular
              </Badge>
            </div>
          )}
          
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              {plan.name}
              {plan.id === 'gold' && <Star className="h-5 w-5 text-haitian-gold fill-haitian-gold" />}
            </CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
              </span>
              {plan.price > 0 && (
                <span className="text-muted-foreground">/{plan.interval}</span>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              className="w-full"
              variant={plan.id === currentPlan ? 'secondary' : 'default'}
              disabled={plan.id === currentPlan}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.id === currentPlan ? 'Current Plan' : `Select ${plan.name}`}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}