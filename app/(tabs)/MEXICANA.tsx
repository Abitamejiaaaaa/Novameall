import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const restaurantes = [
  {
    id: 1,
    nombre: "Restaurante Mexicano",
    imagen:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1000",
  },
  {
    id: 2,
    nombre: "La Bikina",
    imagen:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1000",
  },
  {
    id: 3,
    nombre: "El Patrón",
    imagen:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1000",
  },
  {
    id: 4,
    nombre: "Taquería",
    imagen:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1000",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.phone}>
        
        {/* CONTENIDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* HEADER */}
          <View style={styles.header}>
            <Image
              source={{
                uri: "",
              }}
              style={styles.headerImage}
            />

            <View style={styles.overlay} />

            <Text style={styles.title}>Mexicana</Text>
          </View>

          {/* BUSCADOR */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder=""
              style={styles.searchInput}
            />

            <Ionicons
              name="search-outline"
              size={32}
              color="#111"
              style={styles.searchIcon}
            />
          </View>

          {/* RESTAURANTES */}
          <View style={styles.restaurantsContainer}>

            {restaurantes.map((restaurante) => (
              <TouchableOpacity
                key={restaurante.id}
                style={styles.restaurantCard}
                activeOpacity={0.8}
              >

                <Image
                  source={{ uri: restaurante.imagen }}
                  style={styles.restaurantImage}
                />

                {/* FLECHA */}
                <View style={styles.arrowContainer}>
                  <Ionicons
                    name="chevron-forward"
                    size={42}
                    color="#fff"
                  />
                </View>

              </TouchableOpacity>
            ))}

          </View>

        </ScrollView>

        {/* NAVBAR */}
        <View style={styles.bottomBar}>

          <TouchableOpacity>
            <Ionicons
              name="home-outline"
              size={32}
              color="#111"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={32}
              color="#111"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="heart-outline"
              size={34}
              color="#111"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="clipboard-outline"
              size={32}
              color="#111"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="headset-outline"
              size={32}
              color="#111"
            />
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  phone: {
    flex: 1,
    position: "relative",
  },

  scrollContent: {
    paddingBottom: 20,
  },

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

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },

  headerImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 15,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 15,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: width * 0.04,
  },

  searchIcon: {
    marginLeft: 10,
  },

  restaurantsContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    gap: 15,
  },

  restaurantCard: {
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
    height: 150,
  },

  restaurantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  arrowContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 5,
  },
});

