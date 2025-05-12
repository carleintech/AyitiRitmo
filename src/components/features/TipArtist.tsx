// src/components/features/TipArtist.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/payment';
import { useToast } from '@/components/ui/use-toast';

interface TipArtistProps {
  artistId: string;
  artistName: string;
}

const tipAmounts = [5, 10, 25, 50, 100];

export function TipArtist({ artistId, artistName }: TipArtistProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTip = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please select or enter a valid tip amount.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      // Create payment intent
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          type: 'tip',
          artistId,
        }),
      });

      const { clientSecret, paymentIntentId } = await response.json();
      
      // Here you would integrate with Stripe Elements to handle the payment
      // For now, we'll simulate a successful payment
      
      // Confirm payment after Stripe Elements confirms
      const confirmResponse = await fetch('/api/payments/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
        }),
      });

      if (confirmResponse.ok) {
        toast({
          title: 'Thank you!',
          description: `Your ${formatCurrency(amount)} tip was sent to ${artistName}!`,
        });
        
        // Reset form
        setSelectedAmount(null);
        setCustomAmount('');
      }
    } catch (error) {
      console.error('Error sending tip:', error);
      toast({
        title: 'Error',
        description: 'Failed to send tip. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-haitian-red" />
          Tip {artistName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preset amounts */}
        <div className="grid grid-cols-3 gap-2">
          {tipAmounts.map((amount) => (
            <Button
              key={amount}
              variant={selectedAmount === amount ? 'default' : 'outline'}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className="flex items-center gap-1"
            >
              <DollarSign className="h-3 w-3" />
              {amount}
            </Button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className="w-full pl-9 pr-4 py-2 border rounded-md"
          />
        </div>

        {/* Tip button */}
        <Button
          className="w-full bg-haitian-red hover:bg-haitian-red/90"
          onClick={handleTip}
          disabled={loading || (!selectedAmount && !customAmount)}
        >
          {loading ? 'Processing...' : `Send Tip ${
            selectedAmount ? formatCurrency(selectedAmount) : 
            customAmount ? formatCurrency(parseFloat(customAmount)) : ''
          }`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          70% goes directly to the artist, 30% covers platform fees
        </p>
      </CardContent>
    </Card>
  );
}