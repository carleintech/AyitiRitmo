'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Mail, Lock, User, Mic2, Heart, ArrowRight } from 'lucide-react';

const Register = () => {
  const [accountType, setAccountType] = useState<'fan' | 'artist'>('fan');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    artistName: '',
    genre: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 bg-slate-800/80 backdrop-blur-sm border-white/10">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <Music className="h-8 w-8 text-haiti-red" />
          <span className="text-2xl font-bold neon-text">AyitiRitmo</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Join AyitiRitmo</h1>
          <p className="text-white/60">Start your journey in Haitian music</p>
        </div>

        {/* Account Type Selection */}
        <Tabs value={accountType} onValueChange={(value) => setAccountType(value as 'fan' | 'artist')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="fan" className="data-[state=active]:bg-haiti-blue">
              <Heart className="h-4 w-4 mr-2" />
              Music Fan
            </TabsTrigger>
            <TabsTrigger value="artist" className="data-[state=active]:bg-haiti-red">
              <Mic2 className="h-4 w-4 mr-2" />
              Artist
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 text-center text-sm text-white/60">
            <TabsContent value="fan">
              Access unlimited music, support artists, and join the community
            </TabsContent>
            <TabsContent value="artist">
              Share your music, build your fanbase, and earn from your art
            </TabsContent>
          </div>
        </Tabs>

        {/* Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          {accountType === 'artist' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="artistName" className="text-white">Artist Name</Label>
                <div className="relative">
                  <Mic2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    id="artistName"
                    name="artistName"
                    type="text"
                    placeholder="Enter your stage name"
                    value={formData.artistName}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-white">Primary Genre</Label>
                <Input
                  id="genre"
                  name="genre"
                  type="text"
                  placeholder="e.g., Konpa, Zouk, Rap Kreyòl"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1 rounded border-white/10 bg-white/5" 
              required 
            />
            <Label htmlFor="terms" className="text-sm text-white/60">
              I agree to the{' '}
              <Link href="/terms" className="text-haiti-blue hover:text-haiti-red">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-haiti-blue hover:text-haiti-red">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full bg-haiti-red hover:bg-haiti-red/90">
            Create Account
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-haiti-blue hover:text-haiti-red font-medium">
            Sign in
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default Register;