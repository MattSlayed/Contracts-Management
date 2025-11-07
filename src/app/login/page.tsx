'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardContent } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-primary-accent p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">NOVATEK</h1>
          <p className="text-white/90 text-lg">Contract Manager</p>
        </div>

        {/* Login Card */}
        <Card variant="elevated">
          <CardContent>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-bold text-text-primary">Welcome Back</h2>
              <p className="text-text-secondary mt-1">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="john.doe@novatek.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                leftIcon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                leftIcon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-secondary">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary-accent">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                Don't have an account?{' '}
                <a href="#" className="text-primary hover:text-primary-accent font-medium">
                  Contact your administrator
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            © 2025 NOVATEK LLC (PTY) LTD. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <a href="#" className="text-white/70 hover:text-white">Privacy Policy</a>
            <span className="text-white/50">•</span>
            <a href="#" className="text-white/70 hover:text-white">Terms of Service</a>
            <span className="text-white/50">•</span>
            <a href="#" className="text-white/70 hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
