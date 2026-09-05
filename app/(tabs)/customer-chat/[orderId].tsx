import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  IMessage,
} from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import {
  Stack,
  useRouter,
  useLocalSearchParams,
} from 'expo-router';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../../../Firebase/chat';

const logo = require('../../../assets/images/Logo.jpeg');

export default function CustomerChatScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const user = {
    uid: 'cliente_temporal',
    displayName: 'Customer',
  };

  useEffect(() => {
    if (!orderId) return;

    const messagesRef = collection(
      db,
      'orders',
      String(orderId),
      'messages'
    );

    const messagesQuery = query(
      messagesRef,
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(
      messagesQuery,
      snapshot => {
        const newMessages: IMessage[] = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            _id: doc.id,
            text: data.text || '',
            createdAt:
              data.createdAt?.toDate?.() || new Date(),
            user: {
              _id: data.user?._id || 'unknown',
              name: data.user?.name || 'User',
            },
          };
        });

        setMessages(newMessages);
      },
      error => {
        console.error('Error loading messages:', error);
      }
    );
  }, [orderId]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!orderId || newMessages.length === 0) return;

      const message = newMessages[0];

      try {
        const messagesRef = collection(
          db,
          'orders',
          String(orderId),
          'messages'
        );

        await addDoc(messagesRef, {
          text: message.text,
          createdAt: serverTimestamp(),
          user: {
            _id: user.uid,
            name: user.displayName,
          },
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    [orderId]
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color="#31583F"
          />
        </TouchableOpacity>

        <Image
          source={logo}
          style={styles.logo}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.title}>
            NovaMeall Chat
          </Text>

          <Text style={styles.subtitle}>
            Order #{String(orderId).replace('order-', '')}
          </Text>
        </View>

        <Ionicons
          name="restaurant-outline"
          size={24}
          color="#31583F"
        />
      </View>

      <View style={styles.chat}>
        <View style={styles.welcome}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#D99A22"
          />

          <View style={styles.welcomeInfo}>
            <Text style={styles.welcomeTitle}>
              Chat with the restaurant
            </Text>

            <Text style={styles.welcomeText}>
              Ask about your order anytime.
            </Text>
          </View>
        </View>

        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: user.uid,
            name: user.displayName,
          }}
          placeholder="Write a message..."
          alwaysShowSend
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
            <Send {...props}>
              <View style={styles.send}>
                <Ionicons
                  name="send"
                  size={18}
                  color="#FFFFFF"
                />
              </View>
            </Send>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E8',
  },

  header: {
    height: 90,
    backgroundColor: '#F4BB45',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },

  headerInfo: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000000',
  },

  subtitle: {
    fontSize: 12,
    color: '#000000',
    marginTop: 3,
  },

  chat: {
    flex: 1,
    margin: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F4BB45',
  },

  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F4BB45',
  },

  welcomeInfo: {
    marginLeft: 10,
  },

  welcomeTitle: {
    fontWeight: '800',
    color: '#000000',
  },

  welcomeText: {
    fontSize: 11,
    color: '#000000',
    marginTop: 2,
  },

  leftBubble: {
    backgroundColor: '#FFF3D6',
    borderRadius: 18,
  },

  rightBubble: {
    backgroundColor: '#4C8C63',
    borderRadius: 18,
  },

  leftText: {
    color: '#000000',
  },

  rightText: {
    color: '#FFFFFF',
  },

  send: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F4BB45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
});