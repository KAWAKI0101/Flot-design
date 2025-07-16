import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from '../../utils/Constants';

const OtpScreen = ({ navigation, route }) => {
  const { phone } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [invalidFields, setInvalidFields] = useState([false, false, false, false]);
  const [timer, setTimer] = useState(59);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOtpChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Clear red border for this field
      const updatedInvalids = [...invalidFields];
      updatedInvalids[index] = false;
      setInvalidFields(updatedInvalids);

      if (text && index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const newInvalids = otp.map((val) => val === '');
    setInvalidFields(newInvalids);

    if (newInvalids.includes(true)) return;

    // All fields filled correctly
    navigation.navigate('Home');
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setInvalidFields([false, false, false, false]);
    setTimer(59);
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.primary_light, Colors.secondary]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Verify Phone Number</Text>
          <Text style={styles.subText}>
            A four-digit code has been sent to{'\n'}
            <Text style={styles.phone}>+91 {phone}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  invalidFields[index] && { borderColor: 'red' }
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            ))}
          </View>

          <View style={styles.timerRow}>
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
            <Text style={styles.timerText}>
              {timer < 10 ? `00:0${timer}` : `00:${timer}`}
            </Text>
          </View>

          <Text style={styles.footerNote}>Your data is safe and secure with us</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleVerify}
          >
            <LinearGradient
              colors={[Colors.secondary, Colors.primary]}
              style={styles.verifyButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.verifyText}>Verify</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: Colors.backgroundSecondary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Fonts.Regular,
  },
  phone: {
    color: '#fff',
    fontFamily: Fonts.Medium,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 55,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: Colors.text,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resendText: {
    color: '#fff',
    fontFamily: Fonts.Medium,
  },
  timerText: {
    color: Colors.primary_light,
    fontFamily: Fonts.Bold,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.backgroundSecondary,
    marginBottom: 25,
    fontFamily: Fonts.Regular,
  },
  verifyButton: {
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
});

export default OtpScreen;
