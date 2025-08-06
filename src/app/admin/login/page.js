"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, LogIn, ArrowLeft } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we have a confirmed user and the auth context is not loading
    if (user && !authLoading) {
      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/access-request');
      }
    }
  }, [user, isAdmin, router, authLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await signIn(email, password);
    
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    }
    // Success handling is done in useEffect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform">
              Flow <span className="text-blue-400">Immersive</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 px-6">
        <div className="max-w-md mx-auto">
          <motion.div {...fadeInUp}>
            <Card className="bg-slate-900 border-blue-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white flex items-center justify-center gap-3 mb-2">
                  <LogIn className="w-8 h-8 text-blue-400" />
                  Admin Login
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Sign in to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@flowimmersive.com"
                      required
                      className="bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm bg-red-950/50 p-3 rounded-lg border border-red-500/20"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Don't have admin access?{' '}
                    <Link href="/admin/register" className="text-blue-400 hover:text-blue-300 underline">
                      Register here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-slate-900/50 border-blue-500/20">
              <CardContent className="pt-6">
                <div className="text-center text-gray-400 text-sm">
                  <p className="mb-2">New to Flow Immersive Admin?</p>
                  <p>Register for an account and request admin access.</p>
                  <p className="mt-2 text-xs">Admin approval is required for access.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}