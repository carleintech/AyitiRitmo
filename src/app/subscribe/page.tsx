'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check,
  X,
  Music,
  Download,
  Heart,
  Star,
  Trophy,
  Sparkles
} from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Basic access with ads',
    features: [
      { name: 'Access to music library', included: true },
      { name: 'Basic playlists', included: true },
      { name: 'Shuffle play', included: true },
      { name: 'Ads between songs', included: true, isNegative: true },
      { name: 'Limited skips', included: true },
      { name: 'Offline downloads', included: false },
      { name: 'HD audio quality', included: false },
      { name: 'Exclusive content', included: false },
    ],
  },
  {
    name: 'Plus',
    price: '5',
    description: 'Ad-free listening experience',
    highlighted: true,
    features: [
      { name: 'Ad-free listening', included: true },
      { name: 'Unlimited skips', included: true },
      { name: 'Offline downloads', included: true },
      { name: 'High quality audio', included: true },
      { name: 'Custom playlists', included: true },
      { name: 'Early releases', included: false },
      { name: 'Fan club access', included: false },
      { name: 'Artist merchandise discounts', included: false },
    ],
  },
  {
    name: 'Gold',
    price: '10',
    description: 'Premium experience with exclusive perks',
    features: [
      { name: 'Everything in Plus', included: true },
      { name: 'HD audio quality', included: true },
      { name: 'Fan club access', included: true },
      { name: 'Early releases', included: true },
      { name: 'Exclusive content', included: true },
      { name: 'Artist meet & greets', included: true },
      { name: 'Merchandise discounts (20%)', included: true },
      { name: 'Concert ticket presales', included: true },
    ],
  },
  {
    name: 'Artist Pro',
    price: '20',
    description: 'Complete toolkit for Haitian artists',
    features: [
      { name: 'Everything in Gold', included: true },
      { name: 'Studio tools', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Music distribution', included: true },
      { name: 'Marketing tools', included: true },
      { name: 'Revenue optimization', included: true },
      { name: 'Sync licensing', included: true },
      { name: 'Dedicated support', included: true },
    ],
  },
];

const Subscribe = () => {
  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Choose Your AyitiRitmo Experience
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          From free access to premium tools for artists - find the perfect plan for you
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className={`relative overflow-hidden ${
                plan.highlighted 
                  ? 'border-haiti-red shadow-lg shadow-haiti-red/20 bg-gradient-to-b from-slate-800 to-slate-900' 
                  : 'bg-slate-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-haiti-red text-white px-4 py-1 text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                {/* Plan Name and Price */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-white/60">/month</span>
                  </div>
                  <p className="text-sm text-white/60">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className={`h-5 w-5 mt-0.5 ${feature.isNegative ? 'text-yellow-500' : 'text-green-500'}`} />
                      ) : (
                        <X className="h-5 w-5 mt-0.5 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        feature.included 
                          ? feature.isNegative ? 'text-yellow-400' : 'text-white' 
                          : 'text-white/40'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-haiti-red hover:bg-haiti-red/90' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.price === '0' ? 'Get Started Free' : 'Subscribe Now'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-8">Why Subscribe to AyitiRitmo?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-haiti-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-haiti-red" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Support Haitian Artists</h3>
            <p className="text-white/60">Your subscription directly supports Haitian musicians and helps preserve our culture</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-haiti-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="h-8 w-8 text-haiti-blue" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Exclusive Content</h3>
            <p className="text-white/60">Get access to exclusive tracks, behind-the-scenes content, and early releases</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-haiti-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-haiti-gold" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Cultural Experience</h3>
            <p className="text-white/60">Join our community celebrating Haitian culture through music, art, and events</p>
          </div>
        </div>
      </motion.div>

      {/* Money Back Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center bg-slate-800/50 rounded-lg p-6"
      >
        <div className="flex items-center justify-center gap-2 text-haiti-gold mb-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-semibold">30-Day Money Back Guarantee</span>
        </div>
        <p className="text-white/60">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
      </motion.div>
    </div>
  );
};

export default Subscribe;