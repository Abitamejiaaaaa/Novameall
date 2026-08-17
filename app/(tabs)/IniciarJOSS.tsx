import React, { useState } from "react";
import {
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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const iniciarSesion = () => {
    console.log("Usuario:", username);
    console.log("Teléfono:", phone);
    console.log("Contraseña:", password);
  };

  return (
    <View style={styles.container}>

      <View style={styles.fondoAmarillo} />

      <View style={styles.fondoBlanco} />

      <Image
        source={require("../../assets/images/Logo.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Bienvenido de nuevo
      </Text>

      <Text style={styles.subtitle}>
        Inicia sesión para continuar
      </Text>

      <Text style={styles.label}>
        Usuario
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su usuario"
        keyboardType="default"
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text style={styles.label}>
        Teléfono
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su número de teléfono"
        keyboardType="phone-pad"
        autoCapitalize="none"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />

      <Text style={styles.label}>
        Contraseña
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Pressable
        style={styles.button}
        onPress={() => void iniciarSesion()}
      >
        <Text style={styles.buttonText}>
          Continuar
        </Text>
      </Pressable>

      <Text style={styles.olvidaste}>
        ¿Olvidaste tu contraseña?
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  fondoAmarillo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "#F6CB5A",
  },

  fondoBlanco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "#FFFFFF",
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
    fontSize: width * 0.05,
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