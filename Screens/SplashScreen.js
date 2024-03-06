import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect } from "react";
  // import { NativeStackScreenProps } from "@react-navigation/native-stack";
  const { height } = Dimensions.get("window");
  

const WelcomeScreen = ({ navigation }) => {

  const Spacing = 10;
    useEffect(() => {
        // Simulate loading for 3 seconds
        const timer = setTimeout(() => {
          navigation.replace('Login');
        }, 5000);
    
        return () => clearTimeout(timer);
      }, [navigation]);

      const handleLogin = () => {
        // Navigate to the home screen
        navigation.navigate('Login');
      };

    return (
        <SafeAreaView>
          <View>
            <ImageBackground
              style={{
                height: height / 2.5,
              }}
              resizeMode="contain"
              source={require("../assets/splash.png")}
            />
            <View
              style={{
                paddingHorizontal: Spacing * 4,
                paddingTop: Spacing * 4,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#005D1B",
                  fontWeight:700,
                  textAlign: "center",
                }}
              >
                Discover Your Dream Reward here
              </Text>
    
              <Text
                style={{
                  fontSize: 18,
                  color: "#04790C",
                  fontWeight:700,
                  textAlign: "center",
                  marginTop: Spacing * 2,
                }}
              >
Don't trash it,
MINT it!                
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: Spacing * 1,
                paddingTop: Spacing * 6,
                width:"100%",
                alignItems:"center"
              }}
            >
              <TouchableOpacity
                onPress={handleLogin}
                style={{
                  backgroundColor: "#005D1B",
                  paddingVertical: Spacing * 1.5,
                  paddingHorizontal: Spacing * 2,
                  width: "48%",
                  borderRadius: Spacing,
                  shadowColor: "#005D1B",
                  shadowOffset: {
                    width: 0,
                    height: Spacing,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: Spacing,
                }}
              >
                <Text
                  style={{
                    
                    color: "#fff",
                    fontSize: 22,
                    textAlign: "center",
                  }}
                >
                  Let's Go
                </Text>
              </TouchableOpacity>
          
            </View>
          </View>
        </SafeAreaView>
      
  )
}

export default WelcomeScreen