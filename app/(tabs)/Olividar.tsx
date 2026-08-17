import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../Firebase/config";



const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const iniciarSesion = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión");
    }
  };



  
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Logo.jpeg")} style={styles.logo} />

      <Text style={styles.title}>Reset password</Text>

     <Text style={styles.label}>
       Email
     </Text>
     <TextInput
       style={styles.input}
       placeholder="Enter your email"
       keyboardType="email-address"
       autoCapitalize="none"
       value={email}
       onChangeText={(text) => setEmail(text)}
     />

     <Pressable style={styles.button} onPress={() => void iniciarSesion()}>
       <Text style={styles.buttonText}>Reset Password</Text>
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
    width: 250,
    height: 250,
    marginTop: 80,
    marginLeft: 50,
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
    marginLeft: 18,
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
    marginLeft: '7%',
  },
  button: {
    width: '90%',
    backgroundColor: '#B8D95B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 18,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
});
