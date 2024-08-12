import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TravelInsuranceScreen = () => {
  const [insuranceData, setInsuranceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await fetch('https://example.com/api/travel-insurance');
        if (response.ok) {
          const data = await response.json();
          setInsuranceData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        // Dummy data for fallback
        setInsuranceData({
          policy: 10000,
          coverage: 5000,
          benefits: [
            'Emergency medical expenses up to ₹50,000',
            'Trip cancellation coverage up to ₹20,000',
            'Lost baggage coverage up to ₹15,000',
          ],
          provider: 'TravelSecure Insurance',
          policyNumber: 'TS123456789',
          renewalDate: '2024-09-15',
          contactSupport: 'support@travelsecure.com',
        });
        Alert.alert('Error', 'Failed to fetch insurance data. Showing dummy data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!insuranceData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load insurance data.</Text>
      </View>
    );
  }

  const handleContactSupport = () => {
    Alert.alert('Contact Support', `Send an email to ${insuranceData.contactSupport}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.insuranceCard}>
        <FontAwesome5 name="shield-alt" size={40} color="#007BFF" />
        <Text style={styles.title}>Travel Insurance Overview</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Insurance Policy:</Text>
          <Text style={styles.infoValue}>{`₹${insuranceData.policy.toLocaleString()}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Insurance Coverage:</Text>
          <Text style={styles.infoValue}>{`₹${insuranceData.coverage.toLocaleString()}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Provider:</Text>
          <Text style={styles.infoValue}>{insuranceData.provider}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Policy Number:</Text>
          <Text style={styles.infoValue}>{insuranceData.policyNumber}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Renewal Date:</Text>
          <Text style={styles.infoValue}>{new Date(insuranceData.renewalDate).toDateString()}</Text>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Coverage Benefits:</Text>
          {insuranceData.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <FontAwesome5 name="check-circle" size={16} color="#28A745" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  errorText: {
    fontSize: 18,
    color: '#DC3545',
    textAlign: 'center',
    marginTop: 20,
  },
  insuranceCard: {
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 18,
    color: '#555',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  benefitsContainer: {
    marginTop: 20,
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default TravelInsuranceScreen;
