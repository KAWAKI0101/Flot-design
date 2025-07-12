// src/screens/Splash/SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Intro'); // Navigate after 2 sec
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FLOT</Text>
      <Text style={styles.tagline}>Flexible Loan on Time</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7E17CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
});
