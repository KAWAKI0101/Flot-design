import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoanRejectedScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#9333EA', '#3B0764']} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/Image/Rejected.png')} // Place a red-cross/thumbs-down image in assets
          style={styles.image}
        />

        <Text style={styles.title}>Sorry! You are not eligible.</Text>
        <Text style={styles.subtitle}>Your loan Application No : <Text style={styles.bold}>ZZYYYY</Text> is rejected</Text>
        <Text style={styles.note}>Please try after 30 days</Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Home')}>
        <LinearGradient colors={['#fff', '#fff']} style={styles.button}>
          <Text style={styles.buttonText}>Back to home</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoanRejectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 24,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Okra-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Okra-Regular',
    color: '#f3f3f3',
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Okra-Bold',
  },
  note: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Okra-Regular',
  },
  buttonWrapper: {
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#9333EA',
    fontFamily: 'Okra-Bold',
  },
});
