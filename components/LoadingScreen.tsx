import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#E67E22" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2B84B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 24,
  },
  spinner: {
    marginTop: 20,
  },
});
