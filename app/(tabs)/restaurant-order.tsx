import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  items: string;
  lastMessage: string;
  time: string;
  status: 'Active' | 'Preparing' | 'Ready';
  unread?: number;
};

const ORDERS: Order[] = [
  {
    id: 'order-001',
    orderNumber: '#1024',
    customer: 'Sofia Martinez',
    items: '2 meals · 1 drink',
    lastMessage: 'Is my order ready?',
    time: '2 min',
    status: 'Active',
    unread: 2,
  },
  {
    id: 'order-002',
    orderNumber: '#1025',
    customer: 'Daniel Lopez',
    items: '1 meal · 2 desserts',
    lastMessage: 'Thank you!',
    time: '8 min',
    status: 'Preparing',
  },
  {
    id: 'order-003',
    orderNumber: '#1026',
    customer: 'Emma Rodriguez',
    items: '3 meals',
    lastMessage: 'Perfect, thanks!',
    time: '15 min',
    status: 'Ready',
    unread: 1,
  },
];

export default function RestaurantOrderScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return ORDERS;

    return ORDERS.filter(
      order =>
        order.customer.toLowerCase().includes(text) ||
        order.orderNumber.toLowerCase().includes(text)
    );
  }, [search]);

  const openChat = (orderId: string) => {
    router.push({
      pathname: '/restaurant-inbox/chat/[orderId]',
      params: { orderId },
    });
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => openChat(item.id)}
    >
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.customer.charAt(0)}
          </Text>
        </View>

        <View style={styles.customerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.customerName}>{item.customer}</Text>

            {item.unread ? (
              <View style={styles.unread}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.orderNumber}>
            Order {item.orderNumber}
          </Text>
        </View>

        <Text style={styles.time}>{item.time}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.messageRow}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={19}
          color="#4C8C63"
        />

        <View style={styles.messageContent}>
          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </Text>

          <Text style={styles.items}>{item.items}</Text>
        </View>

        <View
          style={[
            styles.status,
            item.status === 'Ready'
              ? styles.ready
              : item.status === 'Preparing'
              ? styles.preparing
              : styles.active,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'Ready'
                ? styles.readyText
                : item.status === 'Preparing'
                ? styles.preparingText
                : styles.activeText,
            ]}
          >
            {item.status}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#A5B0A7"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>RESTAURANT</Text>
          <Text style={styles.title}>Orders & Chats</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="restaurant-outline"
            size={23}
            color="#245C3A"
          />
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={21}
          color="#829087"
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search orders or customers..."
          placeholderTextColor="#9AA49D"
          style={styles.input}
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#9AA49D"
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Active orders</Text>
          <Text style={styles.sectionSubtitle}>
            Tap an order to contact the customer
          </Text>
        </View>

        <View style={styles.count}>
          <Text style={styles.countText}>
            {filteredOrders.length}
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="search-outline"
                size={32}
                color="#4C8C63"
              />
            </View>

            <Text style={styles.emptyTitle}>No orders found</Text>

            <Text style={styles.emptyText}>
              Try searching with another customer or order number.
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
    backgroundColor: '#F7F8F4',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 22,
  },

  hello: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#6D8A76',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#173B27',
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E3F0E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBox: {
    height: 52,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E6EBE5',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#24352A',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#173B27',
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#829087',
    marginTop: 3,
  },

  count: {
    minWidth: 32,
    height: 30,
    paddingHorizontal: 9,
    borderRadius: 15,
    backgroundColor: '#DDEBDD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  countText: {
    color: '#28603D',
    fontWeight: '800',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#E8ECE7',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#DCECDF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#28603D',
  },

  customerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  customerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#24352A',
  },

  orderNumber: {
    fontSize: 12,
    color: '#849088',
    marginTop: 3,
  },

  unread: {
    marginLeft: 7,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#3F8055',
    justifyContent: 'center',
    alignItems: 'center',
  },

  unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  time: {
    fontSize: 11,
    color: '#9AA49D',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF1ED',
    marginVertical: 14,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  messageContent: {
    flex: 1,
    marginLeft: 9,
    marginRight: 8,
  },

  message: {
    fontSize: 13,
    fontWeight: '600',
    color: '#405047',
  },

  items: {
    fontSize: 11,
    color: '#9AA49D',
    marginTop: 3,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 7,
  },

  active: {
    backgroundColor: '#E5F1E7',
  },

  preparing: {
    backgroundColor: '#FFF0D8',
  },

  ready: {
    backgroundColor: '#E3EAF8',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },

  activeText: {
    color: '#34734A',
  },

  preparingText: {
    color: '#A66B19',
  },

  readyText: {
    color: '#46689C',
  },

  empty: {
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#E3F0E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#24352A',
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8A958E',
    marginTop: 7,
    lineHeight: 19,
  },
});