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
  View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth"; 
import { auth } from "../../Firebase/config";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const recuperarContraseña = async () => {
    if (!email.trim()) {
      Alert.alert("Incomplete Fields", "Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent. Please check your inbox.");
      router.push("/Iniciar");
    } catch (error) {
      Alert.alert("Error", "An error occurred while trying to send the password reset email.");
      return;
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
          <View style={styles.logoContainer}>
            <Image 
              source={require("../../assets/images/Logo.jpeg")} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.subtitle}>Enter your email to receive a recovery link.</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Pressable 
              style={styles.button} 
              onPress={recuperarContraseña}
              android_ripple={{ color: '#a3c44e' }}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.05,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.02,
  },
  logo: {
    width: Math.min(width * 0.45, 180),
    height: Math.min(width * 0.45, 180),
  },
  title: {
    fontSize: Math.min(width * 0.075, 30),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: Math.min(width * 0.038, 15),
    textAlign: 'center',
    color: '#666',
    marginBottom: height * 0.03,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.025,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: Math.min(width * 0.04, 15),
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.022,
    fontSize: Math.min(width * 0.04, 16),
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#B8D95B',
    paddingVertical: height * 0.018,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: 'bold',
    color: '#000',
  },
});