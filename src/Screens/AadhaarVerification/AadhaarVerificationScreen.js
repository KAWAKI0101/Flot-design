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
import AppHeader from '../../components/AppHeader';

// Add responsive font size utility
import { RFValue } from 'react-native-responsive-fontsize';

const AadhaarVerificationScreen = ({ navigation }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(dummyAadhaarData.aadhaarNumber);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);

  const otpAnim = useRef(new Animated.Value(0)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const [otpError, setOtpError] = useState(false);


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
        setOtp(['', '', '', '', '', '']);
        clearInterval(timerRef.current);
      };
    }, [])
  );

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      navigation.navigate('Selfie');
    } else {
      setOtpError(true);
    }
  };

  const translateY = otpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [RFValue(300), 0],
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
            <Text style={styles.otpInfo}>A 6-digit code has been sent to +91XXXXXX9997</Text>
            <Text style={styles.otpSub}>Kindly enter the code to continue.</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.otpBoxes}
            >
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[styles.otpBox, otpError && value === '' && styles.otpErrorBorder,]}
                  keyboardType="numeric"
                  maxLength={1}
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
    padding: RFValue(24),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: RFValue(220),
    marginBottom: RFValue(24),
    borderRadius: RFValue(10),
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: RFValue(14),
    fontFamily: 'Okra-Medium',
    color: Colors.text,
    marginBottom: RFValue(8),
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: RFValue(10),
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(16),
    backgroundColor: Colors.backgroundSecondary,
    fontFamily: 'Okra-Regular',
    fontSize: RFValue(15),
    color: Colors.text,
    marginBottom: RFValue(24),
  },
  buttonWrapper: {
    borderRadius: RFValue(12),
    overflow: 'hidden',
    width: '100%',
  },
  otpErrorBorder: {
    borderColor: 'red',
    borderWidth: 2,
  },

  button: {
    paddingVertical: RFValue(16),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Okra-Bold',
    fontSize: RFValue(16),
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
    padding: RFValue(24),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: RFValue(10),
    elevation: 10,
    zIndex: 2,
  },
  otpTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: RFValue(8),
  },
  otpInfo: {
    fontSize: RFValue(14),
    color: Colors.disabled,
    marginBottom: RFValue(8),
  },
  otpSub: {
    fontSize: RFValue(14),
    color: Colors.text,
    marginBottom: RFValue(16),
  },
  otpBoxes: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: RFValue(16),
  },
  otpBox: {
    width: RFValue(41),
    height: RFValue(50),
    borderWidth: 1,
    borderRadius: RFValue(10),
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    textAlign: 'center',
    fontSize: RFValue(20),
    fontFamily: 'Okra-Bold',
    color: Colors.text,
    marginRight: RFValue(10),
  },
  resend: {
    fontSize: RFValue(13),
    fontFamily: 'Okra-Regular',
    color: Colors.text,
    marginBottom: RFValue(20),
  },
});
