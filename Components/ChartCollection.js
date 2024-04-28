import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChartComponent = () => {
  return (
    <View style={style.header}>
      <Text style={style.sectionTitle}>Exclusive  Rewards</Text>

      <View style={style.outercircle}>
        <View style={style.innercircle}>
          <Text style={style.text}>12511</Text>
          <Text style={style.subText}>RS 12511</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  outercircle: {
    borderWidth: 15,
    borderColor: "#000",
    borderRadius: 130, // Numeric value, not string
    width: "60%",
    height: 230,
    borderColor: "#c9ed66",
    marginBottom: 20,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  innercircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    borderRadius: 9999, // Numeric value, not string
    borderWidth: 15,
    borderColor: "#63f272"
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  subText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 20,
    color: "#000"
  },
  header: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: "#efefef",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
  },
});

export default ChartComponent;
