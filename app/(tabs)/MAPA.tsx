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
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

import { navigate } from 'expo-router/build/global-state/routing';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';

export default function MapaScreen() {

  const [coordinates, setCoordinates] = useState({
    latitude: 13.6929,
    longitude: -89.2182,
  });


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuario autenticado detectado:", user.uid);
        try {
          const docRef = doc(db, "usuarios", user.uid);
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

  const region: Region = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

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
      
      navigate({
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


      setCoordinates({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      Alert.alert(
        '¡Ubicación guardada!',
        `Latitud: ${coordinates.latitude.toFixed(6)}\nLongitud: ${coordinates.longitude.toFixed(6)}`
      );
      console.log("Guardado exitoso para el usuario UID:", user.uid);
    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
      Alert.alert("Error", "No se pudo guardar la ubicación.");
    }


  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/images/Logo.jpeg')}></Image>
        <Text style={styles.headerTitle}>Location</Text>
      </View>

      {/* MAPA */}
      <MapView
        provider={PROVIDER_GOOGLE}
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
          title="Localiton"
          description="Drag the marker to choose the location"
        />
      </MapView>

      {/* INFORMACIÓN */}
      <View style={styles.infoContainer}>

        <Text style={styles.title}>
          Select loction
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
    fontSize: 4,
    fontWeight: 'bold',
    color: '#726B25',
    marginRight: 30,
    height: 70,
    width: 70
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  map: {
    flex: 1,
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