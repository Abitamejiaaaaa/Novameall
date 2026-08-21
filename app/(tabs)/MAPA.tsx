import React, { useState } from 'react';
import {
  Alert,
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
 
export default function MapaScreen() {
  const [coordinates, setCoordinates] = useState({
    latitude: 13.6929,
    longitude: -89.2182,
  });
 
  const region: Region = {
    latitude: 13.6929,
    longitude: -89.2182,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
 
  const onMarkerDragEnd = (event: any) => {
    setCoordinates(event.nativeEvent.coordinate);
  };
 
  const guardarUbicacion = () => {
    Alert.alert(
      'Ubicación guardada',
      `Latitud: ${coordinates.latitude.toFixed(6)}\nLongitud: ${coordinates.longitude.toFixed(6)}`
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
 
      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Text style={styles.logo}>N</Text>
        <Text style={styles.headerTitle}>Ubicación</Text>
      </View>
 
      {/* MAPA */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      >
        <Marker
          coordinate={coordinates}
          draggable
          onDragEnd={onMarkerDragEnd}
          title="Ubicación del negocio"
          description="Arrastra el marcador para elegir la ubicación"
        />
      </MapView>
 
      {/* INFORMACIÓN */}
      <View style={styles.infoContainer}>
 
        <Text style={styles.title}>
          Selecciona la ubicación
        </Text>
 
        <Text style={styles.coordinates}>
          Latitud: {coordinates.latitude.toFixed(6)}
        </Text>
 
        <Text style={styles.coordinates}>
          Longitud: {coordinates.longitude.toFixed(6)}
        </Text>
 
        <TouchableOpacity
          style={styles.saveButton}
          onPress={guardarUbicacion}
        >
          <Text style={styles.saveText}>
            Guardar ubicación
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
    backgroundColor: '#EECFA7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
 
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#726B25',
    marginRight: 12,
  },
 
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
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
 