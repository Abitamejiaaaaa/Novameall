import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Marker,
  UrlTile,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router, useLocalSearchParams } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';

export default function MapaScreen() {

  // Capturamos los parámetros para saber a qué pantalla regresar (por defecto manda a '/Pago' si no recibe nada)
  const params = useLocalSearchParams();
  const returnScreen = (params.returnScreen as string) || '/Pago';

  const [coordinates, setCoordinates] = useState({
    latitude: 13.6929, // Coordenadas por defecto (ej. El Salvador)
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
                setCoordinates({
                  latitude: lat,
                  longitude: lng,
                });
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

  const onMarkerDragEnd = (event: any) => {
    setCoordinates(event.nativeEvent.coordinate);
  };

  const guardarUbicacion = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "No hay un usuario autenticado.");
        return;
      }

      const userRef = doc(db, "Usuarios", user.uid);
      
      // Redirige dinámicamente a la pantalla de pago que solicitó el mapa
      router.push({
        pathname: returnScreen as any,
        params: { 
          lat: coordinates.latitude, 
          lng: coordinates.longitude 
        }
      });

      await setDoc(userRef, {
        ubicación: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          actualizadoEn: new Date()
        }
      }, { merge: true }); 

    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
      Alert.alert("Error", "No se pudo guardar la ubicación.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/images/Logo.jpeg')} />
        <Text style={styles.headerTitle}>Location</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Mapa libre y gratuito sin necesidad de API Key ni tarjetas */}
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />

          <Marker
            coordinate={coordinates}
            draggable
            onDragEnd={onMarkerDragEnd}
            title="Location"
            description="Drag the marker to choose the location"
          />
        </MapView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          Select location
        </Text>

        <Text style={styles.coordinates}>
          Latitude: {coordinates.latitude.toFixed(6)}
        </Text>

        <Text style={styles.coordinates}>
          Longitude: {coordinates.longitude.toFixed(6)}
        </Text>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={guardarUbicacion}
        >
          <Text style={styles.saveText}>
            Save location
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 65,
    backgroundColor: '#F2B84B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 15,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#726B25',
    textAlign: 'center',
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 3,
  },
  saveButton: {
    backgroundColor: '#B8D95B',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});