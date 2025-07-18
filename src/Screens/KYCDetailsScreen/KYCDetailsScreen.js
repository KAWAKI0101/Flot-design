import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from '../../utils/Constants';
import AppHeader from '../../components/AppHeader';

const KYCDetailsScreen = ({ navigation }) => {
  const [panNumber, setPanNumber] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false); // for showing red borders

  const handleContinue = () => {
    setSubmitted(true);
    if (!panNumber || !accepted) {
      return; // no alert, just prevent navigation
    }
    navigation.navigate('Aadhaar');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader
        title="Complete your KYC"
        subtitle="Your Data is Completely Secure with us"
        onBackPress={() => navigation.goBack()}
      />

      <Image
        source={require('../../assets/Image/Pan.png')}
        style={styles.panImage}
        resizeMode="contain"
      />

      <TextInput
        style={[
          styles.input,
          submitted && !panNumber && styles.inputError, // red border if empty on submit
        ]}
        placeholder="Enter PAN"
        placeholderTextColor={Colors.disabled}
        value={panNumber}
        onChangeText={setPanNumber}
        autoCapitalize="characters"
      />

      <View style={styles.checkboxWrapper}>
        <CheckBox
          value={accepted}
          onValueChange={setAccepted}
          tintColors={{ true: Colors.primary, false: submitted && !accepted ? 'red' : Colors.border }}
        />
        <Text style={styles.checkboxText}>
          I Accept the <Text style={styles.underline}>Term & Condition</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
        <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
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
  panImage: {
    width: '100%',
    height: 150,
    marginBottom: 24,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundSecondary,
    fontFamily: 'Okra-Regular',
    fontSize: 15,
    color: Colors.text,
    marginBottom: 24,
  },
  inputError: {
    borderColor: 'red',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxText: {
    marginLeft: 8,
    fontFamily: 'Okra-Regular',
    fontSize: 13,
    color: Colors.text,
  },
  underline: {
    fontFamily: 'Okra-Bold',
    textDecorationLine: 'underline',
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
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
