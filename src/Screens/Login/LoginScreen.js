// src/screens/Login/LoginScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from '../../utils/Constants'; // ✅ Custom Colors & Fonts

export default function LoginScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;

  const [phone, setPhone] = useState('');
  const [hasTyped, setHasTyped] = useState(false);

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
    };
  }, []);

  const handleLogin = () => {
    if (phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit Indian mobile number');
      return;
    }
    navigation.navigate('OTP', { phone });
  };

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
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.primary_light, Colors.secondary]} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Flot</Text>

          <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: inputAnim }] }]}>
            <Text style={styles.label}>Enter Your Mobile</Text>

            <View style={styles.inputContainer}>
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

          <Text style={styles.note}>
            Enter the Aadhaar Link Mobile Number for better Experience
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={phone.length !== 10}
            activeOpacity={0.9}
            style={styles.buttonWrapper}
          >
            <Animated.View
              style={[
                styles.buttonContainer,
                {
                  opacity: phone.length === 10 ? 1 : 0.4,
                  transform: [{ scale: phone.length === 10 ? 1 : 0.98 }],
                },
              ]}
            >
              <LinearGradient
                colors={[Colors.secondary, Colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontFamily: Fonts.Bold,
    textAlign: 'center',
    marginBottom: 50,
  },
  inputWrapper: {
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: Fonts.Medium,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontFamily: Fonts.Regular,
  },
  note: {
    color: '#ddd',
    fontSize: 12,
    marginBottom: 20,
    fontFamily: Fonts.Regular,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Bold,
    letterSpacing: 1,
  },
});
