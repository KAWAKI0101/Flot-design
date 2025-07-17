import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader.js'; // ✅ Make sure path is correct
import dummyBasicDetails from '../../DummyData/DummyBasicDetails.js';
import { Colors, Fonts } from '../../utils/Constants';

const SubmitBasicDetailsScreen = ({ navigation }) => {
  const [dob, setDob] = useState(dummyBasicDetails.dob);
  const [showPicker, setShowPicker] = useState(false);
  const [city, setCity] = useState(dummyBasicDetails.city);
  const [employmentType, setEmploymentType] = useState(dummyBasicDetails.employmentType);
  const [monthlyIncome, setMonthlyIncome] = useState(dummyBasicDetails.monthlyIncome);
  const [incomeReceivedIn, setIncomeReceivedIn] = useState(dummyBasicDetails.incomeReceivedIn);
  const [accepted, setAccepted] = useState(dummyBasicDetails.accepted);

  const handleContinue = () => {
    if (!accepted) return alert('Please accept the terms & conditions.');

    if (employmentType === 'self-employed') {
      navigation.navigate('Rejected');
    } else if (employmentType === 'salaried') {
      navigation.navigate('KYCScreen');
    } else {
      alert('Please select employment type.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* ✅ Reusable Header */}
        <AppHeader
          title="Submit Basic Details"
          subtitle="Your data is completely secure with us"
          onBackPress={() => navigation.goBack()}
        />

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

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your city"
          placeholderTextColor={Colors.disabled}
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Employment Type</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={employmentType}
            onValueChange={setEmploymentType}
            style={{ color: Colors.text, fontFamily: Fonts.Regular }}
          >
            <Picker.Item label="Select employment type" value="" />
            <Picker.Item label="Salaried" value="salaried" />
            <Picker.Item label="Self-Employed" value="self-employed" />
          </Picker>
        </View>

        <Text style={styles.label}>Monthly Income</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter your income"
          placeholderTextColor={Colors.disabled}
          keyboardType="numeric"
          value={monthlyIncome}
          onChangeText={setMonthlyIncome}
        />

        <Text style={styles.label}>Income Received In</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={incomeReceivedIn}
            onValueChange={setIncomeReceivedIn}
            style={{ color: Colors.text, fontFamily: Fonts.Regular }}
          >
            <Picker.Item label="Select mode" value="" />
            <Picker.Item label="Bank" value="bank" />
            <Picker.Item label="Cash" value="cash" />
          </Picker>
        </View>

        <View style={styles.checkboxWrapper}>
          <CheckBox
            value={accepted}
            onValueChange={setAccepted}
            tintColors={{ true: Colors.primary }}
          />
          <Text style={styles.checkboxText}>
            I Accept the <Text style={styles.underline}>Terms & Conditions</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
          <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.laterBtn}>
          <Text style={styles.laterText}>Do this Later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundSecondary,
    fontFamily: Fonts.Regular,
    fontSize: 15,
  },
  inputText: {
    color: Colors.text,
    fontFamily: Fonts.Regular,
    fontSize: 15,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.backgroundSecondary,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  checkboxText: {
    marginLeft: 8,
    fontFamily: Fonts.Regular,
    fontSize: 13,
    color: Colors.text,
  },
  underline: {
    fontFamily: Fonts.SemiBold,
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
    fontFamily: Fonts.Bold,
    fontSize: 16,
    letterSpacing: 1,
  },
  laterBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  laterText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: Fonts.Medium,
    textDecorationLine: 'underline',
  },
});

export default SubmitBasicDetailsScreen;
