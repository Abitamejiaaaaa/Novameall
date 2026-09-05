import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

import { db, auth } from '../../Firebase/chat';

export default function RestaurantChatScreen() {
  const { orderId } = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!orderId) return;

    const messagesRef = collection(
      db,
      'orders',
      String(orderId),
      'messages'
    );

    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedMessages: IMessage[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data();

        let createdAtDate = new Date();

        if (
          data.createdAt &&
          typeof data.createdAt.toDate === 'function'
        ) {
          createdAtDate = data.createdAt.toDate();
        }

        return {
          _id: docSnap.id,
          text: data.text || '',
          createdAt: createdAtDate,
          user: {
            _id: data.user?._id || 'unknown',
            name: data.user?.name || 'User',
          },
        };
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [orderId]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (!orderId || newMessages.length === 0) return;

      const messageToSend = newMessages[0];

      try {
        const messagesRef = collection(
          db,
          'orders',
          String(orderId),
          'messages'
        );

        await addDoc(messagesRef, {
          text: messageToSend.text,
          createdAt: serverTimestamp(),
          user: {
            _id: 'restaurant_side',
            name:
              auth.currentUser?.displayName ||
              'Restaurant',
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

      <Stack.Screen
        options={{
          title: `Order ${orderId}`,
        }}
      />

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 'restaurant_side',
          name:
            auth.currentUser?.displayName ||
            'Restaurant',
        }}
        textInputProps={{
          placeholder: 'Type a message...',
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});