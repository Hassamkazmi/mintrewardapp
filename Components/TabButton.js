import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Brands from '../Screens/Brands';
import Profile from '../Screens/Profile';
import Setting from '../Screens/Setting';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const BottomTabNavigator = createBottomTabNavigator();

export default function BottomTab() {
  //   const tabBarHeight = useBottomTabBarHeight();
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#0071ff',
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigator.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              color={focused ? '#fff' : "black"}
              style={focused ? styles.middleIcon : styles.label}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="bars"
              size={30}
              color={focused ? '#fff' : "black"}
              style={focused ? styles.middleIcon : styles.label}

            />
          ),
        }}
        name="Brands"
        component={Brands}
      />
      <BottomTabNavigator.Screen
        name="Location"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="location"
              size={30}
              color={focused ? '#fff' : "black"}
              style={focused ? styles.middleIcon : styles.label}

            />
          ),
        }}
      />
      
      <BottomTabNavigator.Screen
        name="account"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={30}
              color={focused ? '#fff' : "black"}
              style={focused ? styles.middleIcon : styles.label}

            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '100%',
    borderRadius: 2,
    bottom: 0,
    backgroundColor: '#004223',
    height: 80,
    color:"#fff",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 16,
    color:"#fff",
  },
  middleIcon: {
    bottom: 18,
    margin:10,
    padding:19,
    color:"#000",
    width: 60,
    height: 60,
    fontSize:22,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 8,
  }
});

