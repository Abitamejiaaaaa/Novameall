
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
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
            source={require("../../assets/images/Restaurante.jpeg")}
            style={styles.restaurantImage}
          />
 
          <Text style={styles.title}>
            TAQUERIA PIKIN
          </Text>
 
          <Text style={styles.description}>
            In the heart of the city, this taquería blends
            the festive spirit of Mexico with the warmth
            of Salvadoran hospitality. The aroma of freshly
            made tortillas and charcoal‑grilled meat mixes
            with the cheerful music that accompanies every visit.
          </Text>
 
          <Text style={styles.description}>
            The tables, decorated with vibrant colors and 
            handcrafted details, invite you to stay and share.
          </Text>
 
          <Text style={styles.description}>
            Here, tacos are served generously, with fresh ingredients
            and sauces ranging from mild to boldly spicy. Local touches
            are never missing: curtido, refried beans, and even a hint of
            loroco for those seeking something different. It is a place where
            food not only nourishes, but also creates moments to remember.
          </Text>
 
          <Pressable style={styles.productsButton} onPress={() => router.push("/(tabs)/tacos")}>
            <Text style={styles.productsText}>
              Explore their products
            </Text>
          </Pressable>
 
        </View>
 
      </ScrollView>
 
      <View style={styles.bottomBar}>
 
        <Pressable style={styles.navButton}>
          <MaterialCommunityIcons
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
          <MaterialCommunityIcons
            name="heart-outline"
            size={30}
            color="#432400"
          />
        </Pressable>
 
        <Pressable style={styles.navButton}>
          <MaterialCommunityIcons
            name="clipboard-outline"
            size={28}
            color="#432400"
          />
        </Pressable>
 
        <Pressable style={styles.navButton}>
          <MaterialCommunityIcons
            name="headset"
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

