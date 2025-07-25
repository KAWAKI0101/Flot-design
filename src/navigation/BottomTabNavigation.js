import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../Screens/Dashboard/DashboardScreen';
import HistoryScreen from '../Screens/Dashboard/History';
import InfoScreen from '../Screens/Dashboard/Information';
import Payment from '../Screens/Dashboard/Payment';
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
        tabBarStyle: {
          height: 70, // ⬅️ Increase the height (default is ~50)
          paddingBottom: 10, // ⬅️ Optional: adjust vertical spacing
          paddingTop: 10,
        },
        swipeEnabled: true,
        animationEnabled:true,
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
            case 'Payment':
              iconName = 'credit-card-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
