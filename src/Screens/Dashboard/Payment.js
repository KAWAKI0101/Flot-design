import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { Colors, Fonts } from '../../utils/Constants';
import { History } from '../../DummyData/DummyHistoryData';
import LottieView from 'lottie-react-native';
import CustomButton from '../../utils/CustomButton'; // path depends on your structure

const PaymentScreen = ({ navigation }) => {
  const activeLoan = History.find(item => item.status === 'Active');

  if (!activeLoan) {
    return (
      <View style={styles.container}>
        <AppHeader title="Loan Payment" onBackPress={() => navigation.goBack()} />
        <Text style={styles.noLoanText}>No active loan found.</Text>
      </View>
    );
  }

  const totalDue = activeLoan.repaymentAmount;
  const tax = 18;
  const fee = totalDue - tax;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Payment Details"
        onBackPress={() => navigation.goBack()}
      />

      <LottieView
        source={require('../../animations/Payment.json')}
        autoPlay
        loop
        speed={1.5} // You can adjust speed here
        style={styles.lottie}
      />

      {/* <Text style={styles.dateText}>
        {activeLoan.createdAt} - {activeLoan.repaymentDate}
      </Text> */}

      <View style={styles.billCard}>
        <Text style={styles.sectionTitle}>Pay Due's Amount </Text>

        {/* <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Jackson Maine</Text>
        </View> */}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Loan No</Text>
          <Text style={[styles.value, { fontFamily: Fonts.Medium }]}>
            CLN-10000210788
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone number</Text>
          <Text style={styles.value}>+8424599721</Text>
        </View>

       
        <View style={styles.infoRow}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.value}>{activeLoan.createdAt}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Till Now</Text>
          <Text style={styles.value}>{activeLoan.TillnowAt}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.value}>{activeLoan.repaymentDate}</Text>
        </View>

        {/* <View style={styles.infoRow}>
          <Text style={styles.label}>Electric fee</Text>
          <Text style={styles.amount}>${fee}</Text>
        </View> */}
         <View style={styles.infoRow}>
          <Text style={styles.label}>Approval Amount</Text>
          <Text style={styles.value}>{activeLoan.approvedAmount}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Disbursal Amount</Text>
          <Text style={styles.value}>{activeLoan.DisbursalAmount}</Text>
        </View>


        <View style={styles.infoRow}>
          <Text style={styles.label}>Tax + GST</Text>
          <Text style={[styles.amount, { color: Colors.primary }]}>${tax}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>TOTAL</Text>
          <Text style={[styles.amount, { color: '#f43f5e', fontFamily: Fonts.Bold }]}>
            ${totalDue}
          </Text>
        </View>
      </View>
      

      <CustomButton
        title="Pay Able Aomount"
        onPress={() => console.log('Pay')}
        loading={false}
        disabled={false}
        styles={{color:"#fff"}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: Colors.backgroundSecondary,
  },
  lottie: {
    width: '100%',
    height: 168,
    marginBottom: 8,
  },
  dateText: {
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    color: Colors.disabled,
    fontSize: 13,
    marginBottom: 16,
  },
  billCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontFamily: Fonts.Regular,
    color: Colors.disabled,
    fontSize: 14,
  },
  value: {
    fontFamily: Fonts.Medium,
    color: Colors.text,
    fontSize: 14,
    textAlign: 'right',
  },
  amount: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: Colors.primary,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginVertical: 10,
  },
  noLoanText: {
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    color: Colors.disabled,
    fontSize: 16,
    marginTop: 60,
  },
});

export default PaymentScreen;
