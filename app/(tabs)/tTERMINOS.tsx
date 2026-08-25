import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
      'Confirmación',
      'Has aceptado los Términos y Condiciones de NovaMeall.'
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        {/* ENCABEZADO */}
        <View style={styles.header}>

          <View style={styles.logo}>
             <Image style={styles.logo} source={require('../../assets/images/Logo.jpeg')}></Image>
          </View>

          <Text style={styles.title}>
            Términos y Condiciones
          </Text>

          <Text style={styles.subtitle}>
            NovaMeall
          </Text>

        </View>

        {/* CONTENIDO */}
        <ScrollView
          style={styles.content}
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

        {/* BOTÓN */}
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={aceptar}
          >
            <Text style={styles.buttonText}>
              Aceptar y continuar
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: width * 0.88,
    height: height * 0.82,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
  },

  header: {
    backgroundColor: '#EECFA7',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  logo: {
    width: 85,
    height: 85,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B3B3B',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: '#726B25',
    fontWeight: '600',
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  paragraph: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },

  buttonContainer: {
    padding: 18,
  },

  button: {
    backgroundColor: '#B8D95B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#2F2F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});