import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dummyBasicDetails from '../../DummyData/DummyBasicDetails.js';

const InputField = ({ label, value, onChangeText, placeholder }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
      value={value}
      placeholderTextColor={"#999"}
      onChangeText={onChangeText}
    />
  </View>
);

const KYCDetailsScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState(dummyBasicDetails.fullName);
  const [fatherName, setFatherName] = useState(dummyBasicDetails.fatherName);
  const [gender, setGender] = useState(dummyBasicDetails.gender);
  const [dob, setDob] = useState(dummyBasicDetails.dob);
  const [email, setEmail] = useState(dummyBasicDetails.email);

  const handleContinue = () => {
    console.log('KYC Submitted:', {
      fullName,
      fatherName,
      gender,
      dob,
      email,
    });
    navigation.navigate('Aadhaar');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Complete your KYC</Text>
      <Text style={styles.subheading}>Your information is securely encrypted</Text>

      <InputField label="Full Name" value={fullName} onChangeText={setFullName} />
      <InputField label="Father's Name" value={fatherName} onChangeText={setFatherName} />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        {['Male', 'Female', 'Other'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.genderOption,
              gender === option && styles.genderSelected,
            ]}
            onPress={() => setGender(option)}
          >
            <Text
              style={gender === option ? styles.genderSelectedText : styles.genderText}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <InputField label="Date of Birth" value={dob} onChangeText={setDob} placeholder="DD/MM/YYYY" />
      <InputField label="Email" value={email} onChangeText={setEmail} />

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handleContinue}
        activeOpacity={0.9}
      >
        <LinearGradient colors={['#6B21A8', '#9333EA']} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default KYCDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Okra-Bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Okra-Medium',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    fontFamily: 'Okra-Regular',
    fontSize: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  genderOption: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#6B21A8',
    borderColor: '#6B21A8',
  },
  genderText: {
    color: '#333',
    fontFamily: 'Okra-Regular',
  },
  genderSelectedText: {
    color: '#fff',
    fontFamily: 'Okra-Bold',
  },
  buttonWrapper: {
    marginTop: 24,
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
