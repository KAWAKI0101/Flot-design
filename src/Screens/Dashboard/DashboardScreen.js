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
import { Colors, Fonts } from '../../utils/Constants';

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
        Animated.timing(bellAnim, { toValue: -6, duration: 300, useNativeDriver: true }),
        Animated.timing(bellAnim, { toValue: 6, duration: 300, useNativeDriver: true }),
        Animated.timing(bellAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(1500),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient colors={[Colors.primary, Colors.primary_light, Colors.secondary]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Animated.View style={[styles.topCard, { opacity: fadeAnim }]}>
          <View style={styles.headerRow}>
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
          </View>

          <View style={styles.loanInfoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Maximum Loan</Text>
              <Text style={styles.infoValue}>₹100,000</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Maximum Tenure</Text>
              <Text style={styles.infoValue}>90 Days</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.whiteCard}>
          <Text style={styles.cardTitle}>Get Loan on Click</Text>
          <Text style={styles.cardSubtitle}>KYC | Basic Details | Disbursal</Text>
          <Text style={styles.cardNote}>Minimum Documents, 100% Online Process</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.applyButtonWrapper}
          onPress={() => navigation.navigate('ApplyLoan')}
        >
          <LinearGradient colors={[Colors.secondary, Colors.primary]} style={styles.applyButton}>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
  greeting: {
    color: '#ddd',
    fontSize: 13,
    fontFamily: Fonts.Regular,
  },
  bellIcon: {
    padding: 8,
  },
  loanInfoRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  infoBlock: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    color: '#eee',
    fontSize: 14,
    fontFamily: Fonts.Regular,
    marginBottom: 6,
  },
  infoValue: {
    color: '#fff',
    fontSize: 22,
    fontFamily: Fonts.Bold,
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    opacity: 0.4,
  },
  whiteCard: {
    marginTop: -20,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    color: Colors.text,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 15,
    fontFamily: Fonts.Medium,
    color: '#444',
    marginBottom: 4,
  },
  cardNote: {
    fontSize: 13,
    fontFamily: Fonts.Regular,
    color: Colors.disabled,
  },
  applyButtonWrapper: {
    marginTop: 32,
    marginHorizontal: 24,
    borderRadius: 14,
    elevation: 4,
  },
  applyButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: Fonts.Bold,
    letterSpacing: 1,
  },
});

export default DashboardScreen;
