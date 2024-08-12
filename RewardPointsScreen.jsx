import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const RewardPointsScreen = () => {
  const [rewardPoints, setRewardPoints] = useState(100);
  const [pointsRedeemed, setPointsRedeemed] = useState(50);
  const [pointsAvailable, setPointsAvailable] = useState(50);
  const [offers, setOffers] = useState([
    { id: '1', title: '10% off on next purchase', pointsRequired: 20 },
    { id: '2', title: 'Free shipping on orders over ₹500', pointsRequired: 30 },
    { id: '3', title: '₹100 cashback on your next order', pointsRequired: 50 },
  ]);

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await fetch('https://example.com/api/reward-points');
        if (response.ok) {
          const data = await response.json();
          setRewardPoints(data.rewardPoints);
          setPointsRedeemed(data.pointsRedeemed);
          setPointsAvailable(data.rewardPoints - data.pointsRedeemed);
          setOffers(data.offers);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        // Dummy data for fallback
        setRewardPoints(100);
        setPointsRedeemed(50);
        setPointsAvailable(50);
        setOffers([
          { id: '1', title: '10% off on next purchase', pointsRequired: 20 },
          { id: '2', title: 'Free shipping on orders over ₹500', pointsRequired: 30 },
          { id: '3', title: '₹100 cashback on your next order', pointsRequired: 50 },
        ]);
        Alert.alert('Error', 'Failed to fetch reward points data. Showing dummy data.');
      }
    };

    fetchRewardData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reward Points Overview</Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <FontAwesome5 name="star" size={24} color="#FFD700" />
          <Text style={styles.infoLabel}>Total Points</Text>
          <Text style={styles.infoValue}>{rewardPoints}</Text>
        </View>

        <View style={styles.infoCard}>
          <FontAwesome5 name="star-half-alt" size={24} color="#FFBF00" />
          <Text style={styles.infoLabel}>Points Redeemed</Text>
          <Text style={styles.infoValue}>{pointsRedeemed}</Text>
        </View>

        <View style={styles.infoCard}>
          <FontAwesome5 name="star" size={24} color="#FF6347" />
          <Text style={styles.infoLabel}>Points Available</Text>
          <Text style={styles.infoValue}>{pointsAvailable}</Text>
        </View>
      </View>

      <Text style={styles.offersTitle}>Redeem Offers</Text>
      <FlatList
        data={offers}
        renderItem={({ item }) => (
          <View style={styles.offerCard}>
            <FontAwesome5 name="gift" size={20} color="#FF4500" />
            <View style={styles.offerDetails}>
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerPoints}>Requires {item.pointsRequired} points</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.redeemButton} onPress={() => console.log('Redeem Points')}>
        <Text style={styles.redeemButtonText}>Redeem Points</Text>
      </TouchableOpacity>
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
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  offersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  offerCard: {
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
  offerDetails: {
    marginLeft: 10,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  offerPoints: {
    fontSize: 14,
    color: '#888',
  },
  redeemButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  redeemButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RewardPointsScreen;
