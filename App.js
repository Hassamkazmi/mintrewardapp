import { View, Text } from 'react-native'
import React from 'react'
import TabButton from "./Components/TabButton"
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './Screens/SplashScreen';
import AuthScreen from './Screens/AuthScreen';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={AuthScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={TabButton} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App