import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { useAuth } from '../hooks/useAuth';
import { useColorScheme } from '../hooks/use-color-scheme';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Always render the tabs group - auth gating happens inside tabs layout */}
          <Stack.Screen name="(tabs)" />
          
          {/* Dynamic routes that exist outside tabs */}
          <Stack.Screen name="chat/[chatId]" />
          <Stack.Screen name="restaurant-chat/[orderId]" />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </ErrorBoundary>
  );
}