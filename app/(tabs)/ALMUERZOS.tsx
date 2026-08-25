import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

const width = Dimensions.get("window").width;

export default function Queres() {
  function iniciarSesion() {
    throw new Error("Function not implemented.");
  }

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

      
      <Pressable
        style={styles.button}
        onPress={() => void iniciarSesion()}
      >
        <Text style={styles.buttonText}>
          Are you an user?
        </Text>
      </Pressable>

      <Pressable
        style={styles.buttonB}
        onPress={() => void iniciarSesion()}
      >
        <Text style={styles.buttonText}>
          Are you a restaurant?
        </Text>
      </Pressable>

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
    marginTop: 150,
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


    buttonB: {
    width: "90%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 150,
    backgroundColor: "#F2B84B",
    zIndex: 1,
  },
});

