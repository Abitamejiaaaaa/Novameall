import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

import { auth, db } from '../../Firebase/config';

export default function ChatRoomScreen() {
  const { chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'chats', String(chatId), 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();

        let createdAtDate = new Date();
        if (data.createdAt && typeof data.createdAt.toDate === 'function') {
          createdAtDate = data.createdAt.toDate();
        }

        return {
          _id: docSnap.id,
          text: data.text || '',
          createdAt: createdAtDate,
          user: {
            _id: data.user?._id || 'soporte_id',
            name: data.user?.name || 'Soporte NovaMeal',
          },
        };
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribeMessages();
  }, [chatId]);


  const onSend = useCallback(async (newMessages = []) => {
    if (!chatId) return;

    const [messageToSend] = newMessages;
    const senderId = currentUser ? currentUser.uid : 'cliente_anonimo';
    const senderName = currentUser?.displayName || currentUser?.email || 'Cliente';

    try {
      const messagesRef = collection(db, 'chats', String(chatId), 'messages');
      await addDoc(messagesRef, {
        text: messageToSend.text,
        createdAt: serverTimestamp(),
        user: {
          _id: senderId,
          name: senderName,
        },
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  }, [currentUser, chatId]);

  const currentUserId = currentUser ? currentUser.uid : 'cliente_anonimo';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Soporte NovaMeal' }} />

      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{
          _id: currentUserId,
          name: currentUser?.displayName || currentUser?.email || 'Cliente',
        }}
        placeholder="Escribe tu mensaje..."
        messagesContainerStyle={styles.messagesContainer}
        isKeyboardInternallyHandled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    backgroundColor: '#FFFFFF',
  },
});