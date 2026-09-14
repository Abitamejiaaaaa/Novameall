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
 
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

 
const { width } = Dimensions.get("window");
 
const categories = [
  {
    name: "Pasta",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Du39Coztmc4zlSJGok0bOuulRxjslHiPcV6eGVLbig&s=10",
  },
  {
    name: "Sandwiche",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WGJbAwxkH3nhKrR77JgskeDXeeLcWOLbt2waWplS8g&s=10",
  },
  {
    name: "Steak",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yqSxdU0-_3_KUIPOrs5qFTm482HqCIQqn6u-l6xBRg&s=10"
  },
  {
    name: "Pupusas",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjFs2pTpFeNnMBMmFW3wNlvT4VWn0cOBWF5tCktB4kw&s=10",
  },
];
 
export default function App() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("home");
 
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
 
  function If(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

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
              uri: "https://www.annarecetasfaciles.com/files/huevos-rotos-patatas-1024x575-1.jpg",
            }}
            style={styles.headerImage}
          />
 
          {}
          <View style={styles.headerOverlay} />
 
          <Text style={styles.title}>Dinners</Text>
 
          <TouchableOpacity style={styles.profileButton} onPress={()=> router.push("/CONFIGURACIpN-PERFIL")}>
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
            placeholder="Search food..."
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
 
        {
      }
 
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
                  "Selected category:",
                  category.name
                );
                if (category.name === "Pasta") {
                  router.push("/(tabs)/Espagueti");
                }else if (category.name === "Sandwich") {
                  router.push("/(tabs)/Sandwiche");
                }else if (category.name === "Steak") {
                  router.push("/(tabs)/Carne");
                }else if (category.name === "Pupusas") {
                  router.push("/(tabs)/pupusas");
                }
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
                Category not found
              </Text>
            </View>
          )}
 
        </ScrollView>
 
         
 
       <View style={styles.bottomBar}>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/Home')}>
                <Ionicons name="home-outline" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/CATEGORIAS')}>
                <MaterialCommunityIcons name="silverware-clean" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
                <Ionicons name="heart-outline" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/inbox')}>
                <Ionicons name="clipboard-outline" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/chat/${supportChatId')}>
                <FontAwesome5 name="headset" size={22} color="#111" />
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
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
 
  navText: {
    fontSize: 8,
 
    marginTop: 2,
 
    color: "#222",
  },

  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
 
});