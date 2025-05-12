// src/utils/payment.ts
export function calculateArtistRevenue(amount: number, artistRevenuShare: number = 0.7): {
  artistRevenue: number;
  platformFee: number;
} {
  const platformFee = amount * (1 - artistRevenuShare);
  const artistRevenue = amount - platformFee;
  
  return {
    artistRevenue: Math.round(artistRevenue * 100) / 100,
    platformFee: Math.round(platformFee * 100) / 100,
  };
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}