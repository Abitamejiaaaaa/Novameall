import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Restaurante() {
  const [cantidad, setCantidad] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.topSection}>
          <View style={styles.yellowBackground} />

          <Pressable style={styles.menuButton}>
            <Ionicons name="menu" size={32} color="#FFFFFF" />
          </Pressable>

          <Image
            source={require("../../assets/images/Restaurante.webp")}
            style={styles.profile}
          />

          <Pressable style={styles.leftArrow}>
            <Ionicons name="chevron-back" size={34} color="#FFFFFF" />
          </Pressable>

          <Image
            source={require("../../assets/images/Pizza.jpg")}
            style={styles.foodImage}
          />

          <Pressable style={styles.rightArrow}>
            <Ionicons name="chevron-forward" size={34} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Pizza</Text>
            <Text style={styles.price}>$5.50</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={23} color="#000000" />
              <Text style={styles.infoText}>4.8</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="truck" size={25} color="#000000" />
              <Text style={styles.infoText}>Free</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={25} color="#000000" />
              <Text style={styles.infoText}>3h</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Delicious pizza prepared with a soft and crispy crust, topped with
            melted cheese, tomato sauce, and fresh, delightful ingredients. A
            perfect option to enjoy and share.
          </Text>

          <View style={styles.buyRow}>
            <Pressable
              style={styles.buyButton}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/pagos",
                  params: { producto: "pizza" },
                })
              }
            >
              <Text style={styles.buyText}>Buy</Text>
            </Pressable>

            <View style={styles.quantity}>
              <Pressable
                onPress={() => setCantidad(cantidad + 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantitySymbol}>+</Text>
              </Pressable>

              <Text style={styles.quantityNumber}>{cantidad}</Text>

              <Pressable
                onPress={() =>
                  setCantidad(cantidad > 1 ? cantidad - 1 : 1)
                }
                style={styles.quantityButton}
              >
                <Text style={styles.quantitySymbol}>−</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  topSection: {
    height: 380,
    position: "relative",
  },
  yellowBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 335,
    backgroundColor: "#F6CF59",
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  menuButton: {
    position: "absolute",
    top: 18,
    left: 22,
    zIndex: 10,
  },
  profile: {
    position: "absolute",
    top: 15,
    right: 22,
    width: 55,
    height: 55,
    borderRadius: 28,
    zIndex: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  foodImage: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    top: 75,
    alignSelf: "center",
    zIndex: 5,
  },
  leftArrow: {
    position: "absolute",
    left: 25,
    top: 195,
    zIndex: 10,
  },
  rightArrow: {
    position: "absolute",
    right: 25,
    top: 195,
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#111111",
  },
  price: {
    fontSize: 29,
    fontWeight: "700",
    color: "#111111",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  infoText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111111",
  },
  description: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    color: "#444444",
    marginBottom: 25,
  },
  buyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buyButton: {
    backgroundColor: "#F6CF59",
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buyText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  quantityButton: {
    paddingHorizontal: 2,
  },
  quantitySymbol: {
    fontSize: 28,
    color: "#111111",
    fontWeight: "500",
  },
  quantityNumber: {
    fontSize: 19,
    fontWeight: "600",
    color: "#111111",
  },
});