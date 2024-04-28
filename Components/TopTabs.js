import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('Loyalty Cards');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Loyalty Cards' && styles.activeTab]}
        onPress={() => handleTabPress('Loyalty Cards')}
      >
        <Text style={[styles.tabText, activeTab === 'Loyalty Cards' && styles.activeTabText]}>Loyalty Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Coupons' && styles.activeTab]}
        onPress={() => handleTabPress('Coupons')}
      >
        <Text style={[styles.tabText, activeTab === 'Coupons' && styles.activeTabText]}>Coupons {'\u{1F4B0}'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    // Remove underline
    borderBottomWidth: 0,
    
  },
  tabText: {
    fontSize: 16,
    color: '#343638',
    fontWeight: "500",
 
  },
  activeTabText: {
    fontSize: 16,
    fontWeight:"300"
  },
});

export default TabBar;
