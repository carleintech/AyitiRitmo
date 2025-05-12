'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Mail, Lock, User, Mic2, Heart, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'FAN' | 'ARTIST'>('FAN');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    artistName: '',
    genres: [''],
    bio: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGenreChange = (index: number, value: string) => {
    const newGenres = [...formData.genres];
    newGenres[index] = value;
    setFormData(prev => ({ ...prev, genres: newGenres }));
  };

  const addGenre = () => {
    setFormData(prev => ({ ...prev, genres: [...prev.genres, ''] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: accountType,
        ...(accountType === 'ARTIST' && {
          artistData: {
            artistName: formData.artistName,
            genres: formData.genres.filter(g => g.trim() !== ''),
            bio: formData.bio,
          }
        })
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to login
      router.push('/auth/login?registered=true');
    } catch (error: any) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Account Type Selection */}
        <Tabs value={accountType} onValueChange={(value) => setAccountType(value as 'FAN' | 'ARTIST')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="FAN" className="data-[state=active]:bg-haiti-blue">
              <Heart className="h-4 w-4 mr-2" />
              Music Fan
            </TabsTrigger>
            <TabsTrigger value="ARTIST" className="data-[state=active]:bg-haiti-red">
              <Mic2 className="h-4 w-4 mr-2" />
              Artist
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 text-center text-sm text-white/60">
            <TabsContent value="FAN">
              Access unlimited music, support artists, and join the community
            </TabsContent>
            <TabsContent value="ARTIST">
              Share your music, build your fanbase, and earn from your art
            </TabsContent>
          </div>
        </Tabs>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                  disabled={isLoading}
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
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {accountType === 'ARTIST' && (
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
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Genres</Label>
                {formData.genres.map((genre, index) => (
                  <Input
                    key={index}
                    name={`genre-${index}`}
                    value={genre}
                    onChange={(e) => handleGenreChange(index, e.target.value)}
                    placeholder="e.g., Konpa, Zouk, Rap Kreyòl"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    disabled={isLoading}
                  />
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addGenre}
                  disabled={isLoading}
                >
                  Add Genre
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full h-20 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-haiti-blue/50"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                  disabled={isLoading}
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
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              title="Agree to terms and privacy policy"
              className="mt-1 rounded border-white/10 bg-white/5" 
              required 
              disabled={isLoading}
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

          <Button type="submit" className="w-full bg-haiti-red hover:bg-haiti-red/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
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