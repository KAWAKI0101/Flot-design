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

const AadhaarVerificationScreen = ({ navigation }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(dummyAadhaarData.aadhaarNumber);

  const handleContinue = () => {
    console.log('Aadhaar Verified:', aadhaarNumber);
    navigation.navigate('AadhaarOTP'); // Or wherever you want to go next
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        placeholderTextColor={"#999"}
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
        maxLength={14}
      />

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
        <LinearGradient colors={['#6B21A8', '#9333EA']} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AadhaarVerificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
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
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  progressDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9333EA',
    marginHorizontal: 6,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
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
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    fontFamily: 'Okra-Regular',
    fontSize: 15,
    marginBottom: 24,
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
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
