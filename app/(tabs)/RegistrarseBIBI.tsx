import React, { useState } from "react";
import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, Dimensions } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/config";


const { width, height } = Dimensions.get("window");

export default function Registro() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registrarUsuario = async (): Promise<void> => {
    if (!name || !lastname || !email || !password) {
      Alert.alert("Campos incompletos", "Complete todos los campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 6 caracteres."
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

      Alert.alert("Registro exitoso", "La cuenta se creó correctamente.");

      setName("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      console.log(error);

      const err = error as { code?: string };

      if (err.code === "auth/email-already-in-use") {
        Alert.alert("Correo existente", "Este correo ya está registrado.");
      } else if (err.code === "auth/invalid-email") {
        Alert.alert("Correo inválido", "Ingrese un correo electrónico válido.");
      } else if (err.code === "auth/weak-password") {
        Alert.alert(
          "Contraseña débil",
          "La contraseña debe tener al menos 6 caracteres."
        );
      } else {
        Alert.alert("Error", "No se pudo crear la cuenta.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Logo.jpeg")} style={styles.logo} />

      <Text style={styles.title}>Crear una cuenta</Text>

      <Text style={styles.subtitle}>
        Completa tus datos para registrarte
      </Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre"
        value={name}
        onChangeText={(text: string) => setName(text)}
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su apellido"
        value={lastname}
        onChangeText={(text: string) => setLastname(text)}
      />

     <Text style={styles.label}>Correo electrónico</Text>
     <TextInput
       style={styles.input}
       placeholder="ejemplo@correo.com"
       keyboardType="email-address"
       autoCapitalize="none"
       value={email}
       onChangeText={(text: string) => setEmail(text)}
     />

     <Text style={styles.label}>Contraseña</Text>
     <TextInput
       style={styles.input}
       placeholder="Ingrese su contraseña"
       secureTextEntry
       value={password}
       onChangeText={(text: string) => setPassword(text)}
     />

     <Pressable style={styles.button} onPress={() => void registrarUsuario()}>
       <Text style={styles.buttonText}>Registrarse</Text>
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
