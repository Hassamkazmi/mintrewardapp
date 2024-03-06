import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const RewardScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.phoneFrame}>
        <View style={styles.main}>
          <View style={styles.headerActions}>
      
          </View>
          <View style={styles.userHeader}>
            <Image
              source={{ uri: 'https://www.thewrap.com/wp-content/uploads/2018/08/doug-judy-craig-robinson.jpg' }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              {/* Name */}
              <Text style={styles.name}>Sharyar</Text>
              {/* Grid */}
              
            </View>
          </View>
          {/* Tabs */}
          <View style={styles.tabs}>
            <Text style={styles.tab}>Actions</Text>
            <Text style={styles.tab}>Details</Text>
            <Text style={styles.tab}>Stats</Text>
          </View>
          {/* Sections */}
          <View style={styles.section}>
            {/* Edit Profile */}
            <View style={styles.sectionItem}>
              <Text>Edit Profile</Text>
            </View>
            {/* Send Login Details */}
            <View style={styles.sectionItem}>
              <Text>Send Login Details via Email</Text>
              <Text>Send Login Details via Magic Link</Text>
            </View>
            {/* Points and Achievements */}
            <View style={styles.sectionItem}>
              <Text>Give Points</Text>
              <Text>Award Achievements</Text>
            </View>
            {/* Other */}
            <View style={styles.sectionItem}>
              <Text>Deactivate Profile</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneFrame: {
    height: "100%",
    width: "100%",
  },
  main: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 20,
    padding: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    marginTop: 10,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
  },
  gridItemText: {
    fontWeight: 'bold',
  },
  gridItemSubtext: {
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 20,
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 20,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default RewardScreen;
