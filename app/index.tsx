import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return <Redirect href="/(tabs)/Login" />;
}