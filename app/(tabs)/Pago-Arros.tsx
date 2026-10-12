import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SUPPORT_CHAT_ID } from '@/constants/navigation';

export default function Pago() {
  const params = useLocalSearchParams();
  const cantidadRecibida = params.cantidadArros ? Number(params.cantidadArros) : 1;

  const lat = params.lat ? Number(params.lat) : null;
  const lng = params.lng ? Number(params.lng) : null;

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Onion Rings', precioUnitario: 2.67, cantidad: cantidadRecibida, imagen: require('@/assets/images/ARROS.png') },
  ]);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    return cleaned;
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Enter a valid 16-digit card number';
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) newErrors.expiryDate = 'Enter a valid date (MM/YY)';
    if (!cvv || !/^\d{3,4}$/.test(cvv)) newErrors.cvv = 'Enter a valid CVV';
    if (!cardName || cardName.trim().length < 3) newErrors.cardName = 'Enter the name on the card';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subtotal = productos.reduce((suma, prod) => suma + (prod.precioUnitario * prod.cantidad), 0);
  const costoEnvio = 0.00;
  const total = subtotal + costoEnvio;

  function simulacionDeCompra() {
    if (!validateForm()) {
      Toast.show({ type: 'error', text1: 'Invalid Data', text2: 'Please check the card information.' });
      return;
    }
    Toast.show({ type: 'success', text1: 'Payment successful', text2: 'Your order has been successfully processed.' });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={() => router.push("/Home")}>
              <Ionicons name="arrow-back" size={21} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Payment</Text>
          </View>

          <Text style={styles.section}>Payment Method</Text>
          
          <View style={styles.cardForm}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={[styles.input, errors.cardNumber && styles.inputError]}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={(text) => {
                  setCardNumber(formatCardNumber(text));
                  if (errors.cardNumber) {
                    setErrors(prev => ({ ...prev, cardNumber: '' }));
                  }
                }}
                keyboardType="numeric"
                maxLength={19}
              />
              {errors.cardNumber ? <Text style={styles.errorText}>{errors.cardNumber}</Text> : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Name on Card</Text>
              <TextInput
                style={[styles.input, errors.cardName && styles.inputError]}
                placeholder="John Doe"
                value={cardName}
                onChangeText={(text) => {
                  setCardName(text);
                  if (errors.cardName) {
                    setErrors(prev => ({ ...prev, cardName: '' }));
                  }
                }}
                autoCapitalize="words"
              />
              {errors.cardName ? <Text style={styles.errorText}>{errors.cardName}</Text> : null}
            </View>

            <View style={styles.rowInputs}>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={[styles.input, errors.expiryDate && styles.inputError]}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => {
                    setExpiryDate(formatExpiryDate(text));
                    if (errors.expiryDate) {
                      setErrors(prev => ({ ...prev, expiryDate: '' }));
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={5}
                />
                {errors.expiryDate ? <Text style={styles.errorText}>{errors.expiryDate}</Text> : null}
              </View>

              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.cvvContainer}>
                  <TextInput
                    style={[styles.input, styles.cvvInput, errors.cvv && styles.inputError]}
                    placeholder="123"
                    value={cvv}
                    onChangeText={(text) => {
                      setCvv(text.replace(/\D/g, '').slice(0, 4));
                      if (errors.cvv) {
                        setErrors(prev => ({ ...prev, cvv: '' }));
                      }
                    }}
                    keyboardType="numeric"
                    secureTextEntry={!showCvv}
                    maxLength={4}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowCvv(!showCvv)}
                  >
                    <Ionicons name={showCvv ? 'eye-off' : 'eye'} size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {errors.cvv ? <Text style={styles.errorText}>{errors.cvv}</Text> : null}
              </View>
            </View>
          </View>

          <Text style={styles.section}>Delivery Address </Text>

          <TouchableOpacity 
            style={styles.address} 
            onPress={() => router.push({
              pathname: "/mapa",
              params: { returnScreen: "/Pago-Americano" }
            })}
          >
            <Ionicons name="location" size={23} color="#000" style={{ marginTop: 2 }} />
            <View style={styles.info}>
              <Text style={styles.bold}>
                {lat && lng ? "Location selected on Map" : "My Home"}
              </Text>
              <Text style={styles.addressText}>
                {lat && lng 
                  ? `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
                  : "Colonia Las Flores, Main Street, House #12, Ciudad Arce, La Libertad."
                }
              </Text>
              <Text style={styles.orangeText}>Change Address </Text>
            </View>
            <Ionicons name="chevron-forward" size={25} color="#000" />
          </TouchableOpacity>

          <Text style={styles.section}>Order Summary</Text>
          <View style={styles.order}>
            {productos.map((prod) => (
              <View style={styles.product} key={prod.id}>
                <Image source={prod.imagen} style={styles.productImage} />
                <View style={styles.info}>
                  <Text style={styles.productName}>{prod.nombre}</Text>
                  <Text style={styles.quantityProduct}>x{prod.cantidad}</Text>
                </View>
                <Text style={styles.price}>${(prod.precioUnitario * prod.cantidad).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.row}>
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Shipping</Text>
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

          <TouchableOpacity style={styles.confirm} onPress={()=> simulacionDeCompra()}>
            <Ionicons name="lock-closed" size={18} color="#fff" />
            <Text style={styles.confirmText}>Confirm Order</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>


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
                onPress={() => router.push(`/chat/${SUPPORT_CHAT_ID}`)}
              >
                <FontAwesome5 name="headset" size={22} color="#111" />
              </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEEEEE' },
  content: { flex: 1, backgroundColor: '#FFFFFF', margin: 7, marginBottom: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20 },
  scroll: { paddingTop: 14, paddingBottom: 70 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  back: { width: 40, height: 40, borderRadius: 22, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontSize: 25, fontWeight: 'bold' },
  section: { fontSize: 19, fontWeight: 'bold', marginTop: 7, marginBottom: 8 },
  box: { height: 75, backgroundColor: '#FFF4D9', borderWidth: 1.5, borderColor: '#E9C65A', borderRadius: 8, flexDirection: 'row', alignItems: 'center', padding: 11 },
  visa: { width: 55, height: 40, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  visaText: { color: '#174A9E', fontWeight: '900', fontSize: 15 },
  info: { flex: 1 },
  bold: { fontSize: 17, fontWeight: 'bold' },
  orangeText: { color: '#D98927', fontSize: 13, marginTop: 3 },
  address: { minHeight: 105, backgroundColor: '#FFF4D9', borderWidth: 1.5, borderColor: '#E9C65A', borderRadius: 8, flexDirection: 'row', padding: 11 },
  addressText: { fontSize: 13, color: '#555', lineHeight: 18, marginTop: 3 },
  order: { borderWidth: 1.5, borderColor: '#CCC', borderRadius: 8, overflow: 'hidden' },
  product: { minHeight: 67, flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: 1, borderColor: '#DDD' },
  productImage: { width: 52, height: 52, borderRadius: 6, marginRight: 10 },
  productName: { fontSize: 15, fontWeight: 'bold' },
  quantityProduct: { fontSize: 13, color: '#D95C28', marginTop: 3 },
  price: { fontSize: 15, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 6, paddingHorizontal: 13 },
  dashed: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#999', marginHorizontal: 13 },
  total: { fontSize: 17, fontWeight: 'bold' },
  protected: { flexDirection: 'row', alignItems: 'center', padding: 9 },
  protectedText: { marginLeft: 5, color: '#555', fontSize: 13 },
  confirm: { height: 55, backgroundColor: '#F7952D', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  confirmText: { color: '#FFF', fontWeight: 'bold', fontSize: 17, marginLeft: 8 },
  bottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, backgroundColor: '#FF9800', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
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
  cardForm: {
    backgroundColor: '#FFF4D9',
    borderWidth: 1.5,
    borderColor: '#E9C65A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 12,
  },
  formGroupHalf: {
    flex: 1,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#D95C28',
  },
  errorText: {
    color: '#D95C28',
    fontSize: 11,
    marginTop: 3,
  },
  cvvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvvInput: {
    flex: 1,
  },
  eyeButton: {
    padding: 8,
    marginLeft: 5,
  },
});
