import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab as any,
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="Restaurante"
        options={{
          title: 'Restaurantes',
        }}
      />
      <Tabs.Screen
        name="Favoritos"
        options={{
          title: 'Favoritos',
        }}
      />
      <Tabs.Screen
        name="Pedidos"
        options={{
          title: 'Pedidos',
        }}
      />
      <Tabs.Screen
        name="Soporte"
        options={{
          title: 'Soporte',
        }}
      />
    </Tabs>
  );
}