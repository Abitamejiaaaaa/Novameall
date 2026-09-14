import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { useColorScheme } from '../hooks/use-color-scheme';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Al dejar el Stack vacío, Expo Router reconoce automáticamente todos tus archivos .tsx de la carpeta app */}
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}