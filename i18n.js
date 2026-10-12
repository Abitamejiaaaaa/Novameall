import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './locales/en.json';
import es from './locales/es.json';

// Set the locale once at the beginning
const locales = Localization.getLocales();
const deviceLocale = locales[0]?.languageCode ?? 'en';

// Create i18n instance
const i18n = new I18n();

// Configure i18n
i18n.fallbacks = true;
i18n.translations = { en, es };
i18n.locale = deviceLocale;
i18n.defaultLocale = 'en';

// Helper function to translate
export const t = (key, options) => {
  return i18n.t(key, options);
};

// Helper to change language
export const setLanguage = (language) => {
  i18n.locale = language;
};

export default i18n;