import { StyleSheet, Text, View ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function DrawerData() {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
      };

  return (
    <View style={styles.header}>
       <View style={styles.containerfull}>
       <Image
              source={require("../assets/splash.png")}
              style={styles.imagelogo}
            />
       </View>
            <View>
            <Text style={styles.text}>Sharyar</Text>
            </View>

            <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToScreen('home')}>
        <Text style={styles.item}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Brands')}>
        <Text style={styles.item}>Brand</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('settings')}>
        <Text style={styles.item}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Login')}>
        <Text style={styles.item}>Logout</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        
        backgroundColor: "#004223",
      },
      containerfull:{

        flexDirection: "row",
        justifyContent: "center",
      },
      imagelogo:{
        width:100,
        height:100,
        paddingHorizontal:10,
        margin:10, objectFit:"fill",

      },
      text:{
        textAlign:"center",
        fontWeight:"800",
        fontSize:22,
        color:"#fff"
      },

      container: {
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
        paddingHorizontal: 20,
      },
      item: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color:"#000"
      },
})