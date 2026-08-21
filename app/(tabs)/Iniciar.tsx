
import { navigate } from "expo-router/build/global-state/routing";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {

    if (!username.trim() || !password.trim()) {
      Alert.alert("Incomplete Fields", "Please enter your email and password.");
      return;
    }

    if (!username.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    

    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), username, password);
      
      console.log("Inicio de sesión exitoso:", userCredential.user.email);
      navigate("/Home");

    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/invalid-credential') {
        Alert.alert("Error", "The email or password is incorrect.");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("Error", "The email format is invalid.");
      } else {
        Alert.alert("Error", "An error occurred while trying to sign in.");
      }
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.fondoAmarillo} />

      <View style={styles.fondoBlanco} />

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/Logo.jpeg")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>
        Welcome to NovaMeall!
      </Text>

      <Text style={styles.subtitle}>
        Sign up to continue
      </Text>

      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>
        Phone Number
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <Text style={styles.label}>
        Password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={styles.button}
      onPress={iniciarSesion}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>


      <Text style={styles.olvidaste} onPress={() => navigate("/Olividar")}>
        ¿Forgot your password?
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 150,
    justifyContent: "center",
    marginTop: 45,
    borderRadius: 30,
  },



  fondoAmarillo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#F2B84B",
  },

  fondoBlanco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 550,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    
  },

  logo: {
    width: width * 0.42,
    height: width * 0.42,
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: 20,
    zIndex: 1,
  },

  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    zIndex: 1,
  },

  subtitle: {
    fontSize: width * 0.04,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    zIndex: 1,
  },

  label: {
    width: "90%",
    fontSize: width * 0.04,
    fontWeight: "600",
    marginBottom: 8,
    zIndex: 1,
  },

  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: width * 0.04,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },

  button: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#B8D95B",
    zIndex: 1,
  },

  buttonText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#000",
  },

  olvidaste: {
    marginTop: 15,
    fontSize: width * 0.035,
    color: "#DA8D07",
    fontWeight: "600",
    textAlign: "center",
    zIndex: 1,
  },

});