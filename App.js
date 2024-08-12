import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './OnboardingScreen';
import DashboardScreen from './DashboardScreen';
import TransactionScreen from './TransactionScreen';
import CreditLimitScreen from './CreditLimitScreen';
import BillPaymentScreen from './BillPaymentScreen';
import RewardPointsScreen from './RewardPointsScreen';
import TravelInsuranceScreen from './TravelInsuranceScreen';
import RealTimeCurrencyConversionScreen from './RealTimeCurrencyConversionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
      if (onboardingStatus === 'true') {
        setOnboardingCompleted(true);
      }
    };
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {onboardingCompleted ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
        <Stack.Screen name="Transactions" component={TransactionScreen} />
        <Stack.Screen name="Credit Limit" component={CreditLimitScreen} />
        <Stack.Screen name="Bill Payment" component={BillPaymentScreen} />
        <Stack.Screen name="Reward Points" component={RewardPointsScreen} />
        <Stack.Screen name="Travel Insurance" component={TravelInsuranceScreen} />
        <Stack.Screen name="Real Time Currency Conversion" component={RealTimeCurrencyConversionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;