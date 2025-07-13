import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';

const ConfirmDetailsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [registeredNumber, setRegisteredNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleConfirm = () => {
    navigation.navigate('NextStep');
  };

  const handlePickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <LinearGradient colors={['#1e0066', '#000033']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handlePickImage} style={styles.profileImageWrapper}>
          <Image
            source={profileImage ? profileImage : require('../../assets/Image/user.png')}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconWrapper}>
            <Icon name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Confirm Your Details</Text>
        <Text style={styles.subtitle}>Your data is completely secure with us</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#E0E0E0"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Registered Number"
          placeholderTextColor="#E0E0E0"
          value={registeredNumber}
          onChangeText={setRegisteredNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E0E0E0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#E0E0E0"
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.genderRow}>
          <TouchableOpacity onPress={() => setGender('Male')} style={styles.genderOption}>
            <Text style={styles.genderText}>Male</Text>
            <View style={[styles.circle, gender === 'Male' && styles.selected]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Female')} style={styles.genderOption}>
            <Text style={styles.genderText}>Female</Text>
            <View style={[styles.circle, gender === 'Female' && styles.selected]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonWrapper} onPress={handleConfirm} activeOpacity={0.9}>
          <LinearGradient colors={['#6B21A8', '#9333EA']} style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default ConfirmDetailsScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  profileImageWrapper: {
    marginTop: 24,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6B21A8',
    borderRadius: 12,
    padding: 6,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    color: '#fff',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Okra-Regular',
    color: '#E0E0E0',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Okra-Regular',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  genderText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Okra-Medium',
    marginRight: 8,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selected: {
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
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
