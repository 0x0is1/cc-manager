import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const BillPaymentScreen = () => {
  const [amount, setAmount] = useState('5000');
  const [totalDue, setTotalDue] = useState('0');
  const [totalEMI, setTotalEMI] = useState('0');

  useEffect(() => {
    // Fetch data from the API or use dummy data
    const fetchData = async () => {
      try {
        const response = await fetch('https://example.com/api/bill-details');
        if (response.ok) {
          const data = await response.json();
          setTotalDue(data.totalDue);
          setTotalEMI(data.totalEMI);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        // Fallback to dummy data
        setTotalDue('15,000');
        setTotalEMI('10,000');
        Alert.alert('Error', 'Failed to fetch bill details. Using dummy data.');
      }
    };

    fetchData();
  }, []);

  const handlePayBill = async () => {
    try {
      // Simulate a network request
      const response = await fetch('https://example.com/api/pay-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Bill paid successfully!');
      } else {
        Alert.alert('Error', 'Failed to pay the bill.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill Payment</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Total Due:</Text>
        <Text style={styles.infoValue}>₹{totalDue}</Text>
        <Text style={styles.infoLabel}>Total EMI Paid:</Text>
        <Text style={styles.infoValue}>₹{totalEMI}</Text>
      </View>

      <View style={styles.paymentCard}>
        <FontAwesome5 name="file-invoice-dollar" size={40} color="#007BFF" />
        <Text style={styles.amountLabel}>Enter Bill Amount</Text>
        <TextInput
          style={styles.amountInput}
          value={`₹${amount}`}
          onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.payButton} onPress={handlePayBill}>
          <Text style={styles.payButtonText}>Pay Bill</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  paymentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  amountInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
  payButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default BillPaymentScreen;
