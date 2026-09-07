import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#222222',
        tabBarInactiveTintColor: '#222222',
        headerShown: false,
        tabBarButton: HapticTab as any,
        tabBarStyle: {
          backgroundColor: '#F5A300',
          height: 64,
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          paddingHorizontal: 5,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 8,
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={27}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Restaurante"
        options={{
          title: 'Restaurantes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-outline"
              size={29}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={29}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="clipboard-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Soporte"
        options={{
          title: 'Soporte',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="headset-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}