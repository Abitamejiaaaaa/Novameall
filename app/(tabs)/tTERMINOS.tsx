import React from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const terminos = [
  'Al registrarse y utilizar NovaMeall, el usuario acepta estos términos y condiciones.',

  'Los negocios son responsables de publicar información correcta sobre sus productos, incluyendo precio, cantidad, ingredientes, fecha de elaboración, fecha de vencimiento y hora límite de venta.',

  'No se permite publicar alimentos vencidos, dañados o que representen un riesgo para los consumidores.',

  'Los usuarios podrán reservar y comprar productos mediante los métodos de pago disponibles en la plataforma.',

  'NovaMeall podrá cobrar al negocio una comisión por cada venta realizada mediante la plataforma.',

  'Los precios y la disponibilidad de los productos deberán mantenerse actualizados para evitar pedidos de productos que ya no estén disponibles.',

  'Está prohibido utilizar NovaMeall para realizar fraudes, publicar información falsa o afectar el funcionamiento de la plataforma.',

  'NovaMeall podrá suspender o eliminar cuentas que incumplan estos términos y condiciones.',
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
            <Text style={styles.logoText}>N</Text>
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
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#DA8D07',
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