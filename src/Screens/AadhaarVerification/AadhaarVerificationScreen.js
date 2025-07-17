import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { Colors } from '../../utils/Constants';
import dummyAadhaarData from '../../DummyData/DummyOtpData';
import { useFocusEffect } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader'; // ✅ Reusable header

const AadhaarVerificationScreen = ({ navigation }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(dummyAadhaarData.aadhaarNumber);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']); // ✅ 4-digit OTP
  const [timer, setTimer] = useState(59);

  const otpAnim = useRef(new Animated.Value(0)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  const handleContinue = () => {
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
      setShowOtp(true);
      setTimer(59);
    });
  };

  useEffect(() => {
    if (showOtp && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [showOtp, timer]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        otpAnim.setValue(0);
        overlayAnim.setValue(0);
        setShowOtp(false);
        setTimer(59);
        setOtp(['', '', '', '']);
        clearInterval(timerRef.current);
      };
    }, [])
  );

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      navigation.navigate('Selfie');
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  const translateY = otpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* ✅ Reusable Header */}
        <AppHeader
          title="Complete your KYC"
          subtitle="Your Data is Completely Secure with us"
          onBackPress={() => navigation.goBack()}
        />

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

        <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue}>
          <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {showOtp && (
        <>
          <Animated.View style={[styles.blurOverlay, { opacity: overlayAnim }]}>
            <BlurView
              style={RNStyleSheet.absoluteFill}
              blurType="light"
              blurAmount={8}
              reducedTransparencyFallbackColor="white"
            />
          </Animated.View>

          <Animated.View style={[styles.otpModal, { transform: [{ translateY }] }]}>
            <Text style={styles.otpTitle}>Verify Aadhaar OTP</Text>
            <Text style={styles.otpInfo}>A 4-digit code has been sent to the +91XXXXXX9997</Text>
            <Text style={styles.otpSub}>Kindly enter the code to continue.</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.otpBoxes}
            >
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpBox}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  value={value}
                />
              ))}
            </KeyboardAvoidingView>

            <Text style={styles.resend}>
              Resend OTP <Text style={{ color: 'red' }}>{`00:${timer < 10 ? '0' : ''}${timer}`}</Text>
            </Text>

            <TouchableOpacity style={styles.buttonWrapper} onPress={handleOtpSubmit}>
              <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default AadhaarVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  blurOverlay: {
    ...RNStyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  otpModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2,
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  otpInfo: {
    fontSize: 14,
    color: Colors.disabled,
    marginBottom: 8,
  },
  otpSub: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
  },
  otpBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Okra-Bold',
    color: Colors.text,
  },
  resend: {
    fontSize: 13,
    fontFamily: 'Okra-Regular',
    color: Colors.text,
    marginBottom: 20,
  },
});
