import {
  Bookmark,
  Headphones,
  Heart,
  Home,
  Mail,
  Phone,
  Store,
  User,
  Utensils
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load current user data when the screen mounts
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      const user = auth.currentUser;
      if (user) {
        setCorreo(user.email || '');
        try {
          const docRef = doc(db, 'Usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setNombre(data.nombreLocal || data.nombre || '');
            setTelefono(data.telefono || '');
            if (data.fotoPerfil) {
              setAvatar(data.fotoPerfil);
            }
          }
        } catch (error) {
          console.log('Error loading user data:', error);
        }
      }
    };

    cargarDatosUsuario();
  }, []);

  // Función para abrir la galería y seleccionar la foto
  const seleccionarFoto = async () => {
    // Pedir permisos de la galería si es necesario
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleGuardar = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'There is no authenticated user.');
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, 'Usuarios', user.uid), {
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        uid: user.uid,
        fotoPerfil: avatar || '', // Aquí puedes guardar la ruta (o luego subirla a Firebase Storage)
      }, { merge: true });

      Alert.alert('Success!', 'Changes successfully saved to the database.');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Could not save changes. Please check your connection or permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/Logo.jpeg')} style={styles.logo} />
        </View>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Scroll Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Avatar and photo change section */}
        <View style={styles.profileImageSection}>
          <TouchableOpacity onPress={seleccionarFoto} style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarCircle}>
                <User size={40} color="#ffffff" />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.changePhotoTextContainer} onPress={seleccionarFoto}>
            <Text style={styles.changePhotoText}>Change profile picture</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputWrapper}>
              <Store size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex. NovaMeall Local"
                placeholderTextColor="#cbd5e1"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputWrapper, { backgroundColor: '#f1f5f9' }]}>
              <Mail size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: '#64748b' }]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#cbd5e1"
                value={correo}
                editable={false}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="+503 0000 0000"
                placeholderTextColor="#cbd5e1"
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>
          </View>

        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, loading && { opacity: 0.7 }]} 
          onPress={handleGuardar}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Saving...' : 'Save changes'}
          </Text>
        </TouchableOpacity>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportText}>Need help?</Text>
          <TouchableOpacity onPress={() => router.push('/chat/${supportChatId}')}>
            <Text style={styles.supportLink}>Contact technical support</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/Home')}>
          <Ionicons name="home-outline" size={26} color="#111" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/CATEGORIAS')}>
          <MaterialCommunityIcons name="silverware-clean" size={26} color="#111" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={26} color="#111" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/inbox')}>
          <Ionicons name="clipboard-outline" size={26} color="#111" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/chat/${supportChatId')}>
          <FontAwesome5 name="headset" size={22} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logoContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#E67E22',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changePhotoTextContainer: {
    marginTop: 10,
  },
  changePhotoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1e293b',
  },
  saveButton: {
    backgroundColor: '#82C341',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#82C341',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  supportSection: {
    alignItems: 'center',
  },
  supportText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  supportLink: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2,
    textDecorationLine: 'underline',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E67E22',
    paddingVertical: 14,
  },
    bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
    navButton: {
    padding: 10,
  },
});