import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera } from 'react-native-image-picker';
import { Colors } from '../../utils/Constants';

const { width } = Dimensions.get('window');

const SelfieUploadScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo', cameraType: 'front' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.length) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    console.log('Photo submitted:', photo);
    navigation.navigate('AddressConformation');
  };

  return (
    <LinearGradient
      colors={[Colors.primary_light, '#ffffff']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Submit your Selfie</Text>
        <Text style={styles.subtitle}>Your data is completely secure with us</Text>

        <TouchableOpacity onPress={handleTakePhoto} style={styles.imageWrapper}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.selfie} />
          ) : (
            <View style={styles.placeholder}>
              <Icon name="camera" size={40} color={Colors.disabled} />
              <Text style={styles.placeholderText}>Tap to take a selfie</Text>
            </View>
          )}
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity style={styles.retakeBtn} onPress={handleTakePhoto}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper} activeOpacity={0.9}>
          <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SelfieUploadScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Okra-Bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.disabled,
    marginBottom: 24,
    fontFamily: 'Okra-Regular',
  },
  imageWrapper: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selfie: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: Colors.disabled,
    fontSize: 13,
    fontFamily: 'Okra-Regular',
  },
  retakeBtn: {
    marginBottom: 20,
  },
  retakeText: {
    color: Colors.primary,
    fontFamily: 'Okra-Medium',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Okra-Bold',
    fontSize: 16,
  },
});
