
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const [username, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const iniciarSesion = () => {
    console.log("Email:", username);
    console.log("Contraseña:", password);
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
      onPress={() => {
        if (!password.trim()) {
          alert("Please enter a password.");
          return;
        }
        navigate("/Home");
      }}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>


      <Text style={styles.olvidaste} onPress={() => navigate("/OlividarHeylin")}>
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