# scripts/setup-stripe-production.sh

#!/bin/bash

# Install Stripe CLI
curl -s https://packages.stripe.com/api/security/keypairs/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-deb stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe

# Login to Stripe
stripe login

# Create products and prices
stripe products create \
  --name="AyitiRitmo Premium" \
  --description="Ad-free music streaming with offline playback" \
  --active=true

stripe prices create \
  --product=prod_XXXXX \
  --unit-amount=500 \
  --currency=usd \
  --recurring="interval=month" \
  --active=true

stripe products create \
  --name="AyitiRitmo Gold" \
  --description="Premium features plus exclusive content and fan perks" \
  --active=true

stripe prices create \
  --product=prod_YYYYY \
  --unit-amount=1000 \
  --currency=usd \
  --recurring="interval=month" \
  --active=true

# Create webhook endpoint
stripe listen --forward-to https://your-domain.com/api/payments/webhook

# Test webhook delivery
stripe trigger checkout.session.completed

# scripts/verify-stripe-setup.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

async function verifyStripeSetup() {
  try {
    // Verify API keys
    const account = await stripe.accounts.retrieve();
    console.log('✓ Stripe account connected:', account.display_name);

    // Verify products
    const products = await stripe.products.list({ active: true });
    console.log('✓ Products found:', products.data.length);

    // Verify prices
    const prices = await stripe.prices.list({ active: true });
    console.log('✓ Active prices:', prices.data.length);

    // Verify webhook endpoints
    const webhooks = await stripe.webhookEndpoints.list();
    console.log('✓ Webhook endpoints:', webhooks.data.length);

    // Test payment intent creation
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    console.log('✓ Payment intent test successful');

    return true;
  } catch (error) {
    console.error('✗ Stripe setup error:', error);
    return false;
  }
}

verifyStripeSetup();