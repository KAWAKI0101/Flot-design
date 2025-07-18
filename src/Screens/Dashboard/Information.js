import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const sections = [
  {
    title: '1. Consent',
    body: `You hereby expressly consent to provide the information that may be required in relation to the Services being rendered by us. You acknowledge that you have read and understood this Privacy Policy and agree to be bound by it.`,
  },
  {
    title: '2. Information Collected and Used',
    body: `Such information of the User may include but not be limited to the User’s name, address, date of birth, mobile number, email ID, gender, PAN number, Aadhaar number (masked), bank account number, IFSC code, account statements, live images/selfies, income details, and such Know Your Customer (KYC) documents as may be required under applicable laws.`,
  },
  {
    subTitle: 'Third Party Information',
    body: `We may work closely with affiliates, technical subcontractors, analytics providers, search information providers, and may receive information about you from them. This includes information you provide to us and information collected automatically.`,
  },
  {
    subTitle: 'PII Data',
    body: `Flot collects Customer Data including Personal Identifiable Information (PII), Aadhaar (with redactions), bank account details, and transactional behavior data, which are shared securely with registered NBFCs and Banks.`,
  },
  {
    title: '3. Purpose of Collection',
    body: `• To verify your identity and eligibility for credit\n• To process your application and disburse loan\n• To comply with legal and regulatory requirements\n• To detect and prevent fraud\n• To improve user experience and service delivery`,
  },
  {
    title: '4. Data Retention and Deletion',
    body: `We retain your personal data only as long as it is necessary for providing you with our services or as required by law. After the end of the retention period, we delete or anonymize your information.`,
  },
  {
    title: '5. Procedure for Data Removal',
    body: `If you want your personal information to be removed from our system, you may raise a request via email. Subject to legal obligations, we will remove your data promptly.`,
  },
  {
    title: '7. Sharing of Information',
    body: `GROWCAP shall not will not rent, sell or share User information and will not disclose any of the User’s personally identifiable information to third parties , except when the disclosure is

1. pursuant to obtaining the User’s permission

2. in connection with disclosure to financial institutions and banks.

3. in connection with the services being rendered through the App.

4. help investigate, prevent or take action regarding unlawful and illegal activities.

5. special circumstances such as compliance with court orders.

6. to enforce your contractual obligations to us.`,
  },
  {
    title: '8. Standards for Handling Data Breaches',
    body: `While GROWCAP invests in best in class Data Safety and Security Standards, in the improbable event of a data breach; GROWCAP will activate its Incident Management protocol to mitigate and safeguard our user’s data. Furthermore, GROWCAP shall inform and update its users as prescribed by the prevalent guidelines at the time.`,
  },
  {
    title: '9. Third party policies',
    body: `We may work with different third parties in connection with the App or for providing the Services. Please be aware that any information provided to any third-party or when you click through or are routed to third-party links while using the App, Our Privacy Policy no longer will apply and that We are not responsible for the privacy practices of these third parties. In general, the third-party service providers used by Us will only collect, use and disclose your information to the extent necessary to allow them to perform the services or activities they provide Us. In such cases, We share the Information securely and use commercially reasonable efforts to ensure that all recipients comply with confidentiality, fidelity and secrecy obligations and sign covenants in this regard. However, certain third-party service providers (such as banks, financial institutions, co-lending partners, payment aggregators or credit information companies), have their own privacy policies in respect to the information We are required to provide to them. We recommend that you read their privacy policies to understand the manner in which your Information will be handled by them. In particular, remember that certain third-party service providers may be located in or have facilities that are located in a different jurisdiction. So, if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which such service provider is or its facilities are located. Once you leave the App or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or the App’s Terms and Conditions and in such circumstances the privacy policy of such other website will apply. We will not be liable for any acts or omissions of the third-party service provider. The list of third-parties collecting Information through the App is available at this link , which will be updated from time to time, for your reference.`,
  },  
  {
    title: '10. Procedure for Correcting Inaccuracies in Your Information',
    body: `In the event that any Personal Information provided by You is inaccurate, incomplete or outdated then You shall have the right to provide Us with the accurate, complete and up to date data and have Us rectify such data at Our end immediately. We urge You to ensure that You always provide Us with accurate and correct information/data to ensure Your use of Our Services is uninterrupted.

    In case of modification of Personal Information, Users will be required to furnish supporting documents relating to change in Personal Information for the purpose of verification by GROWCAP.`,
  },
  {
    title: '11. Changes in Privacy Policy ',
    body: `Our Privacy Policy might change from time to time, and GROWCAP will provide notice of it on your email address linked to your Account or can be seen by you in our Website.`,
  },
  {
    title: '12. Incorporation of Privacy Policy to the Terms of Use',
    body: `This Privacy Policy is incorporated to the Terms of use (Terms) and other specific terms of this Website/Services/Account.`,
  },
  {
    title: '13. Contact',
    body: `For any information regarding the Privacy Policy, please contact us on : ops@myflot.in`,
  },
];

const Information = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#2563eb', '#60a5fa']} style={styles.header}>
        <Text style={styles.headerText}>Information</Text>
      </LinearGradient>

      <LottieView
        source={require('../../animations/info.json')} // Replace with your Lottie file
        autoPlay
        loop
        speed={1}
        style={styles.animation}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {sections.map((item, index) => (
          <View key={index} style={styles.card}>
            {item.title && <Text style={styles.cardTitle}>{item.title}</Text>}
            {item.subTitle && <Text style={styles.cardSubTitle}>{item.subTitle}</Text>}
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Okra-Bold',
  },
  animation: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: -20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Okra-Bold',
    color: '#2563eb',
    marginBottom: 6,
  },
  cardSubTitle: {
    fontSize: 15,
    fontFamily: 'Okra-Medium',
    color: '#60a5fa',
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 14,
    color: '#363636',
    fontFamily: 'Okra-Regular',
    lineHeight: 20,
  },
});
