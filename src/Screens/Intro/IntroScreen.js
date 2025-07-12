import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function IntroScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={['#7116D0', '#4D22B7']} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Image/Girl.png')} // 👈 Replace with your image
          style={styles.image}
        />
      </View>

      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.bulletText}>• Minimum Documents</Text>
        <Text style={styles.bulletText}>• Instant Loan Disbursal</Text>
        <Text style={styles.bulletText}>• Transparent Pricing</Text>

        <View style={styles.dotsContainer}>
          {[...Array(3)].map((_, i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#E700E3', '#00B0FF']}
            style={styles.button}>
            <Icon name="arrow-forward" color="#fff" size={22} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 60,
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  bulletText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
  },
  buttonWrapper: {
    marginTop: 30,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    shadowColor: '#00B0FF',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 6,
  },
});
