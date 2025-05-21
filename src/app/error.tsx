'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-haiti-blue to-haiti-red p-4">
      <div className="bg-black/30 backdrop-blur-md rounded-lg max-w-lg w-full p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-white/80 mb-6">
          We&#39;re sorry, but an error has occurred. Our team has been notified and we&#39;re working to fix the issue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-haiti-gold text-haiti-blue font-medium py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
          <Link href="/dashboard">
            <button className="bg-white/10 text-white font-medium py-2 px-6 rounded-lg">
              Go to Dashboard
            </button>
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-white/5 rounded text-left overflow-auto max-h-40">
            <pre className="text-red-400 text-xs">{error.message}</pre>
          </div>
        )}
      </div>
    </div>
  );
}