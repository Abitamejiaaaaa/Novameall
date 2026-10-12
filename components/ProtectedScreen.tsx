import React from 'react';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from './LoadingScreen';

interface ProtectedScreenProps {
  children: React.ReactNode;
  fallbackRoute?: string;
}

export default function ProtectedScreen({
  children,
  fallbackRoute = '/Login',
}: ProtectedScreenProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(fallbackRoute as any);
    }
  }, [user, loading, router, fallbackRoute]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}