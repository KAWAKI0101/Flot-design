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
const selfieSize = width * 0.6;

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
    navigation.navigate('AddressConformation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Take a Selfie</Text>
        <Text style={styles.subtitle}>Make sure your face is clear and well-lit</Text>
      </View>

      <TouchableOpacity onPress={handleTakePhoto} style={styles.cameraWrapper}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera" size={36} color={Colors.disabled} />
            <Text style={styles.placeholderText}>Tap to take a selfie</Text>
          </View>
        )}
      </TouchableOpacity>

      {photo && (
        <TouchableOpacity onPress={handleTakePhoto} style={styles.retakeBtn}>
          <Text style={styles.retakeText}>Retake Selfie</Text>
        </TouchableOpacity>
      )}

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.buttonWrapper, { opacity: photo ? 1 : 0.5 }]}
        activeOpacity={photo ? 0.9 : 1}
        disabled={!photo}
      >
        <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.button}>
          <Text style={styles.buttonText}>Submit & Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SelfieUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Okra-Regular',
    color: Colors.disabled,
    marginTop: 6,
    textAlign: 'center',
  },
  cameraWrapper: {
    width: selfieSize,
    height: selfieSize,
    borderRadius: selfieSize / 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.disabled,
    fontFamily: 'Okra-Regular',
  },
  retakeBtn: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  retakeText: {
    fontSize: 14,
    fontFamily: 'Okra-Medium',
    color: Colors.primary,
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
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Okra-Bold',
    fontSize: 16,
  },
});
