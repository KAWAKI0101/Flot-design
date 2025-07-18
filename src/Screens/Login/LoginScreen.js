// src/screens/Login/LoginScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { Colors, Fonts } from '../../utils/Constants';
import CustomButton from '../../utils/CustomButton';
import useBackButtonExitApp from '../../hooks/useBackButtonExitApp';


export default function LoginScreen({ navigation }) {
  useBackButtonExitApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const otpAnim = useRef(new Animated.Value(0)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const [phone, setPhone] = useState('');
  const [hasTyped, setHasTyped] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const intervalRef = useRef(null);

  const handleLogin = () => {
    const isValid = /^[6-9]\d{9}$/.test(phone);
    setPhoneError(!isValid);

    if (isValid) {
      setShowOtp(true);
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(overlayAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(otpAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimer(59);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
          }, 1000);
        });
      }, 50);
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      clearInterval(intervalRef.current);
      Animated.parallel([
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(otpAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowOtp(false);
        setTimeout(() => {
          navigation.navigate('MainTab');
        }, 10);
      });
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', () => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
      clearInterval(intervalRef.current);
      otpAnim.setValue(0);
      overlayAnim.setValue(0);
    };
  }, []);

  const handleTextChange = (text) => {
    setPhone(text);
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      Animated.timing(inputAnim, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    if (hasTyped && text.length === 0) {
      setHasTyped(false);
      Animated.timing(inputAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    if (phoneError && /^[6-9]\d{9}$/.test(text)) {
      setPhoneError(false);
    }
  };

  const translateY = otpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });


  return (
    <LinearGradient colors={[Colors.primary, Colors.primary_light, Colors.secondary]} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Flot</Text>

          <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: inputAnim }] }]}>
            <Text style={styles.label}>Enter Your Mobile</Text>

            <View style={[styles.inputContainer, phoneError && styles.errorBorder]}>
              <Icon name="phone" size={20} color={Colors.primary} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="8770764615"
                placeholderTextColor={Colors.disabled}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={handleTextChange}
              />
            </View>
          </Animated.View>

          <Text style={styles.note}>Enter the Aadhaar Link Mobile Number for better Experience</Text>

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.9} style={styles.buttonWrapper}>
            <Animated.View
              style={[styles.buttonContainer, { opacity: phone.length === 10 ? 1 : 0.4, transform: [{ scale: phone.length === 10 ? 1 : 0.98 }] }]}
            >
              <LinearGradient colors={[Colors.primary, Colors.primary_light]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {showOtp && (
          <>
            <Animated.View style={[styles.blurOverlay, { opacity: overlayAnim }]}>
              <BlurView
                style={RNStyleSheet.absoluteFill}
                blurType="light"
                blurAmount={6}
                reducedTransparencyFallbackColor="white"
              />
            </Animated.View>

            <Animated.View style={[styles.otpModal, { transform: [{ translateY }] }]}>
              <TouchableOpacity
                onPress={() => {
                  Animated.parallel([
                    Animated.timing(overlayAnim, {
                      toValue: 0,
                      duration: 200,
                      useNativeDriver: true,
                    }),
                    Animated.timing(otpAnim, {
                      toValue: 0,
                      duration: 200,
                      useNativeDriver: true,
                    }),
                  ]).start(() => {
                    setShowOtp(false);
                    clearInterval(intervalRef.current);
                  });
                }}
                style={{ position: 'absolute', right: 16, top: 16, zIndex: 99 }}
              >
                <Icon name="close" size={24} color={Colors.text} />
              </TouchableOpacity>

              <Text style={styles.otpTitle}>Verify OTP</Text>
              <Text style={styles.otpInfo}>A 4-digit code has been sent to +91-{phone}</Text>
              <Text style={styles.otpSub}>Enter the code below to continue.</Text>

              <View style={styles.otpBoxes}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={styles.otpBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
                        inputRefs.current[index - 1]?.focus();
                        const newOtp = [...otp];
                        newOtp[index - 1] = '';
                        setOtp(newOtp);
                      }
                    }}
                    autoFocus={index === 0}
                  />
                ))}
              </View>


              <Text style={styles.resend}>
                Resend OTP <Text style={{ color: 'red' }}>{`00:${timer < 10 ? '0' : ''}${timer}`}</Text>
              </Text>

              {/* Custom Button Usage */}
              <View style={styles.fixedButton}>
                <CustomButton title="Next" onPress={handleOtpSubmit} disabled={otp.join('').length !== 4} />
              </View>
            </Animated.View>
          </>
        )}

      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontSize: 40, color: '#fff', fontFamily: Fonts.Bold, textAlign: 'center', marginBottom: 50 },
  inputWrapper: { marginBottom: 30 },
  label: { color: '#fff', fontSize: 16, marginBottom: 10, fontFamily: Fonts.Medium },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: Colors.text, fontFamily: Fonts.Regular },
  note: { color: '#ddd', fontSize: 12, marginBottom: 20, fontFamily: Fonts.Regular },
  buttonWrapper: { alignItems: 'center' },
  buttonContainer: {
    width: '90%',
    borderRadius: 50,
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
  },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontFamily: Fonts.Bold, letterSpacing: 1 },
  errorBorder: { borderColor: 'red' },
  blurOverlay: { ...RNStyleSheet.absoluteFillObject, zIndex: 1 },
  otpModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2,
  },
  otpTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  otpInfo: { fontSize: 14, color: Colors.disabled, marginBottom: 8 },
  otpSub: { fontSize: 14, color: Colors.text, marginBottom: 16 },
  otpBoxes: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: Colors.text,
  },
  resend: { fontSize: 13, fontFamily: Fonts.Regular, color: Colors.text, marginBottom: 20 },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    borderRadius: 50,
    overflow: 'hidden',
  },
});