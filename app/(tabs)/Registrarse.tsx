import { FontAwesome } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, db } from "../../Firebase/config";
import { useRouter } from "expo-router";
import { t } from '@/i18n';

const { width, height } = Dimensions.get("window");

export default function Registro() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const registrarUsuario = async (): Promise<void> => {
    if (!name.trim() || !lastname.trim() || !email.trim() || !password) {
      Alert.alert(t('errors.generic'), t('errors.generic'));
      return;
    }

    if (password.length < 8 || password.length > 20) {
      Alert.alert(
        t('errors.invalidPassword'),
        t('errors.passwordLength')
      );
      return;
    }

    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);

    if (!tieneMayuscula || !tieneMinuscula) {
      Alert.alert(
        t('errors.invalidPassword'),
        t('errors.passwordComplexity')
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        t('errors.invalidEmail'),
        t('errors.invalidEmail')
      );
      return;
    }

    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!nameRegex.test(name) || !nameRegex.test(lastname)) {
      Alert.alert(
        t('errors.invalidName'),
        t('errors.invalidName')
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "Usuarios", user.uid), {
        nombre: name,
        apellido: lastname,
        correo: email,
        uid: user.uid,
      });

      Alert.alert(t('auth.registrationSuccess'), t('auth.accountCreated'));

      setName("");
      setLastname("");
      setEmail("");
      setPassword("");

      // Redirect to onboarding flow instead of Terms
      router.replace("/(tabs)/OnboardingWelcome" as Parameters<typeof router.replace>[0]);

    } catch (error: unknown) {
      console.log(error); 

      const err = error as { code?: string };

      if (err.code === "auth/email-already-in-use") {
        Alert.alert(t('errors.emailInUse'), t('errors.emailInUse'));
      } else if (err.code === "auth/invalid-email") {
        Alert.alert(t('errors.invalidEmail'), t('errors.invalidEmail'));
      } else if (err.code === "auth/weak-password") {
        Alert.alert(
          t('errors.weakPassword'),
          t('errors.weakPassword')
        );
      } else {
        Alert.alert(t('errors.generic'), t('errors.generic'));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/Logo.jpeg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
          <View style={[styles.dot, styles.dot4]} />
          <View style={[styles.dot, styles.dot5]} />
          <View style={[styles.dot, styles.dot6]} />

          <Text style={styles.title}>{t('auth.welcome')}</Text>
          <Text style={styles.subtitle}>{t('auth.signUpToContinue')}</Text>

          <View style={styles.form}>
            <Text style={styles.label}>{t('auth.firstName')}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={18} color="#E89218" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('auth.firstName')}
                placeholderTextColor="#A0A0A0"
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
            </View>

            <Text style={styles.label}>{t('auth.lastName')}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={18} color="#E89218" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('auth.lastName')}
                placeholderTextColor="#A0A0A0"
                value={lastname}
                onChangeText={(text: string) => setLastname(text)}
              />
            </View>

            <Text style={styles.label}>{t('auth.email')}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={16} color="#E89218" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('auth.email')}
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text: string) => setEmail(text)}
              />
            </View>

            <Text style={styles.label}>{t('auth.password')}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={18} color="#E89218" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('auth.password')}
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text: string) => setPassword(text)}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconContainer}
              >
                <FontAwesome
                  name={showPassword ? "eye-slash" : "eye"}
                  size={18}
                  color="#E89218"
                />
              </Pressable>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => registrarUsuario()}
            >
              <Text style={styles.buttonText}>{t('auth.signUp')}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2B84B" },
  scrollContent: { flexGrow: 1, backgroundColor: "#F2B84B" },
  header: { height: height * 0.28, backgroundColor: "#F2B84B", justifyContent: "center", alignItems: "center", paddingTop: 10 },
  logoContainer: { width: 140, height: 140, backgroundColor: "#FFFFFF", borderRadius: 28, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, overflow: "hidden" },
  logo: { width: "85%", height: "85%" },
  card: { flex: 1, backgroundColor: "#FFFFFF", borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 28, paddingTop: 28, paddingBottom: 40, position: "relative", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#DA8D07", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#888888", textAlign: "center", marginBottom: 22 },
  form: { width: "100%" },
  label: { fontSize: 13, fontWeight: "600", color: "#333333", marginBottom: 6, marginLeft: 2 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1.2, borderColor: "#5C6B32", borderRadius: 14, backgroundColor: "#FFFFFF", paddingHorizontal: 12, height: 48, marginBottom: 16 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: "#333333" },
  eyeIconContainer: { padding: 4 },
  button: { width: "100%", backgroundColor: "#FF9800", height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", marginTop: 10, shadowColor: "#FF9800", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 3 },
  buttonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "bold" },
  dot: { position: "absolute", borderRadius: 50, opacity: 0.85 },
  dot1: { width: 22, height: 22, backgroundColor: "#F2C94C", top: 15, left: "48%" },
  dot2: { width: 26, height: 26, backgroundColor: "#F2C94C", top: 40, right: 35 },
  dot3: { width: 24, height: 24, backgroundColor: "#FFB74D", top: 70, left: 20 },
  dot4: { width: 24, height: 24, backgroundColor: "#FF9800", bottom: "45%", right: 20 },
  dot5: { width: 22, height: 22, backgroundColor: "#F2C94C", bottom: 90, left: 30 },
  dot6: { width: 20, height: 20, backgroundColor: "#FF9800", bottom: 25, left: "48%" },
});