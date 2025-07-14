// src/screens/Splash/SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient'; // 👈 Import this

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Intro');
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primary_light, Colors.secondary]} // 👈 Use your two theme colors here
      style={styles.container}
    >
      <Text style={styles.logo}>FLOT</Text>
      <Text style={styles.tagline}>Flexible Loan on Time</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontFamily: Fonts.Bold,
    color: '#fff',
  },
  tagline: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: '#fff',
  },
});
