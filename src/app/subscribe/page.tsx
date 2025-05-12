'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SubscriptionPlans } from '@/components/features/SubscriptionPlans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface UserSubscription {
  id: string;
  plan: string;
  status: string;
  currentPeriodEnd: string;
}

export default function SubscribePage() {
  const { data: session } = useSession();
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, [session]);

  const fetchSubscription = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch('/api/payments/subscription');
      if (response.ok) {
        const data = await response.json();
        setCurrentSubscription(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-haitian-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-haitian-red to-haitian-blue bg-clip-text text-transparent">
          Choose Your AyitiRitmo Experience
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock premium features and support your favorite Haitian artists
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Subscription</span>
              <Badge 
                variant={currentSubscription.status === 'active' ? 'default' : 'destructive'}
              >
                {currentSubscription.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{currentSubscription.plan} Plan</p>
                <p className="text-sm text-muted-foreground">
                  {currentSubscription.status === 'active' ? 
                    `Renews on ${new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}` :
                    'Subscription is not active'
                  }
                </p>
              </div>
              <Link href="/dashboard/subscription">
                <Button variant="outline">Manage Subscription</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Select Your Plan</h2>
        <SubscriptionPlans currentPlan={currentSubscription?.plan || 'free'} />
      </div>

      {/* Benefits Overview */}
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        <Card className="p-6 text-center">
          <Music className="h-12 w-12 mx-auto text-haitian-blue mb-4" />
          <h3 className="font-bold mb-2">Premium Audio</h3>
          <p className="text-sm text-muted-foreground">
            Enjoy high-quality audio and exclusive releases from top Haitian artists
          </p>
        </Card>

        <Card className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto text-haitian-red mb-4" />
          <h3 className="font-bold mb-2">Artist Support</h3>
          <p className="text-sm text-muted-foreground">
            Directly support artists with your subscription and optional tips
          </p>
        </Card>

        <Card className="p-6 text-center">
          <DollarSign className="h-12 w-12 mx-auto text-haitian-gold mb-4" />
          <h3 className="font-bold mb-2">Value for Money</h3>
          <p className="text-sm text-muted-foreground">
            Get access to exclusive content, events, and merchandise
          </p>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 bg-gradient-to-r from-haitian-blue/10 to-haitian-red/10 p-8 rounded-lg">
        <h2 className="text-2xl font-bold">Start Supporting Haitian Music Today</h2>
        <p className="text-muted-foreground">
          Join thousands of fans celebrating Haitian culture and empowering artists
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg">Explore Music</Button>
          </Link>
          <Link href="/artists">
            <Button size="lg" variant="outline">Browse Artists</Button>
          </Link>
        </div>
      </div>

      {/* FAQ or Additional Info */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="border rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">Can I cancel anytime?</summary>
            <p className="mt-2 text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.
            </p>
          </details>
          
          <details className="border rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">How does artist support work?</summary>
            <p className="mt-2 text-muted-foreground">
              A portion of your subscription goes directly to artists based on your listening habits. You can also send direct tips and purchase merchandise to support your favorite artists.
            </p>
          </details>
          
          <details className="border rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">Is there a free trial?</summary>
            <p className="mt-2 text-muted-foreground">
              New users get a 7-day free trial of Premium features. You can upgrade to Premium or Gold at any time during or after the trial.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}