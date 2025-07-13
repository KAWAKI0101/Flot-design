import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/Splash/SplashScreen.js';
import IntroScreen from '../Screens/Intro/IntroScreen.js';
import LoginScreen from '../Screens/Login/LoginScreen.js';
import OtpScreen from '../Screens/OTP/OtpScreen.js';
import DashboardScreen from '../Screens/Dashboard/DashboardScreen.js';
import ApplyLoanScreen from '../Screens/ApplyScreen/ApplyLoanScreen.js';
import SubmitBasicDetailsScreen from '../Screens/ProfeDetails/SubmitBasicDetailsScreen.js';
import LoanRejectedScreen from '../Screens/RejectScreen/LoanRejectedScreen.js';
import KYCDetailsScreen from '../Screens/KYCDetailsScreen/KYCDetailsScreen.js';
import AadhaarVerificationScreen from '../Screens/AadhaarVerification/AadhaarVerificationScreen.js';
import AadhaarOtpVerificationScreen from '../Screens/AadhaarVerification/AadhaarOtpVerificationScreen.js';
import SelfieUploadScreen from '../Screens/SelfyScreen/SelfieUploadScreen.js';
import ConfirmAddressScreen from '../Screens/ConformationScreen/ConfirmAddressScreen.js';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="Home" component={DashboardScreen} />
      <Stack.Screen name="ApplyLoan" component={ApplyLoanScreen} />
      <Stack.Screen name="SubmitBasicDetails" component={SubmitBasicDetailsScreen} />
      <Stack.Screen name="Rejected" component={LoanRejectedScreen} />
      <Stack.Screen name="KYCScreen" component={KYCDetailsScreen} />
      <Stack.Screen name="Aadhaar" component={AadhaarVerificationScreen} />
      <Stack.Screen name="AadhaarOTP" component={AadhaarOtpVerificationScreen} />
      <Stack.Screen name="Selfie" component={SelfieUploadScreen} />
      <Stack.Screen name="ConformAddres" component={ConfirmAddressScreen} />

    </Stack.Navigator>
  );
}
