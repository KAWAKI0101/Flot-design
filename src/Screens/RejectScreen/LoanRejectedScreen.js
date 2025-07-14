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
    <LinearGradient colors={['#FFE1E1', '#FDDCDC']} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={22} color="#FF4D4F" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/Image/Rejected.png')}
          style={styles.image}
        />

        <Text style={styles.title}>Application Rejected</Text>
        <Text style={styles.subtitle}>
          Your loan application no.{' '}
          <Text style={styles.bold}>ZZYYYY</Text> has been declined.
        </Text>
        <Text style={styles.note}>Please try again after 30 days.</Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Home')}>
        <LinearGradient colors={['#FF4D4F', '#FF6A6A']} style={styles.button}>
          <Text style={styles.buttonText}>Back to Home</Text>
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
    backgroundColor: '#FFE1E1',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    color: '#FF4D4F',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Okra-Regular',
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  bold: {
    fontFamily: 'Okra-Bold',
    color: '#000',
  },
  note: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Okra-Regular',
  },
  buttonWrapper: {
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Okra-Bold',
  },
});
