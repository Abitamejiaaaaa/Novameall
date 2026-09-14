import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
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
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Bubble, GiftedChat, IMessage, Send } from 'react-native-gifted-chat';

import { auth, db } from '../../Firebase/chat';

const logo = require('../../assets/images/Logo.jpeg');

export default function SupportChatScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();

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

  // Estilos dinámicos basados en el ancho de la pantalla
  const isLargeScreen = width > 768;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Responsivo */}
      <View style={[styles.header, { height: height * 0.11, paddingHorizontal: width * 0.04 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={isLargeScreen ? 32 : 28}
            color="#31583F"
          />
        </TouchableOpacity>

        <Image
          source={logo}
          style={[styles.logo, { width: isLargeScreen ? 56 : 46, height: isLargeScreen ? 56 : 46 }]}
        />

        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { fontSize: isLargeScreen ? 20 : 16 }]}>
            NovaMeall Support
          </Text>

          <Text style={[styles.online, { fontSize: isLargeScreen ? 14 : 11 }]}>
            ● We're here to help
          </Text>
        </View>

        <Ionicons
          name="headset-outline"
          size={isLargeScreen ? 30 : 24}
          color="#31583F"
        />
      </View>

      {/* Contenedor del Chat Responsivo */}
      <View style={[styles.chat, { maxWidth: isLargeScreen ? 800 : '100%', alignSelf: isLargeScreen ? 'center' : 'stretch', width: isLargeScreen ? '80%' : 'auto', maxHeight: isLargeScreen ? height * 0.75 : height * 0.90 }]}>
        <View style={styles.welcome}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={isLargeScreen ? 26 : 22}
            color="#D99A22"
          />

          <View style={{ flex: 1 }}>
            <Text style={[styles.welcomeTitle, { fontSize: isLargeScreen ? 15 : 13 }]}>
              How can we help?
            </Text>

            <Text style={[styles.welcomeText, { fontSize: isLargeScreen ? 13 : 11 }]}>
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
    backgroundColor: '#F4BB45',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  logo: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontWeight: '800',
    color: '#000000',
  },

  online: {
    color: '#333333',
    marginTop: 2,
  },

  chat: {
    flex: 1,
    margin: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#F4BB45',
  },

  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F4BB45',
    backgroundColor: '#FFFCF4',
  },

  welcomeTitle: {
    fontWeight: '800',
    color: '#000000',
  },

  welcomeText: {
    color: '#555555',
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
    marginRight: 8,
    marginBottom: 5,
  },
});