import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from '@react-native-community/progress-bar-android';

const CreditLimitScreen = () => {
  const [totalCreditLimit, setTotalCreditLimit] = useState(10000);
  const [creditLimitUsed, setCreditLimitUsed] = useState(5000);
  const [creditLimitAvailable, setCreditLimitAvailable] = useState(5000);
  const [creditUsagePercentage, setCreditUsagePercentage] = useState(0);

  useEffect(() => {
    const fetchCreditLimitData = async () => {
      try {
        const response = await fetch('https://example.com/api/credit-limit');
        if (response.ok) {
          const data = await response.json();
          setTotalCreditLimit(data.totalCreditLimit);
          setCreditLimitUsed(data.creditLimitUsed);
          setCreditLimitAvailable(data.totalCreditLimit - data.creditLimitUsed);
          setCreditUsagePercentage(data.creditLimitUsed / data.totalCreditLimit);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setTotalCreditLimit(10000);
        setCreditLimitUsed(5000);
        setCreditLimitAvailable(5000);
        setCreditUsagePercentage(0.5);
        Alert.alert('Error', 'Failed to fetch credit limit data. Showing dummy data.');
      }
    };

    fetchCreditLimitData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Limit Overview</Text>

      <View style={styles.creditInfoContainer}>
        <FontAwesome5 name="credit-card" size={24} color="#007BFF" />
        <View style={styles.creditInfoTextContainer}>
          <Text style={styles.creditInfoText}>Total Credit Limit:</Text>
          <Text style={styles.creditInfoAmount}>{`₹${totalCreditLimit.toLocaleString()}`}</Text>
        </View>
      </View>

      <View style={styles.creditInfoContainer}>
        <FontAwesome5 name="credit-card" size={24} color="#28A745" />
        <View style={styles.creditInfoTextContainer}>
          <Text style={styles.creditInfoText}>Credit Limit Used:</Text>
          <Text style={styles.creditInfoAmount}>{`₹${creditLimitUsed.toLocaleString()}`}</Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={creditUsagePercentage}
          color="#007BFF"
          style={styles.progressBar}
        />
      </View>

      <View style={styles.creditInfoContainer}>
        <FontAwesome5 name="credit-card" size={24} color="#FFC107" />
        <View style={styles.creditInfoTextContainer}>
          <Text style={styles.creditInfoText}>Credit Limit Available:</Text>
          <Text style={styles.creditInfoAmount}>{`₹${creditLimitAvailable.toLocaleString()}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  creditInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  creditInfoTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  creditInfoText: {
    fontSize: 16,
    color: '#555',
  },
  creditInfoAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  progressBarContainer: {
    width: '90%',
    marginVertical: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
});

export default CreditLimitScreen;
