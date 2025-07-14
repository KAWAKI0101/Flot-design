// src/screens/Intro/IntroScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from '../../utils/Constants';

const { width, height } = Dimensions.get('window');

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.headingWrapper}>
        <Text style={styles.headingText}>
          <Text style={styles.headingBlack}>Instant Loan{'\n'}</Text>
          <Text style={styles.headingPrimary}>Zero Hassle</Text>
        </Text>
      </View>

      {/* Image with labels */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Image/Flot-dsign.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.labelLeft}>Instant{'\n'}Loan Process.</Text>
        <Text style={styles.labelRight}>Quick Loan{'\n'}Disbursal</Text>
      </View>

      {/* White bottom card section */}
      <View style={styles.bottomCard}>
        {/* Dots */}
        <View style={styles.dotsContainer}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
          <View style={styles.dotInactive} />
        </View>

        {/* Text */}
        <Text style={styles.description}>
          Get instant loan in <Text style={styles.highlight}>50 Minutes</Text>
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={[Colors.primary,Colors.primary_light, Colors.secondary]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingWrapper: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  headingText: {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: Fonts.Bold,
  },
  headingBlack: {
    color: Colors.text,
  },
  headingPrimary: {
    color: Colors.primary,
  },
  
  imageContainer: {
  width: '100%',
  height: 260, // ✅ Fixed height for proper display
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
  marginBottom: 10,
  position: 'relative',
},
image: {
  width: 500,
  height: 500,
},
labelLeft: {
  position: 'absolute',
  left: 10,
  top: '55%',
  fontSize: 11,
  fontFamily: Fonts.Regular,
  color: Colors.text,
  textAlign: 'left',
},
labelRight: {
  position: 'absolute',
  right: 10,
  top: '35%',
  fontSize: 11,
  fontFamily: Fonts.Regular,
  color: Colors.text,
  textAlign: 'right',
},

  bottomCard: {
    marginTop: 150,
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 10,
    elevation: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4D4D4',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginHorizontal: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    color: 'red',
    fontFamily: Fonts.Bold,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: '#fff',
  },
});
