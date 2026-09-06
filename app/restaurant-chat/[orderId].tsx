import { Ionicons } from '@expo/vector-icons';
import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';

// Firebase/chat is a JavaScript module without TypeScript declarations.
// @ts-expect-error The module is intentionally consumed as the existing JS implementation.
import { auth, db } from '../../Firebase/chat';

const logo = require('../../assets/images/Logo.jpeg');

const CUSTOMERS: Record<
  string,
  { name: string; orderNumber: string }
> = {
  'order-001': {
    name: 'Sofia Martinez',
    orderNumber: '1024',
  },
  'order-002': {
    name: 'Daniel Lopez',
    orderNumber: '1025',
  },
  'order-003': {
    name: 'Emma Rodriguez',
    orderNumber: '1026',
  },
  'order-004': {
    name: 'Michael Brown',
    orderNumber: '1027',
  },
};

export default function RestaurantChatScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  const currentOrderId = String(orderId || '');
  const customer = CUSTOMERS[currentOrderId];

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setFirebaseUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentOrderId || !firebaseUser) {
      return;
    }

    const messagesRef = collection(
      db,
      'orders',
      currentOrderId,
      'messages'
    );

    const messagesQuery = query(
      messagesRef,
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      snapshot => {
        const loadedMessages: IMessage[] = snapshot.docs.map(
          doc => {
            const data = doc.data({ serverTimestamps: 'estimate' });

            return {
              _id: doc.id,
              text: data.text || '',
              createdAt:
                data.createdAt?.toDate?.() || new Date(),
              user: {
                _id:
                  data.user?._id ||
                  'cliente',
                name:
                  data.user?.name ||
                  customer?.name ||
                  'Cliente',
              },
            };
          }
        );

        setMessages(loadedMessages);
      },
      error => {
        console.log(
          'Error leyendo mensajes:',
          error
        );
      }
    );

    return unsubscribe;
  }, [currentOrderId, firebaseUser]);


  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!currentOrderId) {
        return;
      }

      if (!firebaseUser) {
        console.log(
          'No hay usuario autenticado'
        );
        return;
      }

      if (!newMessages.length) {
        return;
      }

      const message = newMessages[0];

      if (!message.text.trim()) {
        return;
      }

      try {
        const messagesRef = collection(
          db,
          'orders',
          currentOrderId,
          'messages'
        );

        await addDoc(messagesRef, {
          text: message.text.trim(),

          createdAt: serverTimestamp(),

          user: {
            _id: firebaseUser.uid,
            name:
              firebaseUser.displayName ||
              firebaseUser.email ||
              'Restaurante',
          },

          senderType: 'restaurant',

          orderId: currentOrderId,
        });
      } catch (error) {
        console.log(
          'Error enviando mensaje:',
          error
        );
      }
    },
    [currentOrderId, firebaseUser]
  );

  const customerName =
    customer?.name || 'Cliente';

  const orderNumber =
    customer?.orderNumber ||
    currentOrderId;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#31583F"
          />
        </TouchableOpacity>

        <View style={styles.logoBox}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerInfo}>
          <Text
            style={styles.customerName}
            numberOfLines={1}
          >
            {customerName}
          </Text>

          <View style={styles.orderRow}>
            <View style={styles.onlineDot} />

            <Text style={styles.orderText}>
              Order #{orderNumber}
            </Text>
          </View>
        </View>

        <View style={styles.restaurantIcon}>
          <Ionicons
            name="restaurant-outline"
            size={23}
            color="#31583F"
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id:
              firebaseUser?.uid ||
              'restaurant',
          }}
            textInputProps={{
            style: styles.composer,
            placeholder: 'Write a message...',
            placeholderTextColor: '#808080'
          }}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                left: styles.leftBubble,
                right: styles.rightBubble,
              }}
              textStyle={{
                left: styles.leftText,
                right: styles.rightText,
              }}
            />
          )}

          renderSend={props => (
            <Send
              {...props}
            >
              <View
                style={[
                  styles.sendButton,
                  !firebaseUser &&
                    styles.sendDisabled,
                ]}
              >
                <Ionicons
                  name="send"
                  size={19}
                  color="#FFFFFF"
                />
              </View>
            </Send>
          )}

          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={
                styles.inputToolbar
              }
              primaryStyle={
                styles.inputPrimary
              }
            />
          )}

          renderComposer={props => (
            <Composer
              {...props}
              textInputProps={{
                style: styles.composer,
                placeholder: 'Write a message...',
                placeholderTextColor: '#808080',
              }}
            />
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E8',
  },

  header: {
    height: 100,
    backgroundColor: '#F4BB45',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E3A72F',
  },

  backButton: {
    marginRight: 8,
  },

  logoBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 13,
  },

  headerInfo: {
    flex: 1,
  },

  customerName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#000000',
  },

  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#31583F',
    marginRight: 5,
  },

  orderText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
  },

  restaurantIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatContainer: {
    flex: 1,
    backgroundColor: '#FFF8E8',
  },

  leftBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F4BB45',
    padding: 2,
  },

  rightBubble: {
    backgroundColor: '#4C8C63',
    borderRadius: 18,
    padding: 2,
  },

  leftText: {
    color: '#24352A',
    fontSize: 15,
  },

  rightText: {
    color: '#FFFFFF',
    fontSize: 15,
  },

  inputToolbar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F4BB45',
    paddingTop: 7,
    paddingBottom: 7,
    paddingHorizontal: 8,
  },

  inputPrimary: {
    alignItems: 'center',
  },

  composer: {
    backgroundColor: '#FFF8E8',
    borderWidth: 1,
    borderColor: '#F4BB45',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    marginLeft: 2,
    marginRight: 7,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 16,
    color: '#000000',
    minHeight: 42,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#4C8C63',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
    marginBottom: 0,
  },

  sendDisabled: {
    opacity: 0.45,
  },
});