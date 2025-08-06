"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, CheckCircle, XCircle, ArrowLeft, AlertCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function AccessRequestPage() {
  const { user, userProfile, isAdmin, hasRequestedAdmin, canRequestAdmin, requestAdminAccess, loading, fetchUserProfile } = useAuth();
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Debug logging
  useEffect(() => {
    console.log('Access Request Page - Debug Info:', {
      user: user?.email,
      userProfile,
      isAdmin,
      hasRequestedAdmin,
      canRequestAdmin,
      loading
    });
  }, [user, userProfile, isAdmin, hasRequestedAdmin, canRequestAdmin, loading]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    } else if (isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [user, isAdmin, loading, router]);

  const handleRequestAccess = async () => {
    setRequesting(true);
    setError('');

    const { error: requestError } = await requestAdminAccess();
    
    if (requestError) {
      setError(requestError.message);
    }
    
    setRequesting(false);
  };

  const handleFixProfile = async () => {
    if (!user) return;
    
    setRequesting(true);
    setError('');

    try {
      // Update the user profile to ensure proper defaults
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          full_name: user.user_metadata?.full_name || user.email,
          admin_request_status: 'none'
        })
        .eq('id', user.id);

      if (updateError) {
        setError(updateError.message);
      } else {
        // Refresh the profile
        await fetchUserProfile(user.id);
      }
    } catch (error) {
      setError(error.message);
    }
    
    setRequesting(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  const getStatusInfo = () => {
    if (isAdmin) {
      return {
        icon: CheckCircle,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-600/20',
        borderColor: 'border-emerald-500/20',
        status: 'Approved',
        message: 'You have admin access! You can now manage the blog.'
      };
    }

    if (userProfile?.admin_request_status === 'pending') {
      return {
        icon: Clock,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-600/20',
        borderColor: 'border-yellow-500/20',
        status: 'Pending',
        message: 'Your admin access request is pending review. You will be notified once it has been processed.'
      };
    }

    if (userProfile?.admin_request_status === 'rejected') {
      return {
        icon: XCircle,
        color: 'text-red-400',
        bgColor: 'bg-red-600/20',
        borderColor: 'border-red-500/20',
        status: 'Rejected',
        message: 'Your admin access request was not approved. Please contact support if you believe this is an error.'
      };
    }

    return {
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/20',
      borderColor: 'border-blue-500/20',
      status: 'Not Requested',
      message: 'Request admin access to manage blog content and site administration.'
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform">
              Flow <span className="text-blue-400">Immersive</span>
            </Link>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link href="/admin/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
              <Link href="/">
                <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeInUp}>
            <Card className="bg-slate-900 border-blue-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white flex items-center justify-center gap-3 mb-2">
                  <Shield className="w-8 h-8 text-blue-400" />
                  Admin Access
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your admin access request status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Info */}
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <h3 className="text-white font-semibold mb-3">Account Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{userProfile?.full_name || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Role:</span>
                      <span className="text-white capitalize">{userProfile?.role || 'user'}</span>
                    </div>
                  </div>
                </div>

                {/* Status Card */}
                <Card className={`${statusInfo.bgColor} ${statusInfo.borderColor}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Access Status
                        </h3>
                        <Badge variant="secondary" className={`${statusInfo.bgColor} ${statusInfo.color} border-0 mt-1`}>
                          {statusInfo.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {statusInfo.message}
                    </p>

                    {userProfile?.admin_requested_at && (
                      <p className="text-sm text-gray-400">
                        Requested on: {new Date(userProfile.admin_requested_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  {/* Debug info */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-gray-500 bg-slate-800 p-2 rounded">
                      <div>canRequestAdmin: {canRequestAdmin?.toString()}</div>
                      <div>admin_request_status: {userProfile?.admin_request_status}</div>
                      <div>userProfile exists: {userProfile ? 'yes' : 'no'}</div>
                    </div>
                  )}

                  {canRequestAdmin && (
                    <>
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
                        onClick={handleRequestAccess}
                        disabled={requesting}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3"
                      >
                        {requesting ? 'Submitting Request...' : 'Request Admin Access'}
                      </Button>
                    </>
                  )}

                  {/* Fallback button if profile isn't loaded properly */}
                  {!canRequestAdmin && !hasRequestedAdmin && !isAdmin && userProfile && (
                    <Button
                      onClick={handleRequestAccess}
                      disabled={requesting}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3"
                    >
                      {requesting ? 'Submitting Request...' : 'Request Admin Access'}
                    </Button>
                  )}

                  {/* Fix profile button for debugging */}
                  {userProfile && (userProfile.full_name === 'Not provided' || !userProfile.admin_request_status) && (
                    <Button
                      onClick={handleFixProfile}
                      disabled={requesting}
                      variant="outline"
                      className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    >
                      {requesting ? 'Fixing Profile...' : 'Fix Profile Data'}
                    </Button>
                  )}

                  {isAdmin && (
                    <Link href="/admin/dashboard">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3">
                        Access Admin Dashboard
                      </Button>
                    </Link>
                  )}

                  <div className="flex gap-3">
                    <Link href="/admin/login" className="flex-1">
                      <Button variant="outline" className="w-full border-slate-600 text-gray-300 hover:bg-slate-800">
                        Sign Out & Login Different Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information Card */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-slate-900/50 border-blue-500/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-white mb-4 text-center">What can admins do?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <h5 className="font-semibold text-blue-400 mb-2">Blog Management</h5>
                    <ul className="space-y-1">
                      <li>• Create and edit blog posts</li>
                      <li>• Upload and manage images</li>
                      <li>• Publish and unpublish content</li>
                      <li>• Write in Markdown with live preview</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-400 mb-2">Content Control</h5>
                    <ul className="space-y-1">
                      <li>• Manage featured images</li>
                      <li>• SEO optimization</li>
                      <li>• Draft and scheduled publishing</li>
                      <li>• Content moderation</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-xs text-gray-400 text-center">
                    Admin access is granted manually to ensure security. 
                    Please allow 24-48 hours for review.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}