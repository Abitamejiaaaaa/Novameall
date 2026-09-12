import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [username, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      router.push("/Home");
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.fondoAmarillo} />
      <View style={styles.fondoBlanco} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/Logo.jpeg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            Welcome to NovaMeall!
          </Text>

          <Text style={styles.subtitle}>
            Sign up to continue
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={username}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              autoCapitalize="none"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <Pressable 
              style={styles.button}
              onPress={iniciarSesion}
              android_ripple={{ color: '#a3c44e' }}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

            <Text style={styles.olvidaste} onPress={() => router.push("/Olividar")}>
              Forgot your password?
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2B84B",
  },
  keyboardView: {
    flex: 1,
  },
  fondoAmarillo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "35%",
    backgroundColor: "#F2B84B",
  },
  fondoBlanco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.04,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  logo: {
    width: Math.min(width * 0.35, 130),
    height: Math.min(width * 0.35, 130),
  },
  title: {
    fontSize: Math.min(width * 0.07, 28),
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Math.min(width * 0.038, 15),
    textAlign: "center",
    marginBottom: height * 0.02,
    color: "#666",
  },
  formCard: {
    width: "100%",
    marginTop: height * 0.04,
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: height * 0.0001,
  },
  label: {
    width: "100%",
    fontSize: Math.min(width * 0.038, 14),
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: height * 0.014,
    marginBottom: height * 0.018,
    fontSize: Math.min(width * 0.04, 15),
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.016,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#B8D95B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: Math.min(width * 0.045, 17),
    fontWeight: "bold",
    color: "#000",
  },
  olvidaste: {
    marginTop: height * 0.02,
    fontSize: Math.min(width * 0.038, 14),
    color: "#DA8D07",
    fontWeight: "600",
    textAlign: "center",
  },
});