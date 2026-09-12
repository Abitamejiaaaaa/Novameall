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
  Region,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';

export default function MapaScreen() {

  const [coordinates, setCoordinates] = useState({
    latitude: 13.9929,
    longitude: -89.2182,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuario autenticado detectado:", user.uid);
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
                console.log("Ubicación cargada desde Firestore:", lat, lng);
              }
            }
          }
        } catch (error) {
          console.error("Error al cargar la ubicación:", error);
        }
      } else {
        console.log("No hay usuario autenticado en este momento.");
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
      
      router.push({
        pathname: '/Pago',
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

      console.log("Guardado exitoso para el usuario UID:", user.uid);
    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
      Alert.alert("Error", "No se pudo guardar la ubicación.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/images/Logo.jpeg')}></Image>
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
    fontWeight: 'bold',
    color: '#726B25',
    marginRight: 30,
    height: 70,
    width: 70,
    resizeMode: 'contain',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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