import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../components/AppHeader'; // Adjust the path if needed
import { Colors, Fonts } from '../../utils/Constants';

const AddressConfirmationScreen = ({ navigation }) => {
  const [type, setType] = useState('Current');
  const [houseNo, setHouseNo] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = () => {
    navigation.navigate('ConformAddres'); // Replace with your next screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Reusable Header */}
      <AppHeader
        title="Address Confirmation"
        subtitle="Your Data is Completely Secure with us"
        onBackPress={() => navigation.goBack()}
      />

      {/* Info Box */}
      <TouchableOpacity style={styles.infoBox}>
        <Text style={styles.infoText}>Is this your Current Address</Text>
      </TouchableOpacity>

      {/* Type Selector */}
      <View style={styles.selectorRow}>
        {['Current', 'Parmanent', 'Both'].map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.selectorButton,
              type === option && styles.selectorButtonActive,
            ]}
            onPress={() => setType(option)}
          >
            <Text
              style={[
                styles.selectorText,
                type === option && styles.selectorTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Address Inputs */}
      <TextInput
        style={styles.input}
        placeholder="House No"
        placeholderTextColor="#999"
        value={houseNo}
        onChangeText={setHouseNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Locality"
        placeholderTextColor="#999"
        value={locality}
        onChangeText={setLocality}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="#999"
        value={state}
        onChangeText={setState}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.9} onPress={handleSubmit}>
        <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddressConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  infoBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    color: '#999',
    fontSize: 13,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectorButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectorButtonActive: {
    borderColor: Colors.primary,
  },
  selectorText: {
    fontFamily: Fonts.Medium,
    color: '#999',
    fontSize: 14,
  },
  selectorTextActive: {
    color: Colors.primary,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.text,
    fontFamily: Fonts.Regular,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
  },
});
