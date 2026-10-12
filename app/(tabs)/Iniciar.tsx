import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../../Firebase/config";
import { t } from '@/i18n';

const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [username, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const iniciarSesion = async () => {
    const cleanEmail = username.trim();

    if (!cleanEmail || !password.trim()) {
      Alert.alert(t('errors.generic'), t('errors.invalidCredentials'));
      return;
    }

    if (!cleanEmail.includes("@")) {
      Alert.alert(t('errors.invalidEmail'), t('errors.invalidEmail'));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      console.log("Inicio de sesión exitoso:", userCredential.user.email);
      // Usamos replace en lugar de push para que Home sea el nuevo punto central y no pueda volver atrás
      router.replace("/Home");
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert(t('errors.generic'), t('errors.invalidCredentials'));
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert(t('errors.invalidEmail'), t('errors.invalidEmail'));
      } else {
        Alert.alert(t('errors.generic'), t('errors.generic'));
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.fondoAmarillo} />
          <View style={styles.fondoBlanco} />

          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/Logo.jpeg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            {t('auth.welcome')}
          </Text>

          <Text style={styles.subtitle}>
            {t('auth.signInToContinue')}
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t('auth.email')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.email')}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={username}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.label}>{t('auth.phoneNumber')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.phoneNumber')}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              autoCapitalize="none"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />

            <Text style={styles.label}>{t('auth.password')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.password')}
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
              <Text style={styles.buttonText}>{t('auth.login')}</Text>
            </Pressable>

            <Text style={styles.olvidaste} onPress={() => router.push("/Olividar")}>
              {t('auth.forgotPassword')}
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
    marginTop: 50,
    paddingTop: 20,
    width: "100%",
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