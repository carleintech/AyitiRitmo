// src/app/api/payments/confirm-payment/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { calculateArtistRevenue } from '@/utils/payment';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { paymentIntentId } = await request.json();
    
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not successful' },
        { status: 400 }
      );
    }

    // Process payment based on type
    const { type, userId, artistId, items } = paymentIntent.metadata!;
    const amount = paymentIntent.amount / 100; // Convert from cents

    // Create payment record
    await prisma.payment.create({
      data: {
        stripePaymentIntentId: paymentIntentId,
        userId,
        amount,
        currency: paymentIntent.currency,
        status: 'succeeded',
        type,
      },
    });

    // If it's a tip or artist payment, calculate and record artist revenue
    if (artistId && (type === 'tip' || type === 'merchandise')) {
      const { artistRevenue, platformFee } = calculateArtistRevenue(amount);
      
      await prisma.artistRevenue.create({
        data: {
          artistId,
          paymentId: paymentIntentId,
          amount: artistRevenue,
          platformFee,
          type,
        },
      });
    }

    // If it's merchandise, create order
    if (type === 'merchandise' && items) {
      const parsedItems = JSON.parse(items);
      
      await prisma.order.create({
        data: {
          userId,
          artistId: artistId || '',
          total: amount,
          status: 'paid',
          items: {
            create: parsedItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}