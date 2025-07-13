import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ApplyLoanScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [runningLoan, setRunningLoan] = useState(null);

  const handleContinue = () => {
    if (!amount || !reason || runningLoan === null) {
      return alert('Please complete all fields');
    }
    navigation.navigate('SubmitBasicDetails');
  };

  return (
    <LinearGradient colors={['#6E00FF', '#9333EA']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Apply for a Loan</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.label}>How much do you want to borrow?</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.currency}>₹</Text>
              <TextInput
                style={styles.input}
                placeholder="20,000"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <Text style={styles.label}>Why do you need the loan?</Text>
            <TextInput
              style={[styles.input, styles.fullInput]}
              placeholder="Medical Emergency"
              placeholderTextColor="#aaa"
              value={reason}
              onChangeText={setReason}
            />

            <Text style={styles.label}>Do you have any running loan?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setRunningLoan(true)} style={styles.radioOption}>
                <View style={[styles.radio, runningLoan === true && styles.radioSelected]} />
                <Text style={styles.radioText}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRunningLoan(false)} style={styles.radioOption}>
                <View style={[styles.radio, runningLoan === false && styles.radioSelected]} />
                <Text style={styles.radioText}>NO</Text>
              </TouchableOpacity>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
              <LinearGradient colors={['#6B7280', '#374151']} style={styles.button}>
                

                <Text style={styles.buttonText}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ApplyLoanScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Okra-Bold',
    color: '#fff',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Okra-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fullInput: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 12,
    // paddingTop:1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  currency: {
    fontSize: 16,
    fontFamily: 'Okra-Bold',
    marginRight: 8,
    color: '#111',
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Okra-Regular',
    color: '#000',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#9333EA',
    marginRight: 6,
  },
  radioSelected: {
    backgroundColor: '#9333EA',
  },
  radioText: {
    fontSize: 14,
    fontFamily: 'Okra-Medium',
    color: '#222',
  },
  buttonWrapper: {
    marginTop: 30,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#F97316',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Okra-Bold',
    letterSpacing: 1,
  },
});
