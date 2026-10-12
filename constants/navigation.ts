// Centralized navigation routes for the entire app
// This prevents broken navigation from undefined variables

export const ROUTES = {
  // Auth routes (public)
  LOGIN: '/Login',
  SIGNUP: '/Registrarse',
  FORGOT_PASSWORD: '/Olividar',
  RESET_PASSWORD: '/OlividaRR',
  TERMS: '/tTERMINOS',
  PRIVACY: '/POLITICAS',

  // Main app routes (protected)
  HOME: '/(tabs)/Home',
  CATEGORIES: '/(tabs)/CATEGORIAS',
  ORDERS: '/(tabs)/restaurant-order',
  PROFILE: '/(tabs)/CONFIGURACIpN-PERFIL',
  SETTINGS: '/(tabs)/CONFIGURACION-NARANJA',
  SETTINGS_ALT: '/(tabs)/CONFIGURACION',
  INBOX: '/(tabs)/inbox',
  MAP: '/(tabs)/mapa',

  // Chat routes
  SUPPORT_CHAT: '/chat/support',
  RESTAURANT_CHAT: (orderId: string) => `/restaurant-chat/${orderId}`,
  CHAT_BY_ID: (chatId: string) => `/chat/${chatId}`,
} as const;

// Support chat ID - single source of truth
export const SUPPORT_CHAT_ID = 'support';

// Food category routes
export const FOOD_ROUTES = {
  // Meals
  TACOS: '/(tabs)/tacos',
  PIZZA: '/(tabs)/pizza',
  CARNE: '/(tabs)/Carne',
  POLLO_ASADO: '/(tabs)/pollo-asado',
  PUPUSAS: '/(tabs)/pupusas',
  QUESADILLA: '/(tabs)/quesadilla',
  SANDWICHE: '/(tabs)/Sandwiche',
  NACHOS: '/(tabs)/Nachos',
  NUGGETS: '/(tabs)/Nuggets',
  WRAPS: '/(tabs)/Wraps',
  TIPICO: '/(tabs)/Tipico',
  AMERICANO: '/(tabs)/Americano',
  TOSTADAS: '/(tabs)/TOSTADAS',
  ARROS: '/(tabs)/Arros',
  ESPAGUETI: '/(tabs)/Espagueti',

  // Deserts
  FLAN: '/(tabs)/flan',
  BUDIN: '/(tabs)/budin',
  CAKE: '/(tabs)/cake',
  PIE: '/(tabs)/pie',
  GALLETAS: '/(tabs)/Galletas',
  POSTRE: '/(tabs)/postre',

  // Categories
  MEXICANA: '/(tabs)/MEXICANA',
  DESAYUNOS: '/(tabs)/Desayunos',
  ALMUERZOS: '/(tabs)/ALMUERZOS',
  ALMUERZO: '/(tabs)/Almuerzo',
  CENA: '/(tabs)/cena',
  VEGAN: '/(tabs)/Vegan',
  COSITAS: '/(tabs)/COSITAS',
  NUESES: '/(tabs)/NUESES',
  SALAD: '/(tabs)/salah',

  // Restaurant pages
  RESTAURANTE: '/(tabs)/Restaurante',
  RESTAURANTE2: '/(tabs)/Restaurante2',
  RESTAURANTE_HAMBURGUESA: '/(tabs)/Restaurante Hamburguesa',
  RESTAURANTE_ESPAGUETI: '/(tabs)/Restaurante copy Espaqueti',
  RESTAURANTE_PIZZA: '/(tabs)/Restaurante copy Pizza',
  RESTAURANTE_POLLO: '/(tabs)/Restaurante copy Pollo',
} as const;

// Payment routes
export const PAYMENT_ROUTES = {
  GENERAL: '/(tabs)/Pago',
  TACOS: '/(tabs)/Pago',
  PIZZA: '/(tabs)/Pago-Pizza',
  CARNE: '/(tabs)/Pago-carne',
  POLLO: '/(tabs)/Pago-pollo',
  FLAN: '/(tabs)/Pago-Flan',
  BUDIN: '/(tabs)/Pago-budin',
  CAKE: '/(tabs)/Pago-cake',
  PIE: '/(tabs)/Pago-pie',
  GALLETAS: '/(tabs)/Pago-GALLETA',
  QUESADILLA: '/(tabs)/Pago-QUEADILLA',
  NACHOS: '/(tabs)/Pago-Nachos',
  WRAPS: '/(tabs)/Pago-Lettuce-Wraps',
  NUESES: '/(tabs)/Pago-NUESES',
  NUGGETS: '/(tabs)/Pago-Nuggets',
  ARROS: '/(tabs)/Pago-Arros',
  ESPAGUETI: '/(tabs)/Pago-pasta',
  TIPICO: '/(tabs)/Pago-Tipico',
  AMERICANO: '/(tabs)/Pago-Americano',
  TOSTADAS: '/(tabs)/Pago-TOSTADAS',
  PUPUSAS: '/(tabs)/Pago-pupusas',
  SANDWICHE: '/(tabs)/Pago-Sandwiche',
  SALAD: '/(tabs)/Pago-Salad',
} as const;
