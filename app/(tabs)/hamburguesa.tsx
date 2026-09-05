import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Restaurante() {
  const [cantidad, setCantidad] = useState(5);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.yellowBackground} />

        <Pressable style={styles.menuButton}>
          <Ionicons name="menu" size={32} color="#FFFFFF" />
        </Pressable>

        <Image
          source={require("../../assets/images/local-haamburguesa.jpg")}
          style={styles.profile}
        />

        <Pressable style={styles.leftArrow}>
          <Ionicons name="chevron-back" size={34} color="#FFFFFF" />
        </Pressable>

        <Image
          source={require("../../assets/images/hamburguesa.avif")}
          style={styles.foodImage}
        />

        <Pressable style={styles.rightArrow}>
          <Ionicons name="chevron-forward" size={34} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Hamburguesa</Text>
            <Text style={styles.price}>$5.50</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={23} color="#000000" />
              <Text style={styles.infoText}>4.9</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="truck"
                size={25}
                color="#000000"
              />
              <Text style={styles.infoText}>Free</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={25} color="#000000" />
              <Text style={styles.infoText}>25 min</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Deliciosa hamburguesa preparada con una jugosa carne, queso
            derretido, lechuga fresca, tomate y una deliciosa salsa,
            acompañada de un pan suave y tostado. Perfecta para disfrutar
            en cualquier momento.
          </Text>
        </View>

        <View style={styles.buyRow}>
          <Pressable
            style={styles.buyButton}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/pagos",
                params: { producto: "hamburguesa" },
              })
            }
          >
            <Text style={styles.buyText}>Comprar</Text>
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

      <View style={styles.bottomBar}>
        <Pressable>
          <Ionicons name="home-outline" size={27} color="#000000" />
        </Pressable>

        <Pressable>
          <MaterialCommunityIcons
            name="food-outline"
            size={29}
            color="#000000"
          />
        </Pressable>

        <Pressable>
          <Ionicons name="heart-outline" size={29} color="#000000" />
        </Pressable>

        <Pressable>
          <Ionicons name="clipboard-outline" size={28} color="#000000" />
        </Pressable>

        <Pressable>
          <Ionicons name="headset-outline" size={28} color="#000000" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topSection: {
    height: 360,
    position: "relative",
  },

  yellowBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 355,
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
    width: 310,
    height: 310,
    borderRadius: 155,
    top: 80,
    alignSelf: "center",
    zIndex: 5,
  },

  leftArrow: {
    position: "absolute",
    left: 35,
    top: 205,
    zIndex: 10,
  },

  rightArrow: {
    position: "absolute",
    right: 35,
    top: 205,
    zIndex: 10,
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
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
    marginBottom: 25,
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
    paddingHorizontal: 5,
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

  bottomBar: {
    height: 64,
    marginHorizontal: 0,
    marginBottom: 0,
    backgroundColor: "#F5A300",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});