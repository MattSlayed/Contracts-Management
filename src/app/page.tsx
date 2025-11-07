'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard (or login if not authenticated)
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-primary-accent">
      <Spinner size="lg" color="white" text="Loading NOVATEK Contract Manager..." />
    </div>
  );
}
