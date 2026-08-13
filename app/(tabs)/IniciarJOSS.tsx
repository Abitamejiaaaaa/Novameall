import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, db } from "../../Firebase/config";



const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const iniciarSesion = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Éxito", "Sesión iniciada correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión");
    }
  };



  
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Logo.jpeg")} style={styles.logo} />

      <Text style={styles.title}>Crear una cuenta</Text>

      <Text style={styles.subtitle}>
        Completa tus datos para registrarte
      </Text>

     <Text style={styles.label}>
       Correo electrónico
     </Text>
     <TextInput
       style={styles.input}
       placeholder="ejemplo@correo.com"
       keyboardType="email-address"
       autoCapitalize="none"
       value={email}
       onChangeText={(text) => setEmail(text)}
     />

     <Text style={styles.label}>Contraseña</Text>
     <TextInput
       style={styles.input}
       placeholder="Ingrese su contraseña"
       secureTextEntry
       value={password}
       onChangeText={(text) => setPassword(text)}
     />

     <Pressable style={styles.button} onPress={() => void iniciarSesion()}>
       <Text style={styles.buttonText}>Iniciar sesión</Text>
     </Pressable>
   </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: height * 0.3,
    backgroundColor: '#ffffff',
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
  green: {
    color: '#726B25',
  },
  orange: {
    color: '#DA8D07',
  },
  image: {
    width: width * 0.72,
    height: height * 0.26,
    marginBottom: 35,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: width * 0.04,
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#B8D95B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 18,
  },
  registerButton: {
    width: '90%',
    backgroundColor: '#DA8D07',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: '5%',
  },
  button: {
    width: '90%',
    backgroundColor: '#B8D95B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
});
