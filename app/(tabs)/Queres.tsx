import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Queres() {
  const { width, height } = useWindowDimensions();

  function iniciarSesion() {
    throw new Error("Function not implemented.");
  }

  const dynamicStyles = StyleSheet.create({
    logo: {
      width: Math.min(width * 0.45, 150),
      height: Math.min(width * 0.25, 90),
      resizeMode: "contain",
    },
    buttonText: {
      fontSize: Math.min(width * 0.045, 18),
      fontWeight: "bold",
      color: "#000",
      textAlign: "center",
    },
    imageContainer: {
      marginTop: height * 0.08,
      width: Math.min(width * 0.85, 340),
      height: height * 0.22,
      maxHeight: 180,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={[styles.fondoAmarillo, { height: height * 0.45 }]} />
      <View style={styles.fondoBlanco} />

      <View style={[styles.imageContainer, dynamicStyles.imageContainer]}>
        <Image
          source={require("../../assets/images/Logo.jpeg")}
          style={dynamicStyles.logo}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button, 
            styles.buttonA,
            pressed && styles.pressedButton
          ]}
          onPress={() => void iniciarSesion()}
        >
          <Text style={dynamicStyles.buttonText}>Are you a user?</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button, 
            styles.buttonB,
            pressed && styles.pressedButton
          ]}
          onPress={() => void iniciarSesion()}
        >
          <Text style={dynamicStyles.buttonText}>Are you a restaurant?</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2B84B",
    alignItems: "center",
  },
  fondoAmarillo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F2B84B",
  },
  fondoBlanco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "58%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    zIndex: 2,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    zIndex: 2,
    gap: 16,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    maxWidth: 400,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pressedButton: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonA: {
    backgroundColor: "#B8D95B",
  },
  buttonB: {
    backgroundColor: "#F2B84B",
  },
});