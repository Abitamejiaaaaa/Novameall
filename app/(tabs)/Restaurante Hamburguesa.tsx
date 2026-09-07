import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const width = Dimensions.get("window").width;

export default function Explorar() {
  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.card}>

          <Image
            source={require("../../assets/images/Hamburguesa.jpeg")} style={styles.restaurantImage}
          />

          <Text style={styles.title}>
            HAMBURGER K
          </Text>

          <Text style={styles.description}>
        
          Un lugar pensado para los amantes de las hamburguesas, 
          donde el sabor, la calidad y los ingredientes frescos se 
          combinan en cada preparación. El aroma de la carne recién 
          cocinada y el pan tostado hacen que sea imposible resistirse.
          </Text>

          <Text style={styles.description}>
            Cada hamburguesa está preparada con ingredientes seleccionados,
             acompañada de vegetales frescos, queso, salsas especiales
              y papas crujientes. El ambiente es moderno, divertido y perfecto 
             para compartir.
          </Text>

          <Text style={styles.description}>
            Aquí encontrarás hamburguesas clásicas, 
            dobles y especiales, además de diferentes
             combinaciones de ingredientes y salsas. Una opción ideal 
             para disfrutar de una comida deliciosa, rápida y llena de sabor.
          </Text>

          <Pressable style={styles.productsButton}>
            <Text style={styles.productsText}>
              Explorar sus productos
            </Text>
          </Pressable>

        </View>

      </ScrollView>

      <View style={styles.bottomBar}>

        <Pressable style={styles.navButton}>
          <Ionicons
            name="home-outline"
            size={28}
            color="#432400"
          />
        </Pressable>

        <Pressable style={styles.navButton}>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={28}
            color="#432400"
          />
        </Pressable>

        <Pressable style={styles.navButton}>
          <Ionicons
            name="heart-outline"
            size={30}
            color="#432400"
          />
        </Pressable>

        <Pressable style={styles.navButton}>
          <Ionicons
            name="clipboard-outline"
            size={28}
            color="#432400"
          />
        </Pressable>

        <Pressable style={styles.navButton}>
          <Ionicons
            name="headset-outline"
            size={28}
            color="#432400"
          />
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFD45F",
  },

  scrollContent: {
    paddingHorizontal: width * 0.055,
    paddingTop: 25,
    paddingBottom: 80,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    paddingHorizontal: width * 0.07,
    paddingTop: 25,
    paddingBottom: 28,
    alignItems: "center",
  },

  restaurantImage: {
    width: width * 0.47,
    height: width * 0.47,
    borderRadius: width * 0.235,
    resizeMode: "cover",
    marginBottom: 16,
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    color: "#432400",
    marginBottom: 17,
  },

  description: {
    width: "100%",
    fontSize: width * 0.038,
    lineHeight: width * 0.053,
    color: "#4A3515",
    fontWeight: "500",
    marginBottom: 18,
    textAlign: "left",
  },

  productsButton: {
    width: "96%",
    height: 58,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },

  productsText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#E9CB68",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 62,
    backgroundColor: "#FF9D00",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  navButton: {
    width: 42,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },

});