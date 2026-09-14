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
      <Tabs.Screen name="Login" options={{ href: null }} />
      <Tabs.Screen name="Home" options={{ href: null }} />
      <Tabs.Screen name="ALMUERZOS" options={{ href: null }} />
      <Tabs.Screen name="CATEGORIAS" options={{ href: null }} />
      <Tabs.Screen name="CHAT" options={{ href: null }} />
      <Tabs.Screen name="CONFIGURACION" options={{ href: null }} />
      <Tabs.Screen name="CONFIGURACION-NARANJA" options={{ href: null }} />
      <Tabs.Screen name="CONFIGURACIpN-PERFIL" options={{ href: null }} />
      <Tabs.Screen name="Espagueti" options={{ href: null }} />
      <Tabs.Screen name="Galletas" options={{ href: null }} />
      <Tabs.Screen name="Iniciar" options={{ href: null }} />
      <Tabs.Screen name="MAPA" options={{ href: null }} />
      <Tabs.Screen name="MEXICANA" options={{ href: null }} />
      <Tabs.Screen name="Olividar" options={{ href: null }} />
      <Tabs.Screen name="POLITICAS" options={{ href: null }} />
      <Tabs.Screen name="Pago" options={{ href: null }} />
      <Tabs.Screen name="Pago-GALLETA" options={{ href: null }} />
      <Tabs.Screen name="Pago-Pizza" options={{ href: null }} />
      <Tabs.Screen name="Pago-Salad" options={{ href: null }} />
      <Tabs.Screen name="Queres" options={{ href: null }} />
      <Tabs.Screen name="Registrarse" options={{ href: null }} />
      <Tabs.Screen name="Registrarse NEGOCIOS" options={{ href: null }} />
      <Tabs.Screen name="Restaurante" options={{ href: null }} />
      <Tabs.Screen name="Restaurante Hamburguesa" options={{ href: null }} />
      <Tabs.Screen name="Restaurante copy Espaqueti" options={{ href: null }} />
      <Tabs.Screen name="Restaurante copy Pizza" options={{ href: null }} />
      <Tabs.Screen name="Restaurante copy Pollo" options={{ href: null }} />
      <Tabs.Screen name="Restaurante2" options={{ href: null }} />
      <Tabs.Screen name="customer-chat/[orderId]" options={{ href: null }} />
      <Tabs.Screen name="inbox" options={{ href: null }} />
      <Tabs.Screen name="pizza" options={{ href: null }} />
      <Tabs.Screen name="pollo-asado" options={{ href: null }} />
      <Tabs.Screen name="restaurant-order" options={{ href: null }} />
      <Tabs.Screen name="salah" options={{ href: null }} />
      <Tabs.Screen name="tTERMINOS" options={{ href: null }} />
      <Tabs.Screen name="tacos" options={{ href: null }} />
      <Tabs.Screen name="cake" options={{ href: null }} />
      <Tabs.Screen name="Pago-cake" options={{ href: null }} />
      <Tabs.Screen name="lemon" options={{ href: null }} />
      <Tabs.Screen name="Pago-lemon" options={{ href: null }} />
      <Tabs.Screen name="Tipico" options={{ href: null }} />
      <Tabs.Screen name="Pago-Tipico" options={{ href: null }} />
      <Tabs.Screen name="Americano" options={{ href: null }} />
      <Tabs.Screen name="Pago-Americano" options={{ href: null }} />
      <Tabs.Screen name="TOSTADAS" options={{ href: null }} />
      <Tabs.Screen name="Pago-TOSTADAS" options={{ href: null }} />
      <Tabs.Screen name="Desayunos" options={{ href: null }} />
      <Tabs.Screen name="Pago-pupusas" options={{ href: null }} />
      <Tabs.Screen name="Carne" options={{ href: null }} />
      <Tabs.Screen name="Pago-carne" options={{ href: null }} />
      <Tabs.Screen name="pupusas" options={{ href: null }} />
      <Tabs.Screen name="Sandwiche" options={{ href: null }} />
      <Tabs.Screen name="Pago-Sandwiche" options={{ href: null }} />
      <Tabs.Screen name="cena" options={{ href: null }} />
      <Tabs.Screen name="Almuerzo" options={{ href: null }} />
      <Tabs.Screen name="Pago-pollo" options={{ href: null }} />
      <Tabs.Screen name="flan" options={{ href: null }} />
      <Tabs.Screen name="budin" options={{ href: null }} />
      <Tabs.Screen name="Pago-budin" options={{ href: null }} />
      <Tabs.Screen name="Pago-flan" options={{ href: null }} />
      <Tabs.Screen name="pie" options={{ href: null }} />
      <Tabs.Screen name="Pago-pie" options={{ href: null }} />
      <Tabs.Screen name="postre" options={{ href: null }} />
      <Tabs.Screen name="Pago-Flan" options={{ href: null }} />
    </Tabs>
  );
}

