'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Music, Mail, Lock, Github, Chrome, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: '/dashboard' });
    setIsLoading(false);
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
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to continue to AyitiRitmo</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={() => handleOAuthSignIn('google')}
            disabled={isLoading}
          >
            <Chrome className="h-4 w-4 mr-2" />
            Continue with Google
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={() => handleOAuthSignIn('github')}
            disabled={isLoading}
          >
            <Github className="h-4 w-4 mr-2" />
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-800 px-2 text-white/60">or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-white/10 bg-white/5" />
              <span className="text-sm text-white/60">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-haiti-blue hover:text-haiti-red">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-haiti-red hover:bg-haiti-red/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/60">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-haiti-blue hover:text-haiti-red font-medium">
            Sign up
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default Login;