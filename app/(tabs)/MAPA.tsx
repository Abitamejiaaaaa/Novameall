import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
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
  const [search, setSearch] = useState('');

  const [coordinates, setCoordinates] = useState({
    latitude: 13.6929,
    longitude: -89.2182,
  });

  const region: Region = {
    latitude: 13.6929,
    longitude: -89.2182,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  const locales = [
    {
      id: '1',
      latitude: 13.7055,
      longitude: -89.2182,
      title: 'Local Nova Meal',
    },
    {
      id: '2',
      latitude: 13.7002,
      longitude: -89.226,
      title: 'Comida El Salvador',
    },
    {
      id: '3',
      latitude: 13.696,
      longitude: -89.207,
      title: 'Restaurante El Bosque',
    },
    {
      id: '4',
      latitude: 13.6855,
      longitude: -89.215,
      title: 'Centro del Río',
    },
  ];

  const onMarkerDragEnd = (event: any) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setCoordinates(newCoordinate);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      {}
      <View style={styles.header}>

        <View style={styles.logo}>
          <Text style={styles.logoText}>N</Text>
        </View>

        <Text style={styles.headerTitle}>
          Dirección de entrega
        </Text>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons
            name="person"
            size={23}
            color="#000000"
          />
        </TouchableOpacity>

      </View>

      {}
      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={21}
          color="#999999"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar locales"
          placeholderTextColor="#A7A7A7"
          value={search}
          onChangeText={setSearch}
        />

      </View>

      {}
      <View style={styles.mapContainer}>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >

          {}
          {locales.map((local) => (
            <Marker
              key={local.id}
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.title}
            >
              <View style={styles.localMarker}>
                <Ionicons
                  name="location"
                  size={30}
                  color="#B8D95B"
                />
              </View>
            </Marker>
          ))}

          {}
          <Marker
            coordinate={coordinates}
            draggable
            onDragEnd={onMarkerDragEnd}
            title="Tu ubicación"
            description="Mantén presionado y arrastra"
          >
            <View style={styles.selectedMarker}>
              <Ionicons
                name="location"
                size={38}
                color="#F5A000"
              />
            </View>
          </Marker>

        </MapView>

        {}
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons
            name="locate"
            size={27}
            color="#000000"
          />
        </TouchableOpacity>

        <Text style={styles.googleText}>
          Google Maps
        </Text>

      </View>

      {}
      <View style={styles.infoCard}>

        <Text style={styles.infoTitle}>
          Selecciona tu ubicación
        </Text>

        <Text style={styles.coordinates}>
          Latitud: {coordinates.latitude.toFixed(6)}
        </Text>

        <Text style={styles.coordinates}>
          Longitud: {coordinates.longitude.toFixed(6)}
        </Text>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>
            Confirmar ubicación
          </Text>
        </TouchableOpacity>

      </View>

      {}
      <View style={styles.bottomBar}>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="home-outline"
            size={27}
            color="#5C4210"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="restaurant-outline"
            size={27}
            color="#5C4210"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="heart-outline"
            size={28}
            color="#5C4210"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="bag-outline"
            size={27}
            color="#5C4210"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="person-outline"
            size={27}
            color="#5C4210"
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#D6E68A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#726B25',
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
    marginLeft: 14,
  },

  profileButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    height: 52,
    marginHorizontal: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  searchIcon: {
    marginLeft: 18,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#222222',
    paddingRight: 15,
  },

  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 350,
  },

  map: {
    flex: 1,
  },

  localMarker: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedMarker: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#B8D95B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  googleText: {
    position: 'absolute',
    left: 12,
    bottom: 7,
    fontSize: 13,
    color: '#777777',
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingHorizontal: 4,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 18,
    padding: 12,
    elevation: 4,
  },

  infoTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#726B25',
    marginBottom: 3,
  },

  coordinates: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666666',
  },

  saveButton: {
    backgroundColor: '#B8D95B',
    marginTop: 8,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
  },

  saveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },

  bottomBar: {
    height: 67,
    marginHorizontal: 8,
    marginBottom: 4,
    borderRadius: 20,
    backgroundColor: '#F5A000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
  },

  navButton: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
});