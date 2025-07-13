import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dummyBasicDetails from '../../DummyData/DummyBasicDetails.js'; // ✅ IMPORT DUMMY DATA

const SubmitBasicDetailsScreen = ({ navigation }) => {
  const [dob, setDob] = useState(dummyBasicDetails.dob);
  const [showPicker, setShowPicker] = useState(false);
  const [pincode, setPincode] = useState(dummyBasicDetails.pincode);
  const [city, setCity] = useState(dummyBasicDetails.city);
  const [employmentType, setEmploymentType] = useState(dummyBasicDetails.employmentType);
  const [monthlyIncome, setMonthlyIncome] = useState(dummyBasicDetails.monthlyIncome);
  const [incomeReceivedIn, setIncomeReceivedIn] = useState(dummyBasicDetails.incomeReceivedIn);
  const [accepted, setAccepted] = useState(dummyBasicDetails.accepted);

  const handleContinue = () => {
    if (!accepted) return alert('Please accept the terms & conditions.');

    console.log({
      dob,
      pincode,
      city,
      employmentType,
      monthlyIncome,
      incomeReceivedIn,
      accepted,
    });

    if (employmentType === 'self-employed') {
      navigation.navigate('Rejected');
    } else if (employmentType === 'salaried') {
      navigation.navigate('KYCScreen');
    } else {
      alert('Please select employment type.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={22} color="#6B21A8" />
      </TouchableOpacity>

      <View style={styles.progressWrapper}>
        <View style={styles.progressDotActive} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      <Text style={styles.title}>Submit Basic Details</Text>
      <Text style={styles.subtitle}>Your data is completely secure with us</Text>

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.inputBox}>
        <Text style={styles.inputText}>{dob.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Pin Code</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your area pin code"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Employment Type</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={employmentType} onValueChange={setEmploymentType}>
          <Picker.Item label="Select employment type" value="" />
          <Picker.Item label="Salaried" value="salaried" />
          <Picker.Item label="Self-Employed" value="self-employed" />
        </Picker>
      </View>

      <Text style={styles.label}>Monthly Income</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your income"
        keyboardType="numeric"
        value={monthlyIncome}
        onChangeText={setMonthlyIncome}
      />

      <Text style={styles.label}>Income Received In</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={incomeReceivedIn} onValueChange={setIncomeReceivedIn}>
          <Picker.Item label="Select mode" value="" />
          <Picker.Item label="Bank" value="bank" />
          <Picker.Item label="Cash" value="cash" />
        </Picker>
      </View>

      <View style={styles.checkboxWrapper}>
        <CheckBox value={accepted} onValueChange={setAccepted} tintColors={{ true: '#6B21A8' }} />
        <Text style={styles.checkboxText}>I Accept the <Text style={styles.underline}>Terms & Conditions</Text></Text>
      </View>

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
        <LinearGradient colors={['#6B21A8', '#9333EA']} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.laterBtn}>
        <Text style={styles.laterText}>Do this Later</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SubmitBasicDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 16,
  },
  progressWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  progressDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9333EA',
    marginHorizontal: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Okra-Bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Okra-Medium',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    fontFamily: 'Okra-Regular',
    fontSize: 15,
  },
  inputText: {
    color: '#333',
    fontFamily: 'Okra-Regular',
    fontSize: 15,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  checkboxText: {
    marginLeft: 8,
    fontFamily: 'Okra-Regular',
    fontSize: 13,
    color: '#222',
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
    letterSpacing: 1,
  },
  laterBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  laterText: {
    color: '#6B21A8',
    fontSize: 14,
    fontFamily: 'Okra-Medium',
    textDecorationLine: 'underline',
  },
});
