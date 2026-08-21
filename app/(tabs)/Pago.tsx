import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PagoScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >

          <View style={styles.header}>

            <TouchableOpacity
              style={styles.back}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Pago
            </Text>

          </View>

          <Text style={styles.section}>
            Método de pago
          </Text>

          <TouchableOpacity style={styles.box}>

            <View style={styles.visa}>
              <Text style={styles.visaText}>
                VISA
              </Text>
            </View>

            <View style={styles.info}>

              <Text style={styles.bold}>
                Visa **** 4589
              </Text>

              <Text style={styles.orangeText}>
                Cambiar método de pago
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={25}
              color="#000"
            />

          </TouchableOpacity>

          <Text style={styles.section}>
            Dirección de entrega
          </Text>

          <TouchableOpacity style={styles.address}>

            <Ionicons
              name="location"
              size={23}
              color="#000"
            />

            <View style={styles.info}>

              <Text style={styles.bold}>
                Mi casa
              </Text>

              <Text style={styles.addressText}>
                Colonia Las Flores, Calle Principal, Casa #12,
                Ciudad Arce, La Libertad.
              </Text>

              <Text style={styles.orangeText}>
                Cambiar dirección
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={25}
              color="#000"
            />

          </TouchableOpacity>

          <Text style={styles.section}>
            Resumen del pedido
          </Text>

          <View style={styles.order}>

            <View style={styles.product}>

              <Image
                source={require('../../assets/images/imagen.jpeg')}
                style={styles.productImage}
              />

              <View style={styles.info}>

                <Text style={styles.productName}>
                  Taco de pastor
                </Text>

                <Text style={styles.quantity}>
                  x2
                </Text>

              </View>

              <Text style={styles.price}>
                $2.65
              </Text>

            </View>

            <View style={styles.product}>

              <Image
                source={require('../../assets/images/bebida.jpg')}
                style={styles.productImage}
              />

              <View style={styles.info}>

                <Text style={styles.productName}>
                  Refresco
                </Text>

                <Text style={styles.quantity}>
                  x2
                </Text>

              </View>

              <Text style={styles.price}>
                $1.75
              </Text>

            </View>

            <View style={styles.row}>

              <Text>
                Subtotal
              </Text>

              <Text>
                $4.40
              </Text>

            </View>

            <View style={styles.row}>

              <Text>
                Envío
              </Text>

              <Text>
                $0.00
              </Text>

            </View>

            <View style={styles.dashed} />

            <View style={styles.row}>

              <Text style={styles.total}>
                Total
              </Text>

              <Text style={styles.total}>
                $4.40
              </Text>

            </View>

            <View style={styles.protected}>

              <Ionicons
                name="shield-checkmark"
                size={17}
                color="#333"
              />

              <Text style={styles.protectedText}>
                Tus pagos están protegidos
              </Text>

            </View>

          </View>

          <TouchableOpacity style={styles.confirm}>

            <Ionicons
              name="lock-closed"
              size={18}
              color="#fff"
            />

            <Text style={styles.confirmText}>
              Confirmar pedido
            </Text>

          </TouchableOpacity>

        </ScrollView>

      </View>

      <View style={styles.bottom}>

        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="home-outline"
            size={27}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="restaurant-outline"
            size={27}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="heart-outline"
            size={28}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="clipboard-outline"
            size={27}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="person-outline"
            size={27}
            color="#000"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },

  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 7,
    marginBottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
  },

  scroll: {
    paddingTop: 14,
    paddingBottom: 70,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  back: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  section: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 7,
    marginBottom: 8,
  },

  box: {
    height: 75,
    backgroundColor: '#FFF4D9',
    borderWidth: 1.5,
    borderColor: '#E9C65A',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11,
  },

  visa: {
    width: 55,
    height: 40,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  visaText: {
    color: '#174A9E',
    fontWeight: '900',
    fontSize: 15,
  },

  info: {
    flex: 1,
  },

  bold: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  orangeText: {
    color: '#D98927',
    fontSize: 13,
    marginTop: 3,
  },

  address: {
    minHeight: 105,
    backgroundColor: '#FFF4D9',
    borderWidth: 1.5,
    borderColor: '#E9C65A',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 11,
  },

  addressText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginTop: 3,
  },

  order: {
    borderWidth: 1.5,
    borderColor: '#CCC',
    borderRadius: 8,
    overflow: 'hidden',
  },

  product: {
    minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },

  productImage: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 10,
  },

  productName: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  quantity: {
    fontSize: 13,
    color: '#D95C28',
    marginTop: 3,
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    paddingHorizontal: 13,
  },

  dashed: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    marginHorizontal: 13,
  },

  total: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  protected: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 9,
  },

  protectedText: {
    marginLeft: 5,
    color: '#555',
    fontSize: 13,
  },

  confirm: {
    height: 55,
    backgroundColor: '#F7952D',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  confirmText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 8,
  },

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
    borderTopRightRadius: 10,
  },

});