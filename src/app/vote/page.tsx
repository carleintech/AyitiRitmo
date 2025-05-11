'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

const VotePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-3xl font-bold text-white">Vote for Your Favorites</h1>
      <p className="text-white/60">Select your favorite nominees below.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['nominee1', 'nominee2', 'nominee3', 'nominee4', 'nominee5', 'nominee6'].map((nominee, i) => (
          <Card key={nominee} className="p-4 bg-slate-800 hover:bg-slate-700 transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold mb-1">Nominee {i + 1}</h4>
                <p className="text-sm text-white/60">Category: Best Konpa Song</p>
              </div>
              <ArrowRight className="text-white/50" />
            </div>
          </Card>
        ))}
      </div>
      <Button className="bg-haiti-red text-white hover:bg-haiti-red/90">
        <CheckCircle className="h-4 w-4 mr-2" />
        Submit Vote
      </Button>
    </motion.div>
  );
};

export default VotePage;