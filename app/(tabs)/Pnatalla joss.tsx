import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
let Logo: any;
let Imagen: any;
try {
  Logo = require('../../assets/images/Logo.jpeg');
} catch (e) {
  Logo = undefined;
}
try {
  Imagen = require('../../assets/images/imagen.jpeg');
} catch (e) {
  Imagen = undefined;
}

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.black}>Welcome back{'\n'}</Text>
          <Text style={styles.bold}>Log in to continue</Text>
        </Text>

        

        
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: height * 0.3,
    backgroundColor: '#EECFA7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.42,
    height: width * 0.42,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  black: {
    color: '#000000',
  },

  bold: {
    fontWeight: 'bold',
    color: '#474444',
  },

  
  
  
  
  
  registerButton: {
    width: '90%',
    backgroundColor: 'rgb(184, 217, 91)',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
});
