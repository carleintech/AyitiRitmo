'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const NomineesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-3xl font-bold text-white">2024 Nominees</h1>
      <p className="text-white/60">Meet the artists nominated this year.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4 bg-slate-800 hover:bg-slate-700 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-haiti-red/20 rounded-full">
                <Star className="h-5 w-5 text-haiti-red" />
              </div>
              <div>
                <h4 className="font-medium text-white">Nominee {i + 1}</h4>
                <p className="text-sm text-white/60">Nominated for: Best Album</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default NomineesPage;
