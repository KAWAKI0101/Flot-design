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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../utils/Constants';

const KYCDetailsScreen = ({ navigation }) => {
  const [panNumber, setPanNumber] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (!panNumber || !accepted) {
      return alert('Please enter PAN and accept the Terms & Conditions.');
    }
    navigation.navigate('Aadhaar'); // Change as needed
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Icon name="arrow-left" size={22} color={Colors.primary} />
      </TouchableOpacity>

      <Text style={styles.title}>Complete your KYC</Text>
      <Text style={styles.subtitle}>Your Data is Completely Secure with us</Text>

      <Image
        source={require('../../assets/Image/Pan.png')} // your uploaded image path
        style={styles.panImage}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
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
          tintColors={{ true: Colors.primary }}
        />
        <Text style={styles.checkboxText}>
          I Accept the <Text style={styles.underline}>Term & Condition</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
        <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.button}>
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
  backBtn: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Okra-Bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.disabled,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Okra-Regular',
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
