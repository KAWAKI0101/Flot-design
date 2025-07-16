// src/screens/DashboardScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Fonts } from '../../utils/Constants';
import { statsData, benefitsData } from '../../DummyData/DashboardDummyData';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient
        colors={[Colors.primary, Colors.primary_light, Colors.secondary]}
        style={styles.headerContainer}
      >
        <View style={styles.topRow}>
          <Icon name="account-circle" size={32} color="#fff" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.username}>Gokul Kumari</Text>
            <Text style={styles.greeting}>Good morning</Text>
          </View>
          <Icon name="bell-outline" size={24} color="#fff" />
        </View>

        <LinearGradient
          colors={['#ffffff33', '#ffffff11']}
          style={styles.loanInfoCard}
        >
          <View style={styles.loanBox}>
            <Text style={styles.loanLabel}>Maximum Loan</Text>
            <Text style={styles.loanValue}>₹100,000</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.loanBox}>
            <Text style={styles.loanLabel}>Maximum Tenure</Text>
            <Text style={styles.loanValue}>90 Days</Text>
          </View>
        </LinearGradient>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* WHY CHOOSE US */}
        <View style={styles.cardSection}>
          <View style={styles.featureBox}>
            <Icon name="clock-outline" size={24} color={Colors.primary} />
            <Text style={styles.featureTitle}>Quick Approval</Text>
            <Text style={styles.featureText}>Get approved in just 24 hours</Text>
          </View>
          <View style={styles.featureBox}>
            <Icon name="shield-lock-outline" size={24} color={Colors.primary} />
            <Text style={styles.featureTitle}>Secure Process</Text>
            <Text style={styles.featureText}>Bank-level security & encryption</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {statsData.map((item, idx) => (
            <View key={idx} style={styles.statItem}>
              <Icon name={item.icon} size={22} color={Colors.primary} />
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statSub}>{item.subLabel}</Text>
            </View>
          ))}
        </View>

        {/* BENEFITS */}
        <View style={styles.benefitsCard}>
          <Text style={styles.cardHeading}>Loan Benefits</Text>
          {benefitsData.map((point, idx) => (
            <View key={idx} style={styles.benefitItem}>
              <Icon name="check-circle" size={18} color="green" />
              <Text style={styles.benefitText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* APPLY BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ApplyLoan')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primary_light, Colors.secondary]}
            style={styles.applyButton}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
            <Text style={styles.applySubText}>Get instant approval</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          By proceeding, you agree to our Terms & Conditions and Privacy Policy
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  username: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: '#fff',
  },
  greeting: {
    fontSize: 13,
    fontFamily: Fonts.Regular,
    color: '#f5f5f5',
  },
  loanInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff22',
    paddingVertical: 16,
    borderRadius: 16,
  },
  loanBox: {
    alignItems: 'center',
    flex: 1,
  },
  loanLabel: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: '#f0f0f0',
  },
  loanValue: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    color: '#fff',
    marginTop: 6,
  },
  divider: {
    width: 1,
    backgroundColor: '#ffffff66',
    marginHorizontal: 12,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  featureBox: {
    width: (width - 60) / 2,
    backgroundColor: '#f1f5fd',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  featureTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
    marginTop: 6,
    color: Colors.text,
  },
  featureText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.disabled,
    fontFamily: Fonts.Regular,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 20,
    marginTop: 0, // move up
    marginBottom: 20, // keep bottom space
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: Colors.text,
  },
  statSub: {
    fontSize: 12,
    color: Colors.disabled,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  benefitsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    marginBottom: 20,
  },
  cardHeading: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: Colors.text,
    marginBottom: 14,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Colors.text,
  },
  applyButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 16,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: '#fff',
  },
  applySubText: {
    fontSize: 12,
    color: '#f0f0f0',
    marginTop: 2,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.disabled,
    paddingHorizontal: 30,
    marginTop: 4,
  },
});
