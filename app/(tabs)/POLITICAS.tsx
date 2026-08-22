import React from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const privacyPolicies = [
  'NovaMeall is committed to protecting the privacy and personal information of its users. This Privacy Policy explains what information we may collect, how we use it, and with whom it may be shared to provide the services of the platform.',

  'When registering and using NovaMeall, users may provide information such as their name, email address, phone number, and other information necessary to create and manage their account.',

  'To process orders and deliveries, NovaMeall may collect and use information related to the delivery address and, when authorized by the user, location data obtained through GPS. This information may be used to show nearby restaurants, facilitate order management, and support the corresponding delivery.',

  'NovaMeall may collect information related to orders, including selected restaurants, purchased products, quantities, prices, dates, order status, and information necessary to manage the purchase.',

  'Payments made by card may be processed by specialized payment service providers. NovaMeall does not intend to directly store complete bank card information when payment processing can be securely handled by such providers.',

  'The information necessary to complete an order may be shared with the corresponding restaurant. This may include the buyer’s name, contact information, delivery address, order details, and information necessary to coordinate the delivery.',

  'Restaurants using NovaMeall may also be required to provide information to create and manage their accounts, publish their products, receive orders, and manage sales made through the platform.',

  'NovaMeall will use personal information only for the purposes described, including creating and managing accounts, processing orders, managing payments, coordinating deliveries, providing customer support, maintaining platform security, and improving its services.',

  'NovaMeall may use third-party providers for services necessary for the operation of the application, such as payment processing, data storage, mapping services, location services, notifications, or technological infrastructure. These providers should use information only to provide the contracted services and apply appropriate security measures.',

  'NovaMeall will implement reasonable security measures to protect personal information against unauthorized access, loss, alteration, disclosure, or misuse. Access to information will be limited to individuals or services that need it for the corresponding purposes.',

  'Personal information will be retained for as long as necessary to provide NovaMeall services, manage transactions, comply with legal obligations, and address potential claims or issues related to the services.',

  'Users may exercise their applicable rights regarding their personal information, including requesting information about how their data is processed, correcting inaccurate information, requesting its deletion when applicable, and exercising other rights recognized by applicable law.',

  'Users may withdraw location permissions through their device settings. However, some NovaMeall features that depend on location may not be available if the permission is disabled.',

  'NovaMeall is not intended to intentionally collect personal information from minors without the required authorization from their parents or legal guardians, in accordance with applicable law.',

  'NovaMeall may update this Privacy Policy when necessary due to changes in its services, processes, technology, or legal requirements. When significant changes are made, users will be informed through the available communication methods on the platform.',

  'By selecting "Accept and Continue", the user confirms that they have read this Privacy Policy and understand how NovaMeall may collect, use, and protect their personal information according to the stated purposes.',
];

export default function PrivacyPolicy() {

  const accept = () => {
    Alert.alert(
      'Confirmation',
      'You have accepted NovaMeall\'s Privacy Policy.'
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <View style={styles.header}>

          <View style={styles.logo}>
            <Text style={styles.logoText}>
              N
            </Text>
          </View>

          <Text style={styles.title}>
            Privacy Policy
          </Text>

          <Text style={styles.subtitle}>
            NovaMeall
          </Text>

        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={true}
        >

          {privacyPolicies.map((text, index) => (
            <Text
              key={index}
              style={styles.paragraph}
            >
              {text}
            </Text>
          ))}

        </ScrollView>

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={accept}
          >

            <Text style={styles.buttonText}>
              Accept and Continue
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: width * 0.88,
    height: height * 0.82,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
  },

  header: {
    backgroundColor: '#EECFA7',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#DA8D07',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B3B3B',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: '#726B25',
    fontWeight: '600',
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  paragraph: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },

  buttonContainer: {
    padding: 18,
  },

  button: {
    backgroundColor: '#B8D95B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#2F2F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },

});