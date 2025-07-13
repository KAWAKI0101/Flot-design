import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera } from 'react-native-image-picker';

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
    // Navigate or upload
    navigation.navigate('ConformAddres');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit your Selfie</Text>
      <Text style={styles.subtitle}>Your data is completely secure with us</Text>

      <TouchableOpacity onPress={handleTakePhoto} style={styles.imageWrapper}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.selfie} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera" size={40} color="#aaa" />
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
        <LinearGradient colors={['#6B21A8', '#9333EA']} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SelfieUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    marginBottom: 4,
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  imageWrapper: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
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
    color: '#aaa',
    fontSize: 13,
  },
  retakeBtn: {
    marginTop: 16,
  },
  retakeText: {
    color: '#6B21A8',
    fontFamily: 'Okra-Medium',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  buttonWrapper: {
    marginTop: 32,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Okra-Bold',
    fontSize: 16,
  },
});
