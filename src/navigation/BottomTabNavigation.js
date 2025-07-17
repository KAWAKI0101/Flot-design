import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../Screens/Dashboard/DashboardScreen';
import HistoryScreen from '../Screens/Dashboard/History';
import InfoScreen from '../Screens/Dashboard/Information';
import BankDetailsScreen from '../Screens/Dashboard/BankStatus';
import { Colors } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.disabled,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'History':
              iconName = 'history';
              break;
            case 'Info':
              iconName = 'information-outline';
              break;
            case 'Bank':
              iconName = 'bank-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Bank" component={BankDetailsScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Home" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
