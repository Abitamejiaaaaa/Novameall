import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
 
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
 
 
const tacosImg = require('../../assets/images/tacos.jpg');
const restauranteImg = require('../../assets/images/Restaurante.jpeg');
const promoImg = require('../../assets/images/imagen.jpeg');
 
const { width } = Dimensions.get('window');
 
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
 
interface Category {
  id: string;
  name: string;
  icon: MaterialIconName;
}
 
const CATEGORIES: Category[] = [
  { id: '1', name: 'Snacks', icon: 'cookie-outline' },
  { id: '2', name: 'Meals', icon: 'silverware-fork-knife' },
  { id: '3', name: 'Vegan', icon: 'carrot' },
  { id: '4', name: 'Desserts', icon: 'bowl-mix-outline' },
  { id: '5', name: 'Drinks', icon: 'glass-wine' },
];
 
export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelectOption = (rutaOAccion: string) => {
    setMenuVisible(false);
    
    if (rutaOAccion === 'Perfil') router.push('/(tabs)/CONFIGURACIpN-PERFIL');
    if (rutaOAccion === 'CATEGORIAS') router.push('/(tabs)/CATEGORIAS');
    if (rutaOAccion === 'Configuracion') router.push('/(tabs)/CONFIGURACION-NARANJA');
    if (rutaOAccion === 'Pedidos') router.push('/(tabs)/restaurant-order');
    if (rutaOAccion === 'Soporte') router.push('/chat/${supportChatId}');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C453" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.menuIconButton}
                activeOpacity={0.8}
                onPress={() => setMenuVisible(true)}
              >
                <Ionicons name="menu" size={24} color="#333" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
                <Ionicons name="swap-horizontal" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.8} onPress={() => router.push('/inbox')}>
              <Ionicons name="cart-outline" size={20} color="#E67E22" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.8} onPress={() => router.push('/inbox')}>
              <Ionicons name="notifications-outline" size={20} color="#E67E22" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.8} onPress={() => router.push('/(tabs)/CONFIGURACION-NARANJA')}>
              <Ionicons name="person-outline" size={20} color="#E67E22" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Welcome</Text>
          <Text style={styles.greetingSubtitle}>
            Savor every flavor and experience
          </Text>
        </View>

        <View style={styles.whiteSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((item) => {
              const isSelected = selectedCategory === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedCategory(item.id);

                    if (item.name === 'Snacks') {
                      router.push('/(tabs)/Galletas');
                    } else if (item.name === 'Meals') {
                      router.push('/(tabs)/pizza');
                    } else if (item.name === 'Vegan') {
                      router.push('/(tabs)/salah');
                    } else if (item.name === 'Desserts') {
                      router.push('/(tabs)/cake');
                    } else if (item.name === 'Drinks') {
                      router.push('/(tabs)/lemon');
                    }
                  }}
                >
                  <View style={[styles.categoryIconCircle, isSelected && styles.selectedCategoryCircle]}>
                    <MaterialCommunityIcons name={item.icon} size={30} color="#E67E22" />
                  </View>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.bestSellersContainer}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <View style={styles.cardsRow}>
              <TouchableOpacity style={styles.foodCard} activeOpacity={0.85} onPress={() => router.push('/tacos')}>
                <Image source={tacosImg} style={styles.foodImage} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.foodCard} activeOpacity={0.85} onPress={() => router.push('/Restaurante')}>
                <Image source={restauranteImg} style={styles.foodImage} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.promoBanner} activeOpacity={0.9}>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoText}>
                <Text style={styles.boldOrange}>Experience</Text>
                <Text style={styles.whiteText}>our latest </Text>
                <Text style={styles.boldOrange}>culinary </Text>
                <Text style={styles.boldOrange}>creations.</Text>
              </Text>
            </View>
            <Image source={promoImg} style={styles.promoImage} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('Perfil')}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('CATEGORIAS')}>
              <Ionicons name="list" size={20} color="#333" />
              <Text style={styles.menuText}>Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('Pedidos')}>
              <Ionicons name="clipboard-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('Soporte')}>
              <FontAwesome5 name="headset" size={18} color="#333" />
              <Text style={styles.menuText}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('Configuracion')}>
              <Ionicons name="settings-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

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
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/chat/${supportChatId')}>
                <FontAwesome5 name="headset" size={22} color="#111" />
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5C453',
  },
  scrollContent: {
    paddingBottom: 20,
  },
 
 
  topSection: {
    backgroundColor: '#F5C453',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 4,
    height: 44,
    marginBottom: 8,
  },
  menuIconButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#E67E22',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    marginTop: 15,
    paddingLeft: 25,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  greetingSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E67E22',
    marginTop: 2,
  },
 
  whiteSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 15,
    minHeight: 500,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  categoryCard: {
    alignItems: 'center',
    width: 65,
  },
  categoryIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FDEBD0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  selectedCategoryCircle: {
    backgroundColor: '#FAD7A0',
    borderWidth: 2,
    borderColor: '#E67E22',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
 
  bestSellersContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodCard: {
    width: '48%',
    height: 135,
    borderRadius: 20,
    backgroundColor: '#FAD7A0',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
 
 
  promoBanner: {
    backgroundColor: '#F5C453',
    marginHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    height: 180,
    overflow: 'hidden',
  },
  promoTextContainer: {
    flex: 0.9,
    padding: 16,
    justifyContent: 'center',
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  boldOrange: {
    color: '#E67E22',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  promoImage: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover',
    width: 1000
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
    padding: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingLeft: 16,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    width: 220,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});