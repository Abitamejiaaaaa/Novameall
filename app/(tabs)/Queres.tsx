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

export default function Queres() {
  const { width, height } = useWindowDimensions();

  function iniciarSesion() {
    throw new Error("Function not implemented.");
  }
  
 
  const dynamicStyles = StyleSheet.create({
    logo: {
      width: width * 0.5,
      height: width * 0.3,
      resizeMode: "contain",
    },
    buttonText: {
      fontSize: width * 0.045,
      fontWeight: "bold",
      color: "#000",
    },
  });

  return (
    <View style={styles.container}>

      <View style={[styles.fondoAmarillo, { height: height * 0.45 }]} />
      <View style={styles.fondoBlanco} />


      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/Logo.jpeg")}
          style={dynamicStyles.logo}
        />
      </View>


      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonA]}
          onPress={() => void iniciarSesion()}
        >
          <Text style={dynamicStyles.buttonText}>Are you a user?</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonB]}
          onPress={() => void iniciarSesion()}
        >
          <Text style={dynamicStyles.buttonText}>Are you a restkkkkkaurant?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    height: "60%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "80%",
    maxWidth: 300,
    height: 150,
    justifyContent: "center",
    marginTop: 60,
    borderRadius: 30,
    elevation: 5, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 2,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 2,
    gap: 15, 
  },
  button: {
    width: "90%",
    maxWidth: 400,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonA: {
    backgroundColor: "#B8D95B",
  },
  buttonB: {
    backgroundColor: "#F2B84B",
  },
});