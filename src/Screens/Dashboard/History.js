import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { Colors, Fonts } from '../../utils/Constants';
import CustomButton from '../../utils/CustomButton';
import { History } from '../../DummyData/DummyHistoryData';
import LinearGradient from 'react-native-linear-gradient';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return '#60a5fa'; // blue
    case 'Closed': return '#16a34a'; // green
    case 'Rejected': return '#dc2626'; // red
    case 'Settlement': return '#eab308'; // yellow
    default: return Colors.disabled;
  }
};

const LoanCard = ({ item }) => {
  const progress = item.repaymentAmount
    ? (item.collectedAmount / item.repaymentAmount) * 100
    : 0;

  return (
    <LinearGradient
      colors={['#e0ecff', '#f8fbff']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.loanNo}>{item.loanNo}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Loan Amount:</Text>
        <Text style={styles.value}>₹{item.loanAmountRequired}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Approved:</Text>
        <Text style={styles.value}>₹{item.approvedAmount}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Repayment:</Text>
        <Text style={styles.value}>₹{item.repaymentAmount}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Collected:</Text>
        <Text style={styles.value}>₹{item.collectedAmount}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.date}>Start: {item.createdAt}</Text>
        <Text style={styles.date}>Due: {item.repaymentDate || '--'}</Text>
      </View>
    </LinearGradient>
  );
};

const HistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader
        title="Loan History"
        subtitle="Track your past loans"
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={History}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LoanCard item={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* <CustomButton
        title="Apply for New Loan"
        onPress={() => {}}
        loading={false}
        disabled={false}
      /> */}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  loanNo: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    color: Colors.text,
  },
  status: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontFamily: Fonts.Regular,
    fontSize: 13,
    color: Colors.disabled,
  },
  value: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: Colors.text,
  },
  progressBar: {
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginTop: 10,
    marginBottom: 6,
  },
  progress: {
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: Colors.disabled,
    fontFamily: Fonts.Light,
  },
});
