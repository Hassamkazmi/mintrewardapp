import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const HistoryPage = () => {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
      <Card title="History of Redemption" color="#FFC107" />
      <Card title="Recyclable Waste Collected" color="#4CAF50" />
      <Card title="Mint Rewards Points" color="#2196F3" />
      <SpecialOffersCard />
      <Card title="Next Collection Date" color="#FF9800" />
      <Card title="History of Collection" color="#9C27B0" />
      <Card title="Redeem" color="#FF5722" />
      <Card title="Bonus Promotion" color="#795548" />
    </Animated.ScrollView>
  );
};

const Card = ({ title, color, children }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
};

const SpecialOffersCard = () => {
  return (
    <View style={[styles.card, { backgroundColor: '#E91E63' }]}>
    <Text style={styles.cardTitle}>Special Offers</Text>
    <TouchableOpacity style={styles.offerButton}>
      <Text style={styles.offerButtonText}>Download Vouchers</Text>
    </TouchableOpacity>
  </View>  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  card: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  specialOffersCard: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#E91E63',
  },
  offerButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  offerButtonText: {
    color: '#E91E63',
    fontWeight: 'bold',
  },
  offerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#E91E63',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HistoryPage;
