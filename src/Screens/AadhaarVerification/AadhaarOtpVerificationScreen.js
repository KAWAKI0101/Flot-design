import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dummyAadhaarData from '../../DummyData/DummyOtpData.js';
import { Colors } from '../../utils/Constants';

const AadhaarVerificationScreen = ({ navigation }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(dummyAadhaarData.aadhaarNumber);

  const handleContinue = () => {
    console.log('Aadhaar Verified:', aadhaarNumber);
    navigation.navigate('AadhaarOTP');
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primary_light, Colors.secondary]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.progressWrapper}>
          <View style={styles.progressDot} />
          <View style={styles.progressDotActive} />
          <View style={styles.progressDot} />
        </View>

        <Text style={styles.heading}>Complete your KYC</Text>
        <Text style={styles.subheading}>Your Data is Completely Secure with us</Text>

        <Image
          source={require('../../assets/Image/Aadhar.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.label}>Enter Aadhaar Number</Text>
        <TextInput
          style={styles.input}
          placeholder="0000 1111 2222"
          keyboardType="numeric"
          placeholderTextColor={Colors.disabled}
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          maxLength={14}
        />

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={handleContinue}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primary_light]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default AadhaarVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent', // allow gradient to show
  },
  progressWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 6,
  },
  progressDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginHorizontal: 6,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 13,
    color: Colors.disabled,
    marginBottom: 24,
    fontFamily: 'Okra-Regular',
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 24,
    borderRadius: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontFamily: 'Okra-Medium',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundSecondary,
    fontFamily: 'Okra-Regular',
    fontSize: 15,
    color: Colors.text,
    marginBottom: 24,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Okra-Bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
