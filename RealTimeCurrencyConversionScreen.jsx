import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const RealTimeCurrencyConversionScreen = () => {
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=fe233264a30c4786ba7fc55d64cda2f7');
        if (response.ok) {
          const data = await response.json();
          setConversionRates(data.rates);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch currency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConversionRates();
  }, []);

  const handleConvert = () => {
    const fromRate = conversionRates[fromCurrency];
    const toRate = conversionRates[toCurrency];

    if (fromRate && toRate) {
      const result = (amount * toRate) / fromRate;
      setConvertedAmount(result.toFixed(2));
    } else {
      Alert.alert('Error', 'Invalid currency rates.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.conversionCard}>
        <FontAwesome5 name="exchange-alt" size={40} color="#007BFF" />
        <Text style={styles.title}>Currency Conversion Calculator</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>From Currency:</Text>
          <TextInput
            style={styles.input}
            placeholder="From Currency (e.g., USD)"
            value={fromCurrency}
            onChangeText={setFromCurrency}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>To Currency:</Text>
          <TextInput
            style={styles.input}
            placeholder="To Currency (e.g., INR)"
            value={toCurrency}
            onChangeText={setToCurrency}
          />
        </View>

        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        {convertedAmount !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Converted Amount:</Text>
            <Text style={styles.resultValue}>{`${convertedAmount} ${toCurrency}`}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  conversionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  convertButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  convertButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007BFF',
  },
});

export default RealTimeCurrencyConversionScreen;
