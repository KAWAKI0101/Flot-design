import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import NetworkStatusBanner from './src/components/NetworkStatusBanner'; // adjust path
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <NetworkStatusBanner />
      </SafeAreaView>
      <AppNavigator />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    zIndex: 1000,
  },
});

