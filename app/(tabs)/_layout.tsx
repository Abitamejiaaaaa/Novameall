import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  // Define which tabs to show based on auth state
  // All tabs are registered (href: null) so router.push works,
  // but we control visibility via the tab bar
  const authTabs = [
    'Login',
    'Iniciar',
    'Registrarse',
    'Olividar',
    'OlividaRR',
    'tTERMINOS',
    'POLITICAS',
    'Queres',
    'OnboardingWelcome',
    'OnboardingLocation',
    'OnboardingPreferences',
  ];

  const appTabs = [
    'Home',
    'CATEGORIAS',
    'ALMUERZOS',
    'CHAT',
    'CONFIGURACION-NARANJA',
    'CONFIGURACIpN-PERFIL',
    'inbox',
    'mapa',
    'restaurant-order',
    'MEXICANA',
    'Americano',
    'Desayunos',
    'Almuerzo',
    'cena',
    'Vegan',
    'COSITAS',
    'NUESES',
    'Nuggets',
    'Nachos',
    'Wraps',
    'TOSTADAS',
    'Tipico',
    'Arros',
    'Espagueti',
    'pizza',
    'Carne',
    'pollo-asado',
    'pupusas',
    'quesadilla',
    'Sandwiche',
    'salah',
    'flan',
    'budin',
    'cake',
    'pie',
    'Galletas',
    'postre',
    'Restaurante',
    'Restaurante2',
    'Restaurante Hamburguesa',
    'Restaurante copy Espaqueti',
    'Restaurante copy Pizza',
    'Restaurante copy Pollo',
    'Zumitos',
    'Horchata',
    'Jamaica',
    'Rollos',
    'Tamarindo',
    'lemon',
    'tacos',
  ];

  // Payment tabs (accessible when authenticated)
  const paymentTabs = [
    'Pago',
    'Pago-GALLETA',
    'Pago-Pizza',
    'Pago-Salad',
    'Pago-cake',
    'Pago-lemon',
    'Pago-Tipico',
    'Pago-Americano',
    'Pago-TOSTADAS',
    'Pago-pupusas',
    'Pago-carne',
    'Pago-pollo',
    'Pago-budin',
    'Pago-Flan',
    'Pago-pie',
    'Pago-pasta',
    'Pago-QUEADILLA',
    'Pago-Nachos',
    'Pago-Lettuce-Wraps',
    'Pago-NUESES',
    'Pago-Nuggets',
    'Pago-Arros',
    'Pago-Horchata',
    'Pago-Jamaica',
    'Pago-Tamarindo',
    'Pago-Rollo',
  ];

  // Register ALL tabs so router.push works for any screen
  // But we'll control the tab bar visibility via a custom tab bar
  const allTabs = [
    ...authTabs,
    ...appTabs,
    ...paymentTabs,
    'Registrarse NEGOCIOS',
    'customer-chat/[orderId]',
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab as any,
        // Hide tab bar entirely - we use custom bottom bars in screens
        tabBarStyle: { display: 'none' },
      }}>
      {allTabs.map((tabName) => (
        <Tabs.Screen key={tabName} name={tabName} options={{ href: null }} />
      ))}
    </Tabs>
  );
}