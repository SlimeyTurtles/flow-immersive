"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId, retryCount = 0) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('Supabase response - data:', data, 'error:', error);

      if (error) {
        if (error.code === 'PGRST116' && retryCount < 3) {
          // Profile not found, might be still creating - retry after delay
          console.log('User profile not found, retrying...', retryCount + 1);
          setTimeout(() => fetchUserProfile(userId, retryCount + 1), 1000);
          return;
        }
        console.error('Error fetching user profile:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return;
      }

      console.log('User profile fetched successfully:', data);
      setUserProfile(data);
    } catch (error) {
      console.error('Catch block error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
  };

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    // If signup successful, ensure user profile is created
    if (!error && data.user) {
      // Wait a bit for the trigger to run, then check if profile exists
      setTimeout(async () => {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it manually
          console.log('Creating user profile manually...');
          await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              email: email,
              full_name: fullName || email
            });
        } else if (profile && !profile.full_name) {
          // Profile exists but full_name is null, update it
          console.log('Updating user profile with full_name...');
          await supabase
            .from('user_profiles')
            .update({ full_name: fullName || email })
            .eq('id', data.user.id);
        }
      }, 1500);
    }

    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      // Always clear local state regardless of error
      setUser(null);
      setUserProfile(null);
      setLoading(false);
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      // Still clear local state even on error
      setUser(null);
      setUserProfile(null);
      setLoading(false);
      return { error };
    }
  };

  const requestAdminAccess = async () => {
    if (!user || !userProfile) return { error: 'Not authenticated' };

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        admin_request_status: 'pending',
        admin_requested_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (!error) {
      setUserProfile(data);
    }

    return { data, error };
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: 'Not authenticated' };

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (!error) {
      setUserProfile(data);
    }

    return { data, error };
  };

  const isAdmin = userProfile?.is_admin_approved && ['admin', 'super_admin'].includes(userProfile?.role);
  const isSuperAdmin = userProfile?.role === 'super_admin' && userProfile?.is_admin_approved;
  const hasRequestedAdmin = userProfile?.admin_request_status === 'pending';
  const canRequestAdmin = userProfile?.admin_request_status === 'none';

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    requestAdminAccess,
    updateProfile,
    fetchUserProfile,
    isAdmin,
    isSuperAdmin,
    hasRequestedAdmin,
    canRequestAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};