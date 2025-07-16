import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../utils/Constants';

const ConfirmDetailsScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [registeredNumber, setRegisteredNumber] = useState('');
    const [alternateNumber, setAlternateNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');
    const [state, setState] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handlePickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setProfileImage({ uri: response.assets[0].uri });
            }
        });
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formatted = selectedDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
            setDob(formatted);
        }
    };

    const handleConfirm = () => {
        navigation.navigate('NextStep');
    };

    return (
        <LinearGradient colors={['#F0EBFA', '#fcfaffff']} style={styles.gradientContainer}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Confirm Your Address</Text>
                <Text style={styles.subtitle}>Your Data is Completely Secure with us</Text>

                <TouchableOpacity onPress={handlePickImage} style={styles.profileImageWrapper}>
                    <Image
                        source={profileImage ? profileImage : require('../../assets/Image/user.png')}
                        style={styles.profileImage}
                    />
                    <View style={styles.cameraIconWrapper}>
                        <Icon name="camera" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Registered Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter registered number"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={registeredNumber}
                    onChangeText={setRegisteredNumber}
                />

                <Text style={styles.label}>Alternate Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter alternate number"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={alternateNumber}
                    onChangeText={setAlternateNumber}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity style={[styles.input, styles.dateInput]} onPress={() => setShowDatePicker(true)}>
                    <Text style={{ color: dob ? '#222' : '#999', fontFamily: 'Okra-Regular', fontSize: 15 }}>
                        {dob || 'Eg: 22/01/2001'}
                    </Text>
                    <Icon name="calendar-month-outline" size={22} color="#999" />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )}

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter address"
                    placeholderTextColor="#999"
                    value={address}
                    onChangeText={setAddress}
                />

                <Text style={styles.label}>Educational Qualification</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your qualification"
                    placeholderTextColor="#999"
                    value={qualification}
                    onChangeText={setQualification}
                />

                <Text style={styles.label}>State</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your state"
                    placeholderTextColor="#999"
                    value={state}
                    onChangeText={setState}
                />

                <View style={styles.rowLabel}>
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity onPress={() => setGender('Male')} style={styles.radioGroup}>
                        <View style={[styles.circle, gender === 'Male' && styles.selected]} />
                        <Text style={styles.radioText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('Female')} style={styles.radioGroup}>
                        <View style={[styles.circle, gender === 'Female' && styles.selected]} />
                        <Text style={styles.radioText}>Female</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowLabel}>
                    <Text style={styles.label}>Status</Text>
                    <TouchableOpacity onPress={() => setStatus('Married')} style={styles.radioGroup}>
                        <View style={[styles.circle, status === 'Married' && styles.selected]} />
                        <Text style={styles.radioText}>Married</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStatus('Unmarried')} style={styles.radioGroup}>
                        <View style={[styles.circle, status === 'Unmarried' && styles.selected]} />
                        <Text style={styles.radioText}>Unmarried</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.buttonWrapper} onPress={handleConfirm} activeOpacity={0.9}>
                    <LinearGradient colors={[Colors.primary, Colors.primary_light]} style={styles.button}>
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
    title: {
        fontSize: 22,
        fontFamily: 'Okra-Bold',
        color: Colors.text,
        marginTop: 16,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Okra-Regular',
        color: '#666',
        marginBottom: 24,
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: 6,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: Colors.text,
        fontFamily: 'Okra-Medium',
        marginBottom: 4,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#222',
        fontFamily: 'Okra-Regular',
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    radioText: {
        fontSize: 14,
        fontFamily: 'Okra-Regular',
        marginLeft: 6,
        color: Colors.text,
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    selected: {
        backgroundColor: Colors.primary,
    },
    buttonWrapper: {
        marginTop: 24,
        borderRadius: 12,
        width: '100%',
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
