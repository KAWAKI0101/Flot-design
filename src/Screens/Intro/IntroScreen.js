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
// Add RFValue
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');
const minSize = RFValue(240);
const maxSize = RFValue(500);
const imageSize = Math.max(minSize, Math.min(width * 1.50, maxSize));

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

      <View style={styles.bottomCard}>
        {/* <View style={styles.dotsContainer}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
          <View style={styles.dotInactive} />
        </View> */}

        <Text style={styles.description}>
          Get instant loan in <Text style={styles.highlight}>50 Minutes</Text>
        </Text>

        <TouchableOpacity
          style={styles.buttonWrapper}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primary_light]}
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
    marginTop: RFValue(60),
    paddingHorizontal: RFValue(24),
  },
  headingText: {
    fontSize: RFValue(30),
    lineHeight: RFValue(38),
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
    height: RFValue(260),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(30),
    marginBottom: RFValue(10),
    position: 'relative',
  },
  image: {
    // width: width * 0.75, // 75% of device width
    // height: width * 0.75, // keep square so it stays visually similar at all sizes
    width:imageSize,
    height:imageSize,
  },
  labelLeft: {
    position: 'absolute',
    left: RFValue(10),
    top: '55%',
    fontSize: RFValue(11),
    fontFamily: Fonts.Regular,
    color: Colors.text,
    textAlign: 'left',
  },
  labelRight: {
    position: 'absolute',
    right: RFValue(10),
    top: '35%',
    fontSize: RFValue(11),
    fontFamily: Fonts.Regular,
    color: Colors.text,
    textAlign: 'right',
  },

  bottomCard: {
    marginTop: RFValue(140),
    backgroundColor: '#fff',
    borderTopLeftRadius: RFValue(36),
    borderTopRightRadius: RFValue(36),
    paddingTop: RFValue(30),
    paddingBottom: RFValue(40),
    paddingHorizontal: RFValue(24),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: RFValue(10),
    elevation: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: RFValue(12),
  },
  dotInactive: {
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: '#D4D4D4',
    marginHorizontal: RFValue(4),
  },
  dotActive: {
    width: RFValue(20),
    height: RFValue(8),
    borderRadius: RFValue(4),
    backgroundColor: Colors.primary,
    marginHorizontal: RFValue(4),
  },
  description: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Regular,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: RFValue(24),
  },
  highlight: {
    color: 'red',
    fontFamily: Fonts.Bold,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    paddingVertical: RFValue(16),
    borderRadius: RFValue(12),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: RFValue(8) },
    shadowRadius: RFValue(10),
  },
  buttonText: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
    color: '#fff',
  },
});
