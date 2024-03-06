import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PointColletion = () => {
  return (
    <View style={style.cardCollectionImage}>
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
              textAlign:"center",
              alignContent:"center",
              alignItems:"center",
              
            }}
          >
            40kg
          </Text>
          <Text  style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "bold",
              textAlign:"center",
              alignContent:"center",
              alignItems:"center",
              
            }}>
            Waste Collected
          </Text>
         
          </View>
  )
}

const style = StyleSheet.create({
    

  cardCollectionImage: {
    height: 120,
    width: 170,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor:"#0e5204"
  },
})

export default PointColletion