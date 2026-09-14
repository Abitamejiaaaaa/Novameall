import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      scrollView
      <View style={styles.fondoAmarillo} />
      <View style={styles.fondoBlanco} />
      
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/Logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.green}>¡Welcome{"\n"}</Text>
          <Text style={styles.orange}>to NovaMeall!</Text>
        </Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/imagen.jpeg')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push("../Iniciar")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("../Registrarse")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EECFA7',
  },
  fondoAmarillo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "45%",
    backgroundColor: "#EECFA7",
  },
  fondoBlanco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  logo: {
    width: 120,
    height: 120,
    maxWidth: '40%',
    maxHeight: '80%',
  },
  content: {
    flex: 5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  green: {
    color: '#726B25',
  },
  orange: {
    color: '#DA8D07',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 220,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  loginButton: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#B8D95B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButton: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#DA8D07',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});