# vercel.json (updated for production)
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "AWS_ACCESS_KEY_ID": "@aws_access_key_id",
    "AWS_SECRET_ACCESS_KEY": "@aws_secret_access_key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com; frame-src https://js.stripe.com;"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/stripe/webhook",
      "destination": "/api/payments/webhook"
    }
  ]
}

# .vercelignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
node_modules
.next
.git
*.log
coverage
.vercel
out

# scripts/deploy-to-vercel.sh
#!/bin/bash

# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add STRIPE_SECRET_KEY production
vercel env add AWS_ACCESS_KEY_ID production
vercel env add AWS_SECRET_ACCESS_KEY production

# Run pre-deployment checks
echo "Running pre-deployment checks..."
pnpm run type-check
pnpm run lint
pnpm run test

# Build and deploy
echo "Building and deploying to production..."
vercel --prod

# Verify deployment
echo "Verifying deployment..."
curl -I https://your-domain.com/api/health

# Run post-deployment tasks
scripts/post-deployment.sh

# scripts/post-deployment.sh
#!/bin/bash

# Wait for deployment to be available
sleep 30

# Run database migrations
pnpm run db:migrate:deploy

# Verify all services are running
echo "Verifying deployment..."

# Check main app
curl -s https://your-domain.com | grep -q "AyitiRitmo" && echo "✓ Main app is live"

# Check API endpoint
curl -s https://your-domain.com/api/health | grep -q "ok" && echo "✓ API is responding"

# Check Stripe webhook
stripe listen --forward-to https://your-domain.com/api/payments/webhook &
sleep 5
stripe trigger checkout.session.completed
pkill stripe

# Send deployment notification
curl -X POST "https://hooks.slack.com/services/YOUR/WEBHOOK/URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "🚀 AyitiRitmo production deployment successful!",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*AyitiRitmo Production Deployment* ✅\n\nDeployment completed successfully at $(date)"
        }
      }
    ]
  }'

echo "Deployment verification complete!"