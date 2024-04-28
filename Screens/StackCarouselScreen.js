/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CardContainer from '../Components/CardContainer';

const StackCarouselScreen = () => {
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <CardContainer maxVisibleItems={3} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default StackCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});