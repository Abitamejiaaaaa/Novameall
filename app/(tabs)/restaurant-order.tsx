import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type OrderStatus = 'Active' | 'Preparing' | 'Ready';

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  items: string;
  message: string;
  time: string;
  status: OrderStatus;
  unread: number;
};

const ORDERS: Order[] = [
  {
    id: 'order-001',
    orderNumber: '1024',
    customer: 'Sofia Martinez',
    items: '2 meals · 1 drink',
    message: 'Is my order ready?',
    time: '2 min ago',
    status: 'Active',
    unread: 2,
  },
  {
    id: 'order-002',
    orderNumber: '1025',
    customer: 'Daniel Lopez',
    items: '1 meal · 2 desserts',
    message: 'Thank you!',
    time: '8 min ago',
    status: 'Preparing',
    unread: 0,
  },
  {
    id: 'order-003',
    orderNumber: '1026',
    customer: 'Emma Rodriguez',
    items: '3 meals',
    message: 'Perfect, thanks!',
    time: '15 min ago',
    status: 'Ready',
    unread: 1,
  },
  {
    id: 'order-004',
    orderNumber: '1027',
    customer: 'Michael Brown',
    items: '2 meals',
    message: 'I will be there soon.',
    time: '22 min ago',
    status: 'Ready',
    unread: 0,
  },
];

const logo = require('../../assets/images/Logo.jpeg');

export default function RestaurantOrderScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return ORDERS;

    return ORDERS.filter(order =>
      `${order.customer} ${order.orderNumber} ${order.status} ${order.message}`
        .toLowerCase()
        .includes(text)
    );
  }, [search]);

  const openChat = (orderId: string) => {
    router.push({
      pathname: '/restaurant-chat/[orderId]',
      params: { orderId },
    });
  };

  const statusStyle = (status: OrderStatus) => {
    if (status === 'Preparing') {
      return {
        box: styles.preparing,
        dot: styles.preparingDot,
      };
    }

    if (status === 'Ready') {
      return {
        box: styles.ready,
        dot: styles.readyDot,
      };
    }

    return {
      box: styles.active,
      dot: styles.activeDot,
    };
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const status = statusStyle(item.status);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => openChat(item.id)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.customer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.customer.charAt(0)}
              </Text>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.name} numberOfLines={1}>
                {item.customer}
              </Text>

              <Text style={styles.orderNumber}>
                Order #{item.orderNumber}
              </Text>
            </View>
          </View>

          <View style={[styles.status, status.box]}>
            <View style={[styles.dot, status.dot]} />
            <Text style={styles.statusText}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="restaurant-outline"
            size={17}
            color="#D99A22"
          />

          <Text style={styles.items}>
            {item.items}
          </Text>

          <View style={styles.time}>
            <Ionicons
              name="time-outline"
              size={14}
              color="#D99A22"
            />

            <Text style={styles.timeText}>
              {item.time}
            </Text>
          </View>
        </View>

        <View style={styles.messageRow}>
          <View style={styles.messageIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color="#31583F"
            />
          </View>

          <View style={styles.messageContent}>
            <Text style={styles.messageLabel}>
              Latest message
            </Text>

            <Text
              style={styles.message}
              numberOfLines={1}
            >
              {item.message}
            </Text>
          </View>

          {item.unread > 0 && (
            <View style={styles.unread}>
              <Text style={styles.unreadText}>
                {item.unread}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.openChat}>
          <Text style={styles.openChatText}>
            Open private chat
          </Text>

          <View style={styles.arrow}>
            <Ionicons
              name="arrow-forward"
              size={17}
              color="#FFFFFF"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF8E8"
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.brand}>
                <View style={styles.logoBox}>
                  <Image
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>

                <View>
                  <Text style={styles.brandName}>
                    NovaMeall
                  </Text>

                  <View style={styles.restaurantRow}>
                    <View style={styles.onlineDot} />

                    <Text style={styles.restaurantText}>
                      Restaurant
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.bell}>
                <Ionicons
                  name="notifications-outline"
                  size={23}
                  color="#31583F"
                />

                <View style={styles.bellDot} />
              </TouchableOpacity>
            </View>

            <View style={styles.hero}>
              <View>
                <Text style={styles.heroTitle}>
                  Orders & Chats
                </Text>

                <Text style={styles.heroText}>
                  Manage your customer orders
                </Text>
              </View>

              <View style={styles.total}>
                <Text style={styles.totalNumber}>
                  {filteredOrders.length}
                </Text>

                <Text style={styles.totalText}>
                  orders
                </Text>
              </View>
            </View>

            <View style={styles.searchBox}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#D99A22"
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search orders..."
                placeholderTextColor="#8B8F87"
                style={styles.input}
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch('')}
                >
                  <Ionicons
                    name="close-circle"
                    size={19}
                    color="#D99A22"
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Your orders
              </Text>

              <Text style={styles.sectionText}>
                Tap an order to chat with the customer
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="search-outline"
                size={30}
                color="#D99A22"
              />
            </View>

            <Text style={styles.emptyTitle}>
              No orders found
            </Text>

            <Text style={styles.emptyText}>
              Try another search.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E8',
  },

  list: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBox: {
    width: 57,
    height: 57,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  logo: {
    width: 49,
    height: 49,
    borderRadius: 15,
  },

  brandName: {
    fontSize: 23,
    fontWeight: '900',
    color: '#F4BB45',
  },

  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4C8C63',
    marginRight: 6,
  },

  restaurantText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F4BB45',
  },

  bell: {
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bellDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F4BB45',
  },

  hero: {
    backgroundColor: '#F4BB45',
    borderRadius: 25,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#000000',
  },

  heroText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    marginTop: 4,
  },

  total: {
    backgroundColor: '#FFFFFF',
    width: 58,
    height: 58,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  totalNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },

  totalText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#000000',
  },

  searchBox: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F4BB45',
  },

  input: {
    flex: 1,
    marginLeft: 9,
    fontSize: 14,
    color: '#31583F',
    fontWeight: '600',
  },

  section: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },

  sectionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 3,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#F4BB45',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  customer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#F4BB45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
  },

  customerInfo: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
  },

  orderNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    marginTop: 2,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  active: {
    backgroundColor: '#E8F3E9',
  },

  preparing: {
    backgroundColor: '#FFF0C9',
  },

  ready: {
    backgroundColor: '#E8F3E9',
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  activeDot: {
    backgroundColor: '#4C8C63',
  },

  preparingDot: {
    backgroundColor: '#D99A22',
  },

  readyDot: {
    backgroundColor: '#4C8C63',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000000',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },

  items: {
    marginLeft: 7,
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },

  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  timeText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E8',
    borderRadius: 16,
    padding: 9,
    marginTop: 12,
  },

  messageIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#F4BB45',
    alignItems: 'center',
    justifyContent: 'center', 
    marginRight: 9,
  },

  messageContent: {
    flex: 1,
  },

  messageLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000000',
  },

  message: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    marginTop: 2,
  },

  unread: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#F4BB45',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
  },

  unreadText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000000',
  },

  openChat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 11,
  },

  openChatText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#030303',
    marginRight: 7,
  },

  arrow: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#4C8C63',
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty: {
    alignItems: 'center',
    paddingTop: 50,
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#F4BB45',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#000000',
  },

  emptyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 4,
  },
});