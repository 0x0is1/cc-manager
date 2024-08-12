import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Available Credit Limit: ₹10,000</Text>
      
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Transactions')}
      >
        <Icon name="list" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          <Text style={styles.cardDescription}>View your recent transactions.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Credit Limit')}
      >
        <Icon name="credit-card" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Credit Limit</Text>
          <Text style={styles.cardDescription}>View and manage your credit limit.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Bill Payment')}
      >
        <Icon name="usd" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Bill Payment</Text>
          <Text style={styles.cardDescription}>Pay your bills quickly and easily.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Reward Points')}
      >
        <Icon name="star" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Reward Points</Text>
          <Text style={styles.cardDescription}>Check and redeem your reward points.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Travel Insurance')}
      >
        <Icon name="plane" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Travel Insurance</Text>
          <Text style={styles.cardDescription}>Manage your travel insurance.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Real Time Currency Conversion')}
      >
        <Icon name="globe" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Real-Time Currency Conversion</Text>
          <Text style={styles.cardDescription}>Get the latest conversion rates.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default DashboardScreen;
