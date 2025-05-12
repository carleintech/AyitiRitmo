// src/app/api/payments/webhook/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        // Get the checkout session to find the user
        const checkoutSession = await stripe.checkout.sessions.retrieve(
          subscription.metadata?.checkout_session_id || ''
        );

        const userId = checkoutSession.metadata?.userId;
        
        if (!userId) {
          console.error('No userId found in metadata');
          break;
        }

        // Update or create subscription in database
        await prisma.subscription.upsert({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          update: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
          create: {
            userId,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Cancel subscription in database
        await prisma.subscription.update({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            status: 'canceled',
          },
        });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        
        if (invoice.subscription) {
          // Update payment status
          await prisma.payment.create({
            data: {
              stripePaymentIntentId: invoice.payment_intent as string,
              amount: invoice.amount_paid / 100,
              currency: invoice.currency,
              status: 'succeeded',
              type: 'subscription',
              userId: invoice.customer_email ? 
                (await prisma.user.findUnique({
                  where: { email: invoice.customer_email },
                }))?.id || '' : '',
            },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}