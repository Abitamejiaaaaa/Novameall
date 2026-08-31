import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const width = Dimensions.get("window").width;

export default function Configuracion() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.jpeg")}
            style={styles.logo}
          />
        </View>

        <View style={styles.profile}>
          <Ionicons name="person" size={25} color="#555" />
        </View>
      </View>

      <Text style={styles.title}>Configuración</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mi cuenta</Text>

        <Pressable style={styles.option}>
          <Ionicons name="person-outline" size={23} color="#444" />
          <Text style={styles.optionText}>
            Mi cuenta y datos personales
          </Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Ionicons name="lock-closed-outline" size={23} color="#444" />
          <Text style={styles.optionText}>
            Cambiar contraseñas
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferencias</Text>

        <Pressable style={styles.option}>
          <Ionicons name="card-outline" size={23} color="#444" />
          <Text style={styles.optionText}>Métodos de pago</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Ionicons name="notifications-outline" size={23} color="#444" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Ionicons name="language-outline" size={23} color="#444" />
          <Text style={styles.optionText}>Idioma</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ayuda y soporte</Text>

        <Pressable style={styles.option}>
          <Ionicons name="help-circle-outline" size={23} color="#444" />
          <Text style={styles.optionText}>Ayuda y soporte</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Ionicons
            name="shield-checkmark-outline"
            size={23}
            color="#444"
          />
          <Text style={styles.optionText}>
            Políticas de privacidad
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD45F",
    paddingHorizontal: width * 0.09,
    paddingTop: 35,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: width * 0.18,
    height: width * 0.18,
    resizeMode: "contain",
  },

  profile: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.06,
    backgroundColor: "#E8C45A",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 25,
    color: "#111",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: width * 0.045,
    paddingVertical: 14,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 7,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 47,
  },

  optionText: {
    fontSize: width * 0.04,
    color: "#333",
    marginLeft: 14,
  },

  logoutButton: {
    width: "85%",
    alignSelf: "center",
    height: 52,
    borderRadius: 28,
    backgroundColor: "#FF9700",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#222",
  },
});