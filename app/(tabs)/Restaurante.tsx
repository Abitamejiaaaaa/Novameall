
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
 
const width = Dimensions.get("window").width;
const supportChatId = 'support';
 
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
              <TouchableOpacity
                style={styles.navButton}
                activeOpacity={0.7}
                onPress={() => router.push(`/chat/${supportChatId}`)}
              >
                <FontAwesome5 name="headset" size={22} color="#111" />
              </TouchableOpacity>
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
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navButton: {
    padding: 1,
  },
});

