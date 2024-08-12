import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('All');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://example.com/api/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data.transactions);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        // Fallback to dummy data
        setTransactions([
          { id: '12345', date: '2023-02-10', amount: 5000, type: 'Debit', paidTo: 'Amazon' },
          { id: '67890', date: '2023-02-05', amount: 2000, type: 'Credit', paidTo: 'Netflix' },
          { id: '11223', date: '2023-01-25', amount: 1500, type: 'Debit', paidTo: 'Uber' },
        ]);
        Alert.alert('Error', 'Failed to fetch transactions. Using dummy data.');
      }
    };

    fetchTransactions();
  }, []);

  const handleSort = (key) => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (key === 'amount') return b.amount - a.amount;
      return new Date(b.date) - new Date(a.date);
    });
    setSortBy(key);
    setTransactions(sortedTransactions);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filterBy === 'All') return true;
    return transaction.type === filterBy;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.filter}>
          <Text style={styles.filterLabel}>Sort by:</Text>
          <Picker
            selectedValue={sortBy}
            style={styles.picker}
            onValueChange={(itemValue) => handleSort(itemValue)}
          >
            <Picker.Item label="Date" value="date" />
            <Picker.Item label="Amount" value="amount" />
          </Picker>
        </View>

        <View style={styles.filter}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <Picker
            selectedValue={filterBy}
            style={styles.picker}
            onValueChange={(itemValue) => setFilterBy(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Debit" value="Debit" />
            <Picker.Item label="Credit" value="Credit" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <FontAwesome5 
              name={item.type === 'Debit' ? 'arrow-down' : 'arrow-up'} 
              size={24} 
              color={item.type === 'Debit' ? '#DC3545' : '#28A745'}
            />
            <View style={styles.details}>
              <Text style={styles.transactionDate}>{item.date}</Text>
              <Text style={styles.transactionPaidTo}>Paid to: {item.paidTo}</Text>
            </View>
            <View style={styles.amountAndId}>
              <Text style={styles.transactionAmount}>{`₹${item.amount.toLocaleString()}`}</Text>
              <Text style={styles.transactionId}>ID: {item.id}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  picker: {
    height: 50,
    width: 150,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  transactionDate: {
    fontSize: 16,
    color: '#555',
  },
  transactionPaidTo: {
    fontSize: 14,
    color: '#777',
  },
  amountAndId: {
    alignItems: 'flex-end',
    flex: 1,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  transactionId: {
    fontSize: 12,
    color: '#999',
  },
});

export default TransactionScreen;
