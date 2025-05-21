'use client';

import Link from 'next/link';
// Removed: import { useEffect } from 'react';
// Removed: import { useRouter } from 'next/navigation';

export default function NotFound() {
  // Removed: const router = useRouter();

  // Removed: Automatically redirect after 5 seconds
  // Removed: useEffect(() => {
  // Removed:   const redirectTimer = setTimeout(() => {
  // Removed:     router.push('/dashboard');
  // Removed:   }, 5000);
  // Removed:
  // Removed:   return () => clearTimeout(redirectTimer);
  // Removed: }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-haiti-blue to-haiti-red p-4">
      <div className="bg-black/30 backdrop-blur-md rounded-lg max-w-lg w-full p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <div className="text-8xl mb-6 opacity-30">♫</div>
        <p className="text-white/80 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Modified: Use Link instead of button for "Go Back" */}
          <Link href="#" onClick={() => window.history.back()} className="bg-haiti-gold text-haiti-blue font-medium py-2 px-6 rounded-lg inline-block">
            Go Back
          </Link>
          <Link href="/dashboard">
            <button className="bg-white/10 text-white font-medium py-2 px-6 rounded-lg">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
