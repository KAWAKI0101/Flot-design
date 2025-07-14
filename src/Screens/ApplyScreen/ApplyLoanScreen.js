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
    const [subReason, setSubReason] = useState('');
    const [runningLoan, setRunningLoan] = useState(null);

    const handleContinue = () => {
        if (!amount || !reason || !subReason || runningLoan === null) {
            return alert('Please complete all fields');
        }
        navigation.navigate('SubmitBasicDetails');
    };

    return (
        <LinearGradient
            colors={[Colors.primary, Colors.primary_light, Colors.secondary]}
            style={styles.gradient}
        >
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
                                style={[styles.input, styles.fullInput, styles.multilineInput]}
                                placeholder="e.g. Business, Education"
                                placeholderTextColor="#aaa"
                                value={reason}
                                onChangeText={setReason}
                                multiline
                            />

                            <Text style={styles.label}>Specify in detail</Text>
                            <TextInput
                                style={[styles.input, styles.fullInput, styles.multilineInput]}
                                placeholder="e.g. Medical Emergency, Exam Fee"
                                placeholderTextColor="#aaa"
                                value={subReason}
                                onChangeText={setSubReason}
                                multiline
                            />

                            <Text style={styles.label}>Do you have any running loan?</Text>
                            <View style={styles.radioGroup}>
                                {[
                                    { label: 'YES', value: true },
                                    { label: 'NO', value: false },
                                ].map((option) => (
                                    <TouchableOpacity
                                        key={option.label}
                                        onPress={() => setRunningLoan(option.value)}
                                        style={styles.radioOption}
                                    >
                                        <View style={styles.radio}>
                                            {runningLoan === option.value && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.radioText}>{option.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Button */}
                            <TouchableOpacity
                                style={styles.buttonWrapper}
                                onPress={handleContinue}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={[Colors.primary, Colors.primary_light]}
                                    style={styles.button}
                                >
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
    radioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        gap: 30,
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
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    radioText: {
        fontSize: 14,
        fontFamily: 'Okra-Medium',
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
});
