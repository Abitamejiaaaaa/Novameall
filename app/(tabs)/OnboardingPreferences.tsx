import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { t } from '@/i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FOOD_PREFERENCES = [
  { id: 'meals', labelKey: 'food.meals', icon: 'restaurant-outline', color: '#E67E22' },
  { id: 'vegan', labelKey: 'food.vegan', icon: 'leaf-outline', color: '#4CAF50' },
  { id: 'desserts', labelKey: 'food.desserts', icon: 'ice-cream-outline', color: '#FF9800' },
  { id: 'drinks', labelKey: 'food.drinks', icon: 'wine-outline', color: '#2196F3' },
  { id: 'mexican', labelKey: 'food.mexican', icon: 'nutrition-outline', color: '#F44336' },
  { id: 'american', labelKey: 'food.american', icon: 'fast-food-outline', color: '#FF5722' },
  { id: 'snacks', labelKey: 'food.snacks', icon: 'pizza-outline', color: '#FFC107' },
  { id: 'healthy', labelKey: 'food.healthy', icon: 'leaf-outline', color: '#8BC34A' },
] as const;

export default function OnboardingPreferencesScreen() {
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  const togglePreference = (prefId: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefId)
        ? prev.filter((id) => id !== prefId)
        : [...prev, prefId]
    );
  };

  const handleContinue = async () => {
    try {
      await SecureStore.setItemAsync(
        'user_food_preferences',
        JSON.stringify(selectedPrefs)
      );
      router.replace('/(tabs)/Home');
    } catch (error) {
      console.log('Error saving preferences:', error);
      router.replace('/(tabs)/Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t('onboarding.preferencesTitle')}</Text>
          <Text style={styles.subtitle}>
            {t('onboarding.preferencesSubtitle')}
          </Text>
        </View>

        <View style={styles.grid}>
          {FOOD_PREFERENCES.map((pref) => {
            const isSelected = selectedPrefs.includes(pref.id);
            return (
              <TouchableOpacity
                key={pref.id}
                style={[
                  styles.prefCard,
                  isSelected && styles.prefCardSelected,
                ]}
                onPress={() => togglePreference(pref.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: pref.color + '20' },
                    isSelected && { backgroundColor: pref.color },
                  ]}
                >
                  <Ionicons
                    name={pref.icon}
                    size={28}
                    color={isSelected ? '#FFFFFF' : pref.color}
                  />
                </View>
                <Text
                  style={[
                    styles.prefLabel,
                    isSelected && styles.prefLabelSelected,
                  ]}
                >
                  {t(pref.labelKey)}
                </Text>
                {isSelected && (
                  <View style={styles.checkMark}>
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.continueButton, selectedPrefs.length === 0 && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={selectedPrefs.length === 0}
        >
          <Text style={styles.continueButtonText}>
            {selectedPrefs.length === 0
              ? t('onboarding.selectAtLeastOne')
              : t('onboarding.continue', { count: selectedPrefs.length })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace('/(tabs)/Home')}
        >
          <Text style={styles.skipText}>{t('onboarding.skipAndExplore')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2B84B',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  prefCard: {
    width: SCREEN_WIDTH > 600 ? '31%' : '47%',
    aspectRatio: 1,
    minWidth: 140,
    maxWidth: 180,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
  },
  prefCardSelected: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  prefLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  prefLabelSelected: {
    fontWeight: 'bold',
  },
  checkMark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#E67E22',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#FFB366',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});