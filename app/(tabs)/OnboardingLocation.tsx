import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function OnboardingLocationScreen() {
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        router.push('/(tabs)/OnboardingPreferences');
      } else {
        Alert.alert(
          'Location Permission',
          'We need your location to show nearby restaurants. You can enable it later in Settings.',
          [{ text: 'OK', onPress: () => router.push('/(tabs)/OnboardingPreferences') }]
        );
      }
    } catch (error) {
      console.log('Location permission error:', error);
      router.push('/(tabs)/OnboardingPreferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="map-marker-radius" size={80} color="#E67E22" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Enable Location</Text>
          <Text style={styles.subtitle}>
            Allow NovaMeall to access your location to find restaurants near you
            and show accurate delivery times.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.buttonDisabled]}
          onPress={requestLocationPermission}
          disabled={loading}
        >
          {loading ? (
            <>
              <Text style={styles.buttonText}>Allowing...</Text>
            </>
          ) : (
            <>
              <Ionicons name="location-outline" size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Allow Location</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/OnboardingPreferences')}
          disabled={loading}
        >
          <Text style={styles.secondaryButtonText}>Skip for Now</Text>
        </TouchableOpacity>

        <View style={styles.privacyNote}>
          <Text style={styles.privacyText}>
            You can change this later in Settings. We respect your privacy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2B84B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#E67E22',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    minWidth: 280,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyNote: {
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 18,
  },
});