import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import AppHeader from '../../components/AppHeader';
import { Colors, Fonts } from '../../utils/Constants';

const ConfirmDetailsScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    fatherName: '',
    panNumber: '',
    education: '',
    dob: '',
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
    if (value.trim()) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (!res.didCancel && res.assets?.length > 0) {
        setProfileImage(res.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.entries(inputs).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = true;
    });

    if (!profileImage) {
      newErrors.profileImage = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('Home'); // Replace with actual next screen
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Confirm Your Details"
        subtitle="Please review and confirm"
        onBackPress={() => navigation.goBack()}
      />

      {/* Profile Picture */}
      <TouchableOpacity
        style={[
          styles.imagePicker,
          errors.profileImage && styles.inputError,
        ]}
        onPress={handleImagePick}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Upload Profile Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Father Name"
        value={inputs.fatherName}
        onChangeText={text => handleChange('fatherName', text)}
        style={[
          styles.input,
          errors.fatherName && styles.inputError,
        ]}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="PAN Number"
        value={inputs.panNumber}
        onChangeText={text => handleChange('panNumber', text)}
        style={[
          styles.input,
          errors.panNumber && styles.inputError,
        ]}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Education Qualification"
        value={inputs.education}
        onChangeText={text => handleChange('education', text)}
        style={[
          styles.input,
          errors.education && styles.inputError,
        ]}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={inputs.dob}
        onChangeText={text => handleChange('dob', text)}
        style={[
          styles.input,
          errors.dob && styles.inputError,
        ]}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmit}
        style={styles.buttonWrapper}
      >
        <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.text,
    fontFamily: Fonts.Regular,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#f5f6fb',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageText: {
    fontSize: 12,
    color: Colors.disabled,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
  },
});
