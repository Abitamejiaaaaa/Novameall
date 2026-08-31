import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const categories = [
  {
    name: "Mexicana",
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Sopas",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Pastas",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Mariscos",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("home");

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFD34E"
      />

      <View style={styles.container}>

        {}

        <View style={styles.header}>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
            }}
            style={styles.headerImage}
          />

          {/* Oscurecer un poco la imagen */}
          <View style={styles.headerOverlay} />

          <Text style={styles.title}>Almuerzos</Text>

          <TouchableOpacity style={styles.profileButton}>
            <Ionicons
              name="person"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>

        </View>

        {}

        <View style={styles.searchContainer}>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar comida..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />

          <Ionicons
            name="search-outline"
            size={31}
            color="#222"
            style={styles.searchIcon}
          />

        </View>

        {/* ================= CATEGORÍAS ================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {filteredCategories.map((category, index) => (

            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              style={styles.categoryCard}
              onPress={() => {
                console.log(
                  "Categoría seleccionada:",
                  category.name
                );
              }}
            >

              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />

              <View style={styles.categoryOverlay} />

              <Text style={styles.categoryText}>
                {category.name}
              </Text>

              <Ionicons
                name="chevron-forward-outline"
                size={48}
                color="#FFFFFF"
                style={styles.arrow}
              />

            </TouchableOpacity>

          ))}

          {filteredCategories.length === 0 && (
            <View style={styles.noResults}>
              <Ionicons
                name="search-outline"
                size={50}
                color="#777"
              />

              <Text style={styles.noResultsText}>
                No se encontró esa categoría
              </Text>
            </View>
          )}

        </ScrollView>

       

        <View style={styles.bottomNavigation}>

          

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActive("home")}
          >
            <Ionicons
              name={
                active === "home"
                  ? "home"
                  : "home-outline"
              }
              size={30}
              color="#222"
            />

            <Text style={styles.navText}>
              Inicio
            </Text>
          </TouchableOpacity>

          {/* RESTAURANTES */}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActive("restaurants")}
          >
            <Ionicons
              name="restaurant-outline"
              size={30}
              color="#222"
            />

            <Text style={styles.navText}>
              Restaurantes
            </Text>
          </TouchableOpacity>

          {/* FAVORITOS */}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActive("favorites")}
          >
            <Ionicons
              name={
                active === "favorites"
                  ? "heart"
                  : "heart-outline"
              }
              size={30}
              color="#222"
            />

            <Text style={styles.navText}>
              Favoritos
            </Text>
          </TouchableOpacity>

          {/* PEDIDOS */}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActive("orders")}
          >
            <Ionicons
              name="clipboard-outline"
              size={30}
              color="#222"
            />

            <Text style={styles.navText}>
              Pedidos
            </Text>
          </TouchableOpacity>

          {/* SOPORTE */}

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActive("support")}
          >
            <Ionicons
              name="headset-outline"
              size={30}
              color="#222"
            />

            <Text style={styles.navText}>
              Soporte
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#FFD34E",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFD34E",
  },

 

  header: {
    height: 195,
    marginHorizontal: 0,
    position: "relative",
    overflow: "hidden",

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  headerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    backgroundColor: "rgba(0,0,0,0.25)",
  },

  title: {
    position: "absolute",

    width: "100%",
    textAlign: "center",

    top: 80,

    color: "#FFFFFF",

    fontSize: 30,
    fontWeight: "700",

    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  profileButton: {
    position: "absolute",

    right: 18,
    top: 18,

    width: 48,
    height: 48,

    borderRadius: 24,

    alignItems: "center",
    justifyContent: "center",
  },

 

  searchContainer: {
    height: 55,

    marginHorizontal: 52,
    marginTop: -2,
    marginBottom: 22,

    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    flexDirection: "row",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  searchInput: {
    flex: 1,

    height: "100%",

    paddingLeft: 22,
    paddingRight: 5,

    fontSize: 17,

    color: "#222",
  },

  searchIcon: {
    marginRight: 17,
  },

 

  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 15,
  },


  categoryCard: {
    width: "92%",
    height: 108,

    alignSelf: "center",

    marginBottom: 20,

    borderRadius: 25,

    overflow: "hidden",

    position: "relative",

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  categoryImage: {
    position: "absolute",

    width: "100%",
    height: "100%",

    resizeMode: "cover",
  },

  categoryOverlay: {
    position: "absolute",

    width: "100%",
    height: "100%",

    backgroundColor: "rgba(0,0,0,0.25)",
  },

  categoryText: {
    position: "absolute",

    left: 20,
    top: 28,

    color: "#FFFFFF",

    fontSize: 34,

    fontWeight: "800",

    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  arrow: {
    position: "absolute",

    right: 18,
    top: 28,
  },

 

  noResults: {
    alignItems: "center",
    justifyContent: "center",

    marginTop: 40,
  },

  noResultsText: {
    marginTop: 15,

    fontSize: 17,

    color: "#555",
  },

  

  bottomNavigation: {
    height: 78,

    marginHorizontal: 0,

    backgroundColor: "#FF9D00",

    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-around",

    paddingHorizontal: 5,
  },

  navButton: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontSize: 8,

    marginTop: 2,

    color: "#222",
  },

});