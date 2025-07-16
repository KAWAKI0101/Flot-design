import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../utils/Constants';

const ApplyLoanScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [reasonError, setReasonError] = useState(false);

  const handleContinue = () => {
    const valid = amount.trim() !== '' && reason.trim() !== '';
    setAmountError(amount.trim() === '');
    setReasonError(reason.trim() === '');

    if (valid) {
      navigation.navigate('SubmitBasicDetails');
    }
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.primary_light, Colors.secondary]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
              <View style={[styles.inputWrapper, amountError && styles.errorBorder]}>
                <Text style={styles.currency}>₹</Text>
                <TextInput
                  style={styles.input}
                  placeholder="20,000"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    if (text.trim() !== '') setAmountError(false);
                  }}
                />
              </View>

              <Text style={styles.label}>Why do you need the loan?</Text>
              <TextInput
                style={[styles.fullInput, styles.multilineInput, reasonError && styles.errorBorder]}
                placeholder="e.g. Business, Education"
                placeholderTextColor="#aaa"
                value={reason}
                onChangeText={(text) => {
                  setReason(text);
                  if (text.trim() !== '') setReasonError(false);
                }}
                multiline
              />

              {/* Button */}
              <TouchableOpacity style={styles.buttonWrapper} onPress={handleContinue} activeOpacity={0.9}>
                <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ApplyLoanScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Okra-Medium',
    marginTop: 12,
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
    borderColor: Colors.border,
  },
  fullInput: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  currency: {
    fontSize: 16,
    fontFamily: 'Okra-Bold',
    marginRight: 8,
    color: Colors.text,
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Okra-Regular',
    color: Colors.text,
  },
  buttonWrapper: {
    marginTop: 30,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
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
  errorBorder: {
    borderColor: 'red',
  },
});
