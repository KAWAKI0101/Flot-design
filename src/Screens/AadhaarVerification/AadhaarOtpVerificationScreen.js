// AadhaarOtpVerificationScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AadhaarOtpVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      const nextInput = `otp${index + 1}`;
      refs[nextInput]?.focus();
    }
  };

  const refs = {};

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    console.log("Entered OTP:", enteredOtp);

    if (enteredOtp.length === 6) {
      // OTP logic here
      navigation.navigate('Home'); // or 'SuccessKyc' screen
    } else {
      alert('Please enter the 6-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete your KYC</Text>
      <Text style={styles.subtitle}>Your Data is Completely Secure with us</Text>

      <Image
        source={require('../../assets/images/verify-phone.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.verifyTitle}>Verify Aadhaar OTP</Text>
      <Text style={styles.info}>A six digit code has been sent to the</Text>
      <Text style={styles.phone}>+91XXXXXX9997</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(val) => handleOtpChange(idx, val)}
            ref={(ref) => (refs[`otp${idx}`] = ref)}
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resend}>Resend OTP</Text>
        <Text style={styles.timer}>00:{timer < 10 ? `0${timer}` : timer}</Text>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper} activeOpacity={0.9}>
        <LinearGradient colors={['#6B21A8', '#9333EA']} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AadhaarOtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Okra-Bold',
    marginTop: 24,
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
  image: {
    height: 160,
    width: 160,
    marginVertical: 16,
  },
  verifyTitle: {
    fontSize: 17,
    fontFamily: 'Okra-Bold',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: '#6B7280',
  },
  phone: {
    fontSize: 13,
    fontFamily: 'Okra-Bold',
    marginBottom: 20,
    color: '#6B21A8',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 48,
    marginHorizontal: 4,
    borderBottomWidth: 2,
    borderColor: '#D1D5DB',
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resend: {
    color: '#6B7280',
    marginRight: 8,
  },
  timer: {
    color: 'red',
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
  },
});
