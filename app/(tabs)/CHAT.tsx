import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { auth } from '../../Firebase/chat';

export default function ChatTabScreen() {
  const router = useRouter();

  const abrirSoporte = () => {
    const user = auth.currentUser;
    const supportChatId = user ? `soporte_${user.uid}` : 'soporte_invitado';
    router.push(`/chat/${supportChatId}` as never);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="headset-outline" size={70} color="#F2B84B" style={styles.icon} />
      <Text style={styles.title}>Customer Support NovaMeall</Text>
      <Text style={styles.subtitle}>
        Having an issue with an order or your account? Talk directly to our support team.
      </Text>

      <TouchableOpacity style={styles.button} onPress={abrirSoporte}>
        <Ionicons name="chatbubbles-outline" size={20} color="#000" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Start Support Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },
  icon: { marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#726B25', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginBottom: 25, paddingHorizontal: 15 },
  button: { 
    flexDirection: 'row', 
    backgroundColor: '#B8D95B', 
    paddingVertical: 14, 
    paddingHorizontal: 24, 
    borderRadius: 25, 
    alignItems: 'center' 
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#000000' },
});