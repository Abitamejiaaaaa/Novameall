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

export default function Cantidad() {
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => {
    setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const irAPagar = () => {
    router.push({
      pathname: "/Pago-GALLETA",
      params: { cantidadGalletas: cantidad },
    });
  };

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

          <Pressable onPress={() => router.push("/(tabs)/Restaurante")}>
            <Image
              source={require("@/assets/images/Galletas.png")}
              style={styles.profile}
            />
          </Pressable>

          <Pressable style={styles.leftArrow} onPress={router.back}>
            <Ionicons name="chevron-back" size={34} color="#FFFFFF" />
          </Pressable>

          <Image
            source={require("@/assets/images/Galletas.png")}
            style={styles.foodImage}
          />

          <Pressable style={styles.rightArrow}>
            <Ionicons name="chevron-forward" size={34} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Galletas</Text>
            <Text style={styles.price}>$1.25</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={23} color="#000000" />
              <Text style={styles.infoText}>4.5</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="truck" size={25} color="#000000" />
              <Text style={styles.infoText}>Free</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={25} color="#000000" />
              <Text style={styles.infoText}>30 min</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Delight in the sweet, freshly baked perfection of our homemade chocolate chip cookies. Crispy on the outside, wonderfully soft on the inside, and loaded with rich chocolate flavor in every single bite.
          </Text>

          <View style={styles.buyRow}>
            <Pressable style={styles.buyButton} onPress={irAPagar}>
              <Text style={styles.buyText}>Buy</Text>
            </Pressable>

            <View style={styles.quantity}>
              <Pressable onPress={disminuir} style={styles.quantityButton}>
                <Text style={styles.quantitySymbol}>−</Text>
              </Pressable>

              <Text style={styles.quantityNumber}>{cantidad}</Text>

              <Pressable onPress={aumentar} style={styles.quantityButton}>
                <Text style={styles.quantitySymbol}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable onPress={() => router.push("/(tabs)/Home")}>
          <Ionicons name="home-outline" size={27} color="#000000" />
        </Pressable>

        <Pressable>
          <MaterialCommunityIcons name="food-outline" size={29} color="#000000" />
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
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { paddingBottom: 30 },
  topSection: { height: 360, position: "relative" },
  yellowBackground: { position: "absolute", top: 0, left: 0, right: 0, height: 355, backgroundColor: "#F6CF59", borderBottomLeftRadius: 45, borderBottomRightRadius: 45 },
  menuButton: { position: "absolute", top: 18, left: 22, zIndex: 10 },
  profile: { position: "absolute", top: 15, right: 22, width: 55, height: 55, borderRadius: 28, zIndex: 10, borderWidth: 2, borderColor: "#FFFFFF" },
  foodImage: { position: "absolute", width: 290, height: 290, borderRadius: 145, top: 80, alignSelf: "center", zIndex: 5 },
  leftArrow: { position: "absolute", left: 28, top: 205, zIndex: 10 },
  rightArrow: { position: "absolute", right: 28, top: 205, zIndex: 10 },
  content: { paddingHorizontal: 30, paddingTop: 15 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 31, fontWeight: "700", color: "#111111" },
  price: { fontSize: 29, fontWeight: "700", color: "#111111" },
  infoRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 7 },
  infoText: { fontSize: 17, fontWeight: "600", color: "#111111" },
  description: { fontSize: 15, lineHeight: 21, textAlign: "center", color: "#444444", paddingHorizontal: 5, marginBottom: 25 },
  buyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  buyButton: { backgroundColor: "#F6CF59", paddingVertical: 13, paddingHorizontal: 32, borderRadius: 25 },
  buyText: { fontSize: 17, fontWeight: "700", color: "#111111" },
  quantity: { flexDirection: "row", alignItems: "center", gap: 18 },
  quantityButton: { paddingHorizontal: 2 },
  quantitySymbol: { fontSize: 28, color: "#111111", fontWeight: "500" },
  quantityNumber: { fontSize: 19, fontWeight: "600", color: "#111111" },
  bottomBar: { height: 64, backgroundColor: "#F5A300", borderTopLeftRadius: 14, borderTopRightRadius: 14, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
});