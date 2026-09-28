import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const supportChatId = 'support';

const { width, height } = Dimensions.get("window");

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo.jpeg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.profile}>
            <Ionicons name="person" size={Math.min(width * 0.06, 26)} color="#555" />
          </View>
        </View>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Account</Text>

          <Pressable style={styles.option} android_ripple={{ color: '#eee' }} onPress={() => router.push("/(tabs)/CONFIGURACIpN-PERFIL")}>
            <Ionicons name="person-outline" size={Math.min(width * 0.055, 23)} color="#444" />
            <Text style={styles.optionText}>
              Personal information & data
            </Text>
          </Pressable>

          <Pressable style={styles.option} android_ripple={{ color: '#eee' }} onPress={() => router.push("/OlividaRR")}>
            <Ionicons name="lock-closed-outline" size={Math.min(width * 0.055, 23)} color="#444" />
            <Text style={styles.optionText}>
              Change password
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>


          <Pressable style={styles.option} android_ripple={{ color: '#eee' }} onPress={() => router.push("/(tabs)/inbox")}>
            <Ionicons name="notifications-outline" size={Math.min(width * 0.055, 23)} color="#444" />
            <Text style={styles.optionText}>Notifications</Text>
          </Pressable>

        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Help & Support</Text>

          <Pressable style={styles.option} android_ripple={{ color: '#eee' }} onPress={() => router.push("/chat/${supportChatId")}>
            <Ionicons name="help-circle-outline" size={Math.min(width * 0.055, 23)} color="#444" />
            <Text style={styles.optionText}>Help & support</Text>
          </Pressable>

          <Pressable style={styles.option} android_ripple={{ color: '#eee' }} onPress={() => router.push("/(tabs)/POLITICAS")}>
            <Ionicons
              name="shield-checkmark-outline"
              size={Math.min(width * 0.055, 23)}
              color="#444"
            />
            <Text style={styles.optionText}>
              Privacy policy
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton} android_ripple={{ color: '#ff8000' }} onPress={()=> router.push("/(tabs)/Login")}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
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
              <TouchableOpacity
                style={styles.navButton}
                activeOpacity={0.7}
                onPress={() => router.push(`/chat/${supportChatId}`)}
              >
                <FontAwesome5 name="headset" size={22} color="#111" />
              </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFD45F",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FFD45F",
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: Math.min(width * 0.16, 65),
    height: Math.min(width * 0.16, 65),
  },
  profile: {
    width: Math.min(width * 0.12, 48),
    height: Math.min(width * 0.12, 48),
    borderRadius: Math.min(width * 0.06, 24),
    backgroundColor: "#E8C45A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Math.min(width * 0.07, 28),
    fontWeight: "bold",
    marginTop: height * 0.02,
    marginBottom: height * 0.025,
    color: "#111",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.016,
    marginBottom: height * 0.022,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: Math.min(width * 0.048, 18),
    fontWeight: "bold",
    color: "#222",
    marginBottom: height * 0.01,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.012,
  },
  optionText: {
    fontSize: Math.min(width * 0.04, 15),
    color: "#333",
    marginLeft: 14,
    flex: 1,
  },
  logoutButton: {
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
    height: 52,
    borderRadius: 28,
    backgroundColor: "#FF9700",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutText: {
    fontSize: Math.min(width * 0.042, 16),
    fontWeight: "bold",
    color: "#222",
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
    padding: 1,
  },
});