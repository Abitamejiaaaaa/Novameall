import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Bubble, Send, IMessage } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

import { db, auth } from '../../Firebase/chat';

const logo = require('../../assets/images/Logo.jpeg');

export default function SupportChatScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // Detectar al usuario REAL que inició sesión en Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setFirebaseUser(user);
    });

    return unsubscribe;
  }, []);

  // Escuchar los mensajes
  useEffect(() => {
    if (!chatId || !firebaseUser) return;

    const ref = collection(
      db,
      'chats',
      String(chatId),
      'messages'
    );

    const q = query(
      ref,
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const loadedMessages: IMessage[] = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            _id: doc.id,
            text: data.text || '',
            createdAt:
              data.createdAt?.toDate?.() || new Date(),
            user: {
              _id: data.user?._id || 'soporte',
              name: data.user?.name || 'NovaMeall Support',
            },
          };
        });

        setMessages(loadedMessages);
      },
      error => {
        console.log('Error leyendo mensajes:', error);
      }
    );

    return unsubscribe;
  }, [chatId, firebaseUser]);

  // Enviar mensaje
  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!chatId || !newMessages.length || !firebaseUser) {
        console.log('No hay usuario autenticado.');
        return;
      }

      const message = newMessages[0];

      try {
        const ref = collection(
          db,
          'chats',
          String(chatId),
          'messages'
        );

        await addDoc(ref, {
          text: message.text,
          createdAt: serverTimestamp(),
          user: {
            _id: firebaseUser.uid,
            name:
              firebaseUser.displayName ||
              firebaseUser.email ||
              'Customer',
          },
        });
      } catch (error) {
        console.log('Error enviando mensaje:', error);
      }
    },
    [chatId, firebaseUser]
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

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            NovaMeall Support
          </Text>

          <Text style={styles.online}>
            ● We're here to help
          </Text>
        </View>

        <Ionicons
          name="headset-outline"
          size={25}
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

          <View>
            <Text style={styles.welcomeTitle}>
              How can we help?
            </Text>

            <Text style={styles.welcomeText}>
              Send us a message and we'll help you.
            </Text>
          </View>
        </View>

        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: firebaseUser?.uid || 'no-auth',
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
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000000',
  },

  online: {
    color: '#000000',
    fontSize: 12,
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
    gap: 10,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F4BB45',
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