"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugAuthPage() {
  const { user, userProfile, loading, isAdmin, signOut } = useAuth();
  const [storageInfo, setStorageInfo] = useState(null);

  const checkBrowserStorage = () => {
    const info = {
      localStorage: {},
      sessionStorage: {},
      cookies: document.cookie
    };

    // Check localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('auth'))) {
        info.localStorage[key] = localStorage.getItem(key);
      }
    }

    // Check sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('auth'))) {
        info.sessionStorage[key] = sessionStorage.getItem(key);
      }
    }

    setStorageInfo(info);
  };

  const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    alert('All storage cleared! Refreshing page...');
    window.location.reload();
  };

  const forceSignOut = async () => {
    await signOut();
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-900 border-blue-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Authentication Debug Info</CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            <div>
              <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>User:</strong> {user ? user.email : 'None'}
            </div>
            <div>
              <strong>User Profile:</strong> {userProfile ? JSON.stringify(userProfile, null, 2) : 'None'}
            </div>
            <div>
              <strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-blue-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={checkBrowserStorage} className="bg-blue-600 hover:bg-blue-700">
              Check Browser Storage
            </Button>
            <Button onClick={clearAllStorage} className="bg-red-600 hover:bg-red-700">
              Clear All Storage
            </Button>
            <Button onClick={forceSignOut} className="bg-orange-600 hover:bg-orange-700">
              Force Sign Out
            </Button>
          </CardContent>
        </Card>

        {storageInfo && (
          <Card className="bg-slate-900 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Browser Storage Info</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(storageInfo, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}