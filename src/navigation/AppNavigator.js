import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import SplashScreen from '../Screens/Splash/SplashScreen';
import IntroScreen from '../Screens/Intro/IntroScreen';
import LoginScreen from '../Screens/Login/LoginScreen';
// import OtpScreen from '../Screens/OTP/OtpScreen';
import ApplyLoanScreen from '../Screens/ApplyScreen/ApplyLoanScreen';
import SubmitBasicDetailsScreen from '../Screens/ProfeDetails/SubmitBasicDetailsScreen';
import LoanRejectedScreen from '../Screens/RejectScreen/LoanRejectedScreen';
import KYCDetailsScreen from '../Screens/KYCDetailsScreen/KYCDetailsScreen';
import AadhaarVerificationScreen from '../Screens/AadhaarVerification/AadhaarVerificationScreen';
// import AadhaarOtpVerificationScreen from '../Screens/AadhaarVerification/AadhaarOtpVerificationScreen';
import SelfieUploadScreen from '../Screens/SelfyScreen/SelfieUploadScreen';
import ConfirmAddressScreen from '../Screens/ConformationScreen/ConfirmAddressScreen';
import AddressConfirmScreen from '../Screens/ConformationScreen/AddressConfirmScreen';
import BottomTabNavigator from './BottomTabNavigation'; // 👈 Correct path here

const Stack = createStackNavigator();

const smoothTransition = {
  gestureEnabled: true,
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
};

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={smoothTransition}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="OTP" component={OtpScreen} /> */}
      
      
      <Stack.Screen name="MainTab" component={BottomTabNavigator} />
      
      <Stack.Screen name="ApplyLoan" component={ApplyLoanScreen} />
      <Stack.Screen name="SubmitBasicDetails" component={SubmitBasicDetailsScreen} />
      <Stack.Screen name="Rejected" component={LoanRejectedScreen} />
      <Stack.Screen name="KYCScreen" component={KYCDetailsScreen} />
      <Stack.Screen name="Aadhaar" component={AadhaarVerificationScreen} />
      {/* <Stack.Screen name="AadhaarOTP" component={AadhaarOtpVerificationScreen} /> */}
      <Stack.Screen name="Selfie" component={SelfieUploadScreen} />
      <Stack.Screen name="AddressConformation" component={AddressConfirmScreen} />
      <Stack.Screen name="ConformAddres" component={ConfirmAddressScreen} />
    </Stack.Navigator>
  );
}
