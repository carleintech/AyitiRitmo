"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface AuthenticationFormProps {
  mode: 'signin' | 'signup';
  setCurrentView: (view: string) => void;
}

export default function AuthenticationForm({ mode, setCurrentView }: AuthenticationFormProps) {
  const { login, signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isArtist, setIsArtist] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (mode === 'signin') {
        await login(email, password);
      } else {
        await signup(name, email, password, isArtist);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-black/30 backdrop-blur-md rounded-lg p-6 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {mode === 'signin' ? 'Welcome Back' : 'Join AyitiRitmo'}
      </h2>
      
      {error && (
        <div className="bg-haiti-red/20 border border-haiti-red/30 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-white text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>
        )}
        
        <div>
          <label className="block text-white text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-haiti-gold focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>
        
        {mode === 'signup' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isArtist"
              checked={isArtist}
              onChange={(e) => setIsArtist(e.target.checked)}
              className="h-4 w-4 text-haiti-gold focus:ring-haiti-gold rounded"
            />
            <label htmlFor="isArtist" className="ml-2 block text-white text-sm">
              I am an artist
            </label>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-haiti-blue to-haiti-red text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
            </>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          onClick={() => setCurrentView(mode === 'signin' ? 'signup' : 'signin')}
          className="text-haiti-gold hover:underline text-sm"
        >
          {mode === 'signin' 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"}
        </button>
      </div>
      
      <div className="mt-6">
        <button
          onClick={() => setCurrentView('welcome')}
          className="flex items-center justify-center w-full text-white/70 hover:text-white text-sm"
        >
          <span>Back to Welcome</span>
        </button>
      </div>
    </motion.div>
  );
}