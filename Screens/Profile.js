import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const ProfilePage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useFocusEffect(() => {
    // Animate the cards when the screen comes into focus
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Clean up function
    return () => {
      // Reset animation values when the screen loses focus
      fadeAnim.setValue(0);
      slideAnim.setValue(-50);
    };
  });

  const user = {
    name: 'Sharyar',
    email: 'sharyar@gmail.com',
    registrationDate: 'March 7, 2024', // Replace with relevant date
    rewards: 150, // Replace with actual rewards count
    collectionWeight: 250, // Replace with actual collection weight
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: 'https://www.thewrap.com/wp-content/uploads/2018/08/doug-judy-craig-robinson.jpg' }}
        style={styles.avatar}
      />
      {/* Name */}
      <Text style={styles.name}>{user.name}</Text>

      {/* Email */}
      <Text style={styles.email}>{user.email}</Text>

      {/* Date */}
      <Text style={styles.date}>Joined on {user.registrationDate}</Text>

      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Rewards</Text>
        <Animated.Text
          style={[styles.cardContent, { transform: [{ translateX: slideAnim }] }]}
        >
          {user.rewards} points
        </Animated.Text>
      </Animated.View>

      {/* Animated Collection Weight Card */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Collection Weight</Text>
        <Animated.Text
          style={[styles.cardContent, { transform: [{ translateX: slideAnim }] }]}
        >
          {user.collectionWeight} kg
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProfilePage;
