import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Pago() {
  const params = useLocalSearchParams();
  const cantidadRecibida = params.cantidadTacos ? Number(params.cantidadTacos) : 1;


  const lat = params.lat ? Number(params.lat) : null;
  const lng = params.lng ? Number(params.lng) : null;

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Taco al pastor', precioUnitario: 3.25, cantidad: cantidadRecibida, imagen: require('../../assets/images/tacos.jpg') },
    { id: 2, nombre: 'Soft Drink', precioUnitario: 1.75, cantidad: 2, imagen: require('../../assets/images/bebida.jpg') },
  ]);

  const subtotal = productos.reduce((suma, prod) => suma + (prod.precioUnitario * prod.cantidad), 0);
  const costoEnvio = 0.00;
  const total = subtotal + costoEnvio;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={() => router.push("/tacos")}>
              <Ionicons name="arrow-back" size={21} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Payment</Text>
          </View>

          <Text style={styles.section}>Payment Methood</Text>
          <TouchableOpacity style={styles.box}>
            <View style={styles.visa}>
              <Text style={styles.visaText}>VISA</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.bold}>Visa **** 4589</Text>
              <Text style={styles.orangeText}>Change Payment Methood</Text>
            </View>
            <Ionicons name="chevron-forward" size={25} color="#000" />
          </TouchableOpacity>

          <Text style={styles.section}>Delivery Address </Text>
          
          {/* SECCIÓN DE DIRECCIÓN DINÁMICA */}
          <TouchableOpacity style={styles.address} onPress={() => router.push("/MAPA")}>
            <Ionicons name="location" size={23} color="#000" style={{ marginTop: 2 }} />
            <View style={styles.info}>
              <Text style={styles.bold}>
                {lat && lng ? "Ubicación seleccionada en Mapa" : "My Home"}
              </Text>
              <Text style={styles.addressText}>
                {lat && lng 
                  ? `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
                  : "Colonia Las Flores, Calle Principal, Casa #12, Ciudad Arce, La Libertad."
                }
              </Text>
              <Text style={styles.orangeText}>Change Address </Text>
            </View>
            <Ionicons name="chevron-forward" size={25} color="#000" />
          </TouchableOpacity>

          {/* Resto de tu resumen de pedido... */}
          <Text style={styles.section}>Order Summary</Text>
          <View style={styles.order}>
            {productos.map((prod) => (
              <View style={styles.product} key={prod.id}>
                <Image source={prod.imagen} style={styles.productImage} />
                <View style={styles.info}>
                  <Text style={styles.productName}>{prod.nombre}</Text>
                  <Text style={styles.quantity}>x{prod.cantidad}</Text>
                </View>
                <Text style={styles.price}>${(prod.precioUnitario * prod.cantidad).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.row}>
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Envío</Text>
              <Text>${costoEnvio.toFixed(2)}</Text>
            </View>
            <View style={styles.dashed} />
            <View style={styles.row}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>${total.toFixed(2)}</Text>
            </View>

            <View style={styles.protected}>
              <Ionicons name="shield-checkmark" size={17} color="#333" />
              <Text style={styles.protectedText}>Your payments are protected</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirm}>
            <Ionicons name="lock-closed" size={18} color="#fff" />
            <Text style={styles.confirmText}>Confirn Order</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      {/* Barra inferior */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
          <Ionicons name="home-outline" size={27} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity><Ionicons name="restaurant-outline" size={27} color="#000" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="heart-outline" size={28} color="#000" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="clipboard-outline" size={27} color="#000" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person-outline" size={27} color="#000" /></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE' },

  content: { 
    flex: 1,
     backgroundColor: '#FFFFFF', margin: 7, marginBottom: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20 },
 
  scroll: {
    paddingTop: 14, 
    paddingBottom: 70 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10 },

  back: { width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12 },

  title: { 
  fontSize: 25,
  fontWeight: 'bold' },

  section: { 
  fontSize: 19,
  fontWeight: 'bold',
  marginTop: 7,
  marginBottom: 8 },
  
  box: { height: 75,
    backgroundColor: '#FFF4D9',
    borderWidth: 1.5,
    borderColor: '#E9C65A',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11 },

  visa: {
    width: 55,
    height: 40, 
    backgroundColor: '#FFF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 11 },

  visaText: { 
    color: '#174A9E', 
    fontWeight: '900', 
    fontSize: 15 },
  
  info: { 
    flex: 1 
  },
  bold: { 
    fontSize: 17, 
    fontWeight: 'bold' },

  orangeText: { 
    color: '#D98927', 
    fontSize: 13, 
    marginTop: 3 },
  
  address: { 
    minHeight: 105, 
    backgroundColor: '#FFF4D9', 
    borderWidth: 1.5, 
    borderColor: '#E9C65A', 
    borderRadius: 8, 
    flexDirection: 'row', 
    padding: 11 },

  addressText: { 
    fontSize: 13, 
    color: '#555', 
    lineHeight: 18, 
    marginTop: 3 },
  
  order: { 
    borderWidth: 1.5, 
    borderColor: '#CCC', 
    borderRadius: 8, 
    overflow: 'hidden' },

  product: { minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, 
    borderBottomWidth: 1, 
    borderColor: '#DDD' },

  productImage: { 
    width: 52, 
    height: 52, 
    borderRadius: 6, 
    marginRight: 10 },

  productName: { 
    fontSize: 15, 
    fontWeight: 'bold' },

  quantity: { 
    fontSize: 13, 
    color: '#D95C28', 
    marginTop: 3 },

  price: { 
    fontSize: 15, 
    fontWeight: 'bold' },

  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 6, 
    paddingHorizontal: 13 },

  dashed: { borderTopWidth: 1,
    borderStyle: 'dashed', 
    borderColor: '#999', 
    marginHorizontal: 13 },

  total: { 
    fontSize: 17, 
    fontWeight: 'bold' },

  protected: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 9 },

  protectedText: { 
    marginLeft: 5, 
    color: '#555', 
    fontSize: 13 },

  confirm: { 
    height: 55, 
    backgroundColor: '#F7952D', 
    borderRadius: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10 },

  confirmText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 17, 
    marginLeft: 8 },

  bottom: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 50, 
    backgroundColor: '#FF9800', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10 },

});