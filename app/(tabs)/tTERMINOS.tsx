import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const terminos = [
  'By registering and using NovaMeall, the user agrees to these terms and conditions.',
  'Businesses are responsible for publishing accurate information about their products, including price, quantity, ingredients, production date, expiration date, and sale cutoff time.',
  'Posting expired, damaged, or unsafe food that poses a risk to consumers is prohibited.',
  'Users may reserve and purchase products using the payment methods available on the platform.',
  'NovaMeall may charge the business a commission for each sale made through the platform.',
  'Product prices and availability must be kept up to date to prevent orders for products that are no longer available.',
  'It is prohibited to use NovaMeall to commit fraud, publish false information, or interfere with the operation of the platform.',
  'NovaMeall may suspend or delete accounts that breach these terms and conditions.',
];

export default function App() {
  const aceptar = () => {
    Alert.alert(
      'Confirmation',
      'You have accepted the Terms and Conditions of NovaMeall.'
    );
    router.push('/(tabs)/POLITICAS');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                style={styles.logoImage} 
                source={require('../../assets/images/Logo.jpeg')} 
                resizeMode="cover"
              />
            </View>

            <Text style={styles.title}>
              Terms and Conditions
            </Text>

            <Text style={styles.subtitle}>
              NovaMeall
            </Text>
          </View>

          {/* CONTENT */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={true}
          >
            {terminos.map((texto, index) => (
              <Text
                key={index}
                style={styles.paragraph}
              >
                {texto}
              </Text>
            ))}
          </ScrollView>

          {/* BUTTON */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={aceptar}
            >
              <Text style={styles.buttonText}>
                Accept and continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },

  container: {
    flex: 1,
    backgroundColor: '#F6F5F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
  },

  card: {
    width: '100%',
    maxWidth: 440,
    height: '92%',
    maxHeight: 750,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  header: {
    backgroundColor: '#EECFA7',
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },

  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },

  logoImage: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B3B3B',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#726B25',
    fontWeight: '600',
  },

  content: {
    flex: 1,
  },

  scrollContentContainer: {
    paddingHorizontal: '6%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },

  paragraph: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'left',
  },

  buttonContainer: {
    padding: '5%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  button: {
    backgroundColor: '#B8D95B',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  buttonText: {
    color: '#2F2F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});