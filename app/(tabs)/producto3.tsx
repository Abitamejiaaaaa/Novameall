https://github.com/Abitamejiaaaaa/Novameall.git
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Cantidad() {
  const router = useRouter();
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
      pathname: "/Pago",
      params: { cantidadTacos: cantidad } 
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.yellowHeader}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/tacos.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.dots}>•••</Text>

        <TouchableOpacity style={styles.leftArrow}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.foodImageContainer}>
          <Image
            source={require('../../assets/images/tacos.jpg')}
            style={styles.foodImage}
            resizeMode="cover"
          />
        </View>

        <TouchableOpacity style={styles.rightArrow}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Tacos</Text>
          <Text style={styles.price}>$3.25</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>★</Text>
            <Text style={styles.infoText}>4.5</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>▰</Text>
            <Text style={styles.infoText}>Free</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>◷</Text>
            <Text style={styles.infoText}>3h</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Imagine the irresistible aroma of freshly grilled meat,
          the sizzling on the griddle, and the warmth of a soft tortilla
          embracing every ingredient. Our tacos are not just food:
          they are a direct journey into tradition, prepared with
          authentic recipes and that special touch only achieved
          with passion
        </Text>

        <View style={styles.descriptionDots}>
          <View style={styles.smallDot} />
          <View style={styles.smallDot} />
          <View style={styles.smallDot} />
        </View>

        <View style={styles.buyRow}>
          <TouchableOpacity style={styles.buyButton} onPress={irAPagar}>
            <Text style={styles.buyText}>Comprar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={aumentar}
          >
            <Text style={styles.quantitySymbol}>+</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{cantidad}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={disminuir}
          >
            <Text style={styles.quantitySymbol}>−</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/Home")}>
          <Text style={styles.navIcon}>⌂</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⌒</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>▣</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>♧</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },

  yellowHeader: {
    height: height * 0.37,
    backgroundColor: '#F7CF59',
    position: 'relative',
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  menuButton: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 32,
    height: 28,
    justifyContent: 'space-between',
    zIndex: 10,
  },

  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },

  profileContainer: {
    position: 'absolute',
    top: 10,
    right: 18,
    width: 37,
    height: 37,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  dots: {
    position: 'absolute',
    top: 76,
    right: 31,
    color: '#FFFFFF',
    fontSize: 17,
    letterSpacing: 2,
  },

  foodImageContainer: {
    position: 'absolute',
    top: height * 0.13,
    left: width / 2 - width * 0.22,
    width: width * 0.44,
    height: width * 0.44,
    borderRadius: width * 0.22,
    overflow: 'hidden',
  },

  foodImage: {
    width: '100%',
    height: '100%',
  },

  leftArrow: {
    position: 'absolute',
    left: 35,
    top: height * 0.22,
    width: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightArrow: {
    position: 'absolute',
    right: 25,
    top: height * 0.22,
    width: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '200',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -1,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingHorizontal: 18,
    paddingTop: 29,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  title: {
    fontSize: width * 0.07,
    fontWeight: '800',
    color: '#111111',
  },

  price: {
    fontSize: width * 0.065,
    fontWeight: '700',
    color: '#111111',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 22,
    paddingHorizontal: 15,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  infoIcon: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
  },

  infoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#222222',
  },

  description: {
    fontSize: 10.5,
    lineHeight: 14,
    color: '#333333',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 18,
    fontWeight: '400',
  },

  descriptionDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
    gap: 4,
  },

  smallDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#555555',
  },

  buyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 2,
  },

  buyButton: {
    backgroundColor: '#F7CF59',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginRight: 'auto',
  },

  buyText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },

  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantitySymbol: {
    fontSize: 23,
    color: '#111111',
    fontWeight: '400',
  },

  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 22,
    textAlign: 'center',
  },

  bottomBar: {
    height: 51,
    backgroundColor: '#FF9900',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 23,
    color: '#171717',
  },

  heartIcon: {
    fontSize: 29,
    color: '#171717',
  },
});