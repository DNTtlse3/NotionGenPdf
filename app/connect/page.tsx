'use client';


import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LoadingSpinner } from '@/app/ui/loading-spinner';
import { Button } from '@/app/ui/button';
import { buildUrl } from '@/app/connect/service';

export default function ConnectPage() {
  const [error, setError] = useState<string | null>(null);
  const initiated = useRef(false);

  useEffect(() => {
    if (initiated.current) return;
    initiated.current = true;

    (async () => {
      try {
        const url = await buildUrl();
        if (url) {
          window.location.href = url;
        }
      } catch (err) {
        setError("Failed to start the connection flow. Please try again.");
      }
    })();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full flex flex-col items-center gap-6">
        {error ? (
          <>
            <p className="text-sm text-red-500 text-center">{error}</p>
            
            {/* Correction de l'événement onClick standard (onRetry n'existe pas de base) */}
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>

            <Link href="/" passHref>
              {/* Utilisation de la syntaxe standard des composants enfants de Next.js */}
              <Button>Back</Button>
            </Link>
          </>
        ) : (
          <>
            <LoadingSpinner size="lg" label="Redirecting to Notion…" />
            <p className="text-xs text-neutral-600 text-center">
              You'll be asked to authorize access to your workspace.
            </p>
          </>
        )}
      </div>
    </main>
  );
}