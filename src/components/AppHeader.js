import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '../utils/Constants';

const AppHeader = ({ title, subtitle, onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="arrow-back-ios" size={20} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.Regular,
    color: Colors.disabled,
    marginTop: 2,
  },
});
