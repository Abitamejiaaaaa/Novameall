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
import { useWindowDimensions } from 'react-native';
 
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { SUPPORT_CHAT_ID } from '@/constants/navigation';
import { t } from '@/i18n';
 
 
const tacosImg = require('../../assets/images/tacos.jpg');
const restauranteImg = require('../../assets/images/Restaurante.jpeg');
const promoImg = require('../../assets/images/imagen.jpeg');
 
const { width, height } = useWindowDimensions();
 
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
 
interface Category {
  id: string;
  name: string;
  icon: MaterialIconName;
}
 
const CATEGORIES: Category[] = [
  { id: '1', name: 'categories.snacks', icon: 'cookie-outline' },
  { id: '2', name: 'categories.meals', icon: 'silverware-fork-knife' },
  { id: '3', name: 'categories.vegan', icon: 'carrot' },
  { id: '4', name: 'categories.desserts', icon: 'bowl-mix-outline' },
  { id: '5', name: 'categories.drinks', icon: 'glass-wine' },
];
 
export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelectOption = (rutaOAccion: string) => {
    setMenuVisible(false);
    
    if (rutaOAccion === 'profile') router.push('/(tabs)/CONFIGURACIpN-PERFIL');
    if (rutaOAccion === 'categories') router.push('/(tabs)/CATEGORIAS');
    if (rutaOAccion === 'settings') router.push('/(tabs)/CONFIGURACION-NARANJA');
    if (rutaOAccion === 'orders') router.push('/(tabs)/restaurant-order');
    if (rutaOAccion === 'support') router.push(`/chat/${SUPPORT_CHAT_ID}`);
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
          <Text style={styles.greetingTitle}>{t('home.welcome')}</Text>
          <Text style={styles.greetingSubtitle}>
            {t('home.subTitle')}
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

                    if (item.name === 'categories.snacks') {
                      router.push('/(tabs)/COSITAS' as never);
                    } else if (item.name === 'categories.meals') {
                      router.push('/(tabs)/CATEGORIAS');
                    } else if (item.name === 'categories.vegan') {
                      router.push('/(tabs)/Vegan' as never);
                    } else if (item.name === 'categories.desserts') {
                      router.push('/(tabs)/CATEGORIAS');
                    } else if (item.name === 'categories.drinks') {
                      router.push('/(tabs)/Zumitos' as never);
                    }
                  }}
                >
                  <View style={[styles.categoryIconCircle, isSelected && styles.selectedCategoryCircle]}>
                    <MaterialCommunityIcons name={item.icon} size={30} color="#E67E22" />
                  </View>
                  <Text style={styles.categoryText}>{t(item.name)}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.bestSellersContainer}>
            <Text style={styles.sectionTitle}>{t('home.bestSellers')}</Text>
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
                <Text style={styles.boldOrange}>{t('home.promoTitle.part1')}</Text>
                <Text style={styles.whiteText}>{t('home.promoTitle.part2')}</Text>
                <Text style={styles.boldOrange}>{t('home.promoTitle.part3')}</Text>
                <Text style={styles.boldOrange}>{t('home.promoTitle.part4')}</Text>
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
            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('profile')}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.menuText}>{t('home.menu.profile')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('categories')}>
              <Ionicons name="list" size={20} color="#333" />
              <Text style={styles.menuText}>{t('home.menu.categories')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('orders')}>
              <Ionicons name="clipboard-outline" size={20} color="#333" />
              <Text style={styles.menuText}>{t('home.menu.orders')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('support')}>
              <FontAwesome5 name="headset" size={18} color="#333" />
              <Text style={styles.menuText}>{t('home.menu.support')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleSelectOption('settings')}>
              <Ionicons name="settings-outline" size={20} color="#333" />
              <Text style={styles.menuText}>{t('home.menu.settings')}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.bottomBar}>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/Home')}>
                <Ionicons name="home-outline" size={26} color="#111" />
                <Text style={styles.navLabel}>{t('home.bottomNav.home')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/CATEGORIAS')}>
                <MaterialCommunityIcons name="silverware-clean" size={26} color="#111" />
                <Text style={styles.navLabel}>{t('home.bottomNav.categories')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
                <Ionicons name="heart-outline" size={26} color="#111" />
                <Text style={styles.navLabel}>{t('home.bottomNav.favorites')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/inbox')}>
                <Ionicons name="clipboard-outline" size={26} color="#111" />
                <Text style={styles.navLabel}>{t('home.bottomNav.orders')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push(`/chat/${SUPPORT_CHAT_ID}`)}>
                <FontAwesome5 name="headset" size={22} color="#111" />
                <Text style={styles.navLabel}>{t('home.bottomNav.support')}</Text>
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
    height: height > 700 ? 50 : 44,
    marginBottom: 8,
  },
  menuIconButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#E67E22',
    width: height > 700 ? 40 : 34,
    height: height > 700 ? 40 : 34,
    borderRadius: height > 700 ? 20 : 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconCircle: {
    width: height > 700 ? 44 : 38,
    height: height > 700 ? 44 : 38,
    borderRadius: height > 700 ? 22 : 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    marginTop: 15,
    paddingLeft: 25,
  },
  greetingTitle: {
    fontSize: width > 600 ? 28 : 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  greetingSubtitle: {
    fontSize: width > 600 ? 24 : 20,
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
    width: width > 600 ? 80 : 65,
    minWidth: 60,
  },
  categoryIconCircle: {
    width: width > 600 ? 70 : 58,
    height: width > 600 ? 70 : 58,
    borderRadius: width > 600 ? 35 : 29,
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
    fontSize: width > 600 ? 26 : 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: width > 600 ? 20 : 12,
  },
  foodCard: {
    width: width > 600 ? '30%' : '48%',
    minWidth: 160,
    maxWidth: 200,
    height: width > 600 ? 160 : 135,
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
    height: width > 600 ? 220 : 180,
    overflow: 'hidden',
    minHeight: 180,
  },
  promoTextContainer: {
    flex: 0.9,
    padding: 16,
    justifyContent: 'center',
  },
  promoText: {
    fontSize: width > 600 ? 22 : 18,
    fontWeight: 'bold',
    lineHeight: width > 600 ? 28 : 22,
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
    minWidth: 100,
  },
 
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    height: height > 700 ? 80 : 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 4,
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  navLabel: {
    fontSize: width > 400 ? 11 : 9,
    fontWeight: '600',
    color: '#111',
    marginTop: 2,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: height > 700 ? 80 : 60,
    paddingHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    width: width > 600 ? 280 : 220,
    maxWidth: '85%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuText: {
    marginLeft: 16,
    fontSize: width > 600 ? 18 : 16,
    color: '#333',
    fontWeight: '600',
  },
});