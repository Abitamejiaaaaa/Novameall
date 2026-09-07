import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const productos: any = {
  hamburguesa: {
    nombre: "Hamburguesa",
    precio: 5.5,
    imagen: require("../../assets/images/hamburguesa.avif"),
  },
  pizza: {
    nombre: "Pizza",
    precio: 5.5,
    imagen: require("../../assets/images/Pizza.jpg"),
  },
  pollo: {
    nombre: "Pollo asado",
    precio: 6.50,
    imagen: require("../../assets/images/pollo-asado.png"),
  },
  espagueti: {
    nombre: "Espagueti",
    precio: 6.00,
    imagen: require("../../assets/images/spagueti.webp"),
  },
};

export default function PagoScreen() {
  const { producto } = useLocalSearchParams();

  const productoSeleccionado =
    productos[String(producto)] || productos.hamburguesa;

  const cantidad = 1;
  const subtotal = productoSeleccionado.precio * cantidad;
  const envio = 0;
  const total = subtotal + envio;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#FFFFFF"
            />
          </Pressable>

          <Text style={styles.headerTitle}>Payment</Text>
        </View>

        <Text style={styles.sectionTitle}>
          Payment Method
        </Text>

        <Pressable style={styles.paymentCard}>
          <View style={styles.visaBox}>
            <Text style={styles.visaText}>VISA</Text>
          </View>

          <View style={styles.paymentInfo}>
            <Text style={styles.cardNumber}>
              Visa **** 4589
            </Text>

            <Text style={styles.changeText}>
              Change Payment Method
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#000000"
          />
        </Pressable>

        <Text style={styles.sectionTitle}>
          Delivery Address
        </Text>

        <Pressable style={styles.addressCard}>
          <View style={styles.addressTop}>
            <View style={styles.addressMain}>
              <View style={styles.homeRow}>
                <Ionicons
                  name="location"
                  size={23}
                  color="#000000"
                />

                <Text style={styles.homeText}>
                  My Home
                </Text>
              </View>

              <Text style={styles.addressText}>
                Colonia Las Flores, Calle Principal, Casa
                {"\n"}#12, Ciudad Arce, La Libertad.
              </Text>

              <Text style={styles.changeText}>
                Change Address
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={24}
              color="#000000"
            />
          </View>
        </Pressable>

        <Text style={styles.sectionTitle}>
          Order Summary
        </Text>

        <View style={styles.orderCard}>
          <View style={styles.productRow}>
            <Image
              source={productoSeleccionado.imagen}
              style={styles.productImage}
            />

            <View style={styles.productInfo}>
              <Text
                style={styles.productName}
                numberOfLines={1}
              >
                {productoSeleccionado.nombre}
              </Text>

              <Text style={styles.quantity}>
                x1
              </Text>
            </View>

            <Text style={styles.productPrice}>
              ${productoSeleccionado.precio.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Subtotal
              </Text>

              <Text style={styles.priceValue}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Envío
              </Text>

              <Text style={styles.priceValue}>
                $0.00
              </Text>
            </View>

            <View style={styles.dashedLine} />

            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>
                Total
              </Text>

              <Text style={styles.totalValue}>
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.protectedRow}>
            <Ionicons
              name="shield-checkmark"
              size={19}
              color="#333333"
            />

            <Text style={styles.protectedText}>
              Your payments are protected
            </Text>
          </View>
        </View>

        <Pressable style={styles.confirmButton}>
          <Ionicons
            name="lock-closed"
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.confirmText}>
            Confirm Order
          </Text>
        </Pressable>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Ionicons
          name="home-outline"
          size={28}
          color="#000000"
        />

        <Ionicons
          name="restaurant-outline"
          size={28}
          color="#000000"
        />

        <Ionicons
          name="heart-outline"
          size={30}
          color="#000000"
        />

        <Ionicons
          name="bag-outline"
          size={29}
          color="#000000"
        />

        <Ionicons
          name="person-outline"
          size={29}
          color="#000000"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 75,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 31,
    fontWeight: "800",
    color: "#000000",
    marginLeft: 15,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 9,
  },

  paymentCard: {
    height: 82,
    backgroundColor: "#FFF4D9",
    borderWidth: 2,
    borderColor: "#E5C955",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 18,
  },

  visaBox: {
    width: 65,
    height: 56,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  visaText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#164A91",
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 13,
  },

  cardNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
  },

  changeText: {
    fontSize: 15,
    color: "#D28A24",
  },

  addressCard: {
    height: 118,
    backgroundColor: "#FFF4D9",
    borderWidth: 2,
    borderColor: "#E5C955",
    borderRadius: 14,
    padding: 13,
    marginBottom: 19,
  },

  addressTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  addressMain: {
    flex: 1,
  },

  homeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  homeText: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 6,
    color: "#000000",
  },

  addressText: {
    fontSize: 15,
    lineHeight: 21,
    color: "#666666",
    marginLeft: 7,
    marginBottom: 3,
  },

  orderCard: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },

  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 9,
  },

  productImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },

  productInfo: {
    flex: 1,
    marginLeft: 12,
  },

  productName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 4,
  },

  quantity: {
    fontSize: 15,
    color: "#D27E42",
  },

  productPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
  },

  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
  },

  priceSection: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },

  priceLabel: {
    fontSize: 16,
    color: "#111111",
  },

  priceValue: {
    fontSize: 16,
    color: "#111111",
  },

  dashedLine: {
    borderTopWidth: 1,
    borderColor: "#888888",
    borderStyle: "dashed",
    marginVertical: 3,
  },

  totalLabel: {
    fontSize: 19,
    fontWeight: "800",
    color: "#000000",
  },

  totalValue: {
    fontSize: 19,
    fontWeight: "800",
    color: "#000000",
  },

  protectedRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 10,
    paddingTop: 1,
  },

  protectedText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 6,
  },

  confirmButton: {
    height: 54,
    borderRadius: 13,
    backgroundColor: "#F79A25",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginLeft: 9,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 58,
    backgroundColor: "#FF9D00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});