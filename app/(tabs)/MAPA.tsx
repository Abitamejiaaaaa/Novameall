import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router, useLocalSearchParams } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function MapaScreen() {
  const params = useLocalSearchParams();
  const returnScreen = (params.returnScreen as string) || '/pago';
  const webviewRef = useRef<WebView>(null);
  const [ready, setReady] = useState(false);

  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 13.6929,
    longitude: -89.2182,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const ubi = data.ubicacion || data.ubicación;

            if (ubi) {
              const lat = ubi.latitude !== undefined ? ubi.latitude : ubi.lat;
              const lng = ubi.longitude !== undefined ? ubi.longitude : ubi.lng;

              if (typeof lat === 'number' && typeof lng === 'number') {
                setCoordinates({ latitude: lat, longitude: lng });
              }
            }
          }
        } catch (error) {
          console.error("Error al cargar la ubicación:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (ready && webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({
        type: 'setMarker',
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      }));
    }
  }, [coordinates, ready]);

  const guardarUbicacion = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "No hay un usuario autenticado.");
        return;
      }

      const userRef = doc(db, "Usuarios", user.uid);

      await setDoc(userRef, {
        ubicación: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          actualizadoEn: new Date(),
        },
      }, { merge: true });

      router.replace({
        pathname: returnScreen as any,
        params: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
      });
    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
      Alert.alert("Error", "No se pudo guardar la ubicación.");
    }
  };

  const leafletHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const initialLat = ${coordinates.latitude};
    const initialLng = ${coordinates.longitude};

    const map = L.map('map').setView([initialLat, initialLng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    let marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map);

    function sendCoords(lat, lng) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
    }

    marker.on('dragend', function (e) {
      const pos = marker.getLatLng();
      sendCoords(pos.lat, pos.lng);
    });

    document.addEventListener('message', handleMessage);
    window.addEventListener('message', handleMessage);

    function handleMessage(event) {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'setMarker') {
          const newLatLng = [data.lat, data.lng];
          marker.setLatLng(newLatLng);
          map.setView(newLatLng, map.getZoom());
        }
      } catch (e) {}
    }
  </script>
</body>
</html>
  `;

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        setCoordinates({ latitude: data.latitude, longitude: data.longitude });
      }
    } catch (e) {
      console.error('Error parsing webview message:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/images/Logo.jpeg')} />
        <Text style={styles.headerTitle}>Location</Text>
      </View>

      <View style={styles.mapContainer}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: leafletHtml }}
          style={styles.map}
          onMessage={onWebViewMessage}
          onLoadEnd={() => setReady(true)}
          javaScriptEnabled
          domStorageEnabled
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Select location</Text>
        <Text style={styles.coordinates}>Latitude: {coordinates.latitude.toFixed(6)}</Text>
        <Text style={styles.coordinates}>Longitude: {coordinates.longitude.toFixed(6)}</Text>

        <TouchableOpacity style={styles.saveButton} onPress={guardarUbicacion}>
          <Text style={styles.saveText}>Save location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 65, backgroundColor: '#F2B84B', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  logo: { height: 50, width: 50, resizeMode: 'contain', marginRight: 15, borderRadius: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  mapContainer: { flex: 1, width: '100%' },
  map: { flex: 1 },
  infoContainer: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#726B25', textAlign: 'center', marginBottom: 8 },
  coordinates: { fontSize: 14, color: '#555555', textAlign: 'center', marginBottom: 3 },
  saveButton: { backgroundColor: '#B8D95B', paddingVertical: 13, borderRadius: 25, alignItems: 'center', marginTop: 12 },
  saveText: { fontSize: 16, fontWeight: 'bold', color: '#000000' },
});