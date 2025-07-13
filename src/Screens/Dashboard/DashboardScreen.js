import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bellAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bellAnim, {
          toValue: -6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bellAnim, {
          toValue: 6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bellAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient colors={['#9333EA', '#4C1D95']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.topCard, { opacity: fadeAnim }]}>
          <View style={styles.profileSection}>
            <Image
              source={require('../../assets/Image/user.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.name}>Gokul Kumari</Text>
              <Text style={styles.greeting}>Good morning</Text>
            </View>
          </View>

          <Animated.View style={[styles.bellIcon, { transform: [{ translateX: bellAnim }] }]}>
            <Icon name="bell-outline" size={24} color="#fff" />
          </Animated.View>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Maximum Loan</Text>
              <Text style={styles.infoValue}>100,000</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Maximum Tenure</Text>
              <Text style={styles.infoValue}>Max 90 Day</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.whiteCard}>
          <Text style={styles.cardTitle}>Get Loan on Click</Text>
          <Text style={styles.cardSubtitle}>KYC | Basic Details | Disbursal</Text>
          <Text style={styles.cardNote}>Minimum Document, Online Process</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.applyButtonWrapper}
          onPress={() => navigation.navigate('ApplyLoan')} // 👈 navigate to ApplyLoan screen
        >
          <LinearGradient colors={['#6E00FF', '#B300E7']} style={styles.applyButton}>
            <Text style={styles.applyText}>Apply Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  topCard: {
    padding: 24,
    paddingTop: 64,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Okra-Bold',
  },
  greeting: {
    color: '#ddd',
    fontSize: 13,
    fontFamily: 'Okra-Regular',
  },
  bellIcon: {
    position: 'absolute',
    top: 65,
    right: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  infoBlock: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    color: '#eee',
    fontSize: 14,
    fontFamily: 'Okra-Regular',
    marginBottom: 6,
  },
  infoValue: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Okra-ExtraBold',
  },
  whiteCard: {
    marginHorizontal: 24,
    marginTop: -16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Okra-Bold',
    color: '#111',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 15,
    fontFamily: 'Okra-Medium',
    color: '#444',
    marginBottom: 6,
  },
  cardNote: {
    fontSize: 13,
    fontFamily: 'Okra-Regular',
    color: '#999',
  },
  applyButtonWrapper: {
    marginTop: 30,
    marginHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
  },
  applyButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Okra-Bold',
  },
});

export default DashboardScreen;
