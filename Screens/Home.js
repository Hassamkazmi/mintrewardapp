import React , {useState , useEffect, useRef} from "react";
import Calender from "../Components/Calender"
import {
  SafeAreaView,
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native"; // Import the hook for navigation
import ChartCollection from "../Components/ChartCollection";
import Brands from "./Brands";
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
const { width } = Dimensions.get("screen");
const HomeScreen = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  const UserReward = {
    id: "1",
    name: "Reward",
    location: "2372",
    image: require("../assets/images/cover2.jpeg"),
  };

  const UserCollection = {
    id: "2",
    name: "Total Collection",
    location: "26 KG",
    image: require("../assets/images/cover2.jpeg"),
  };

  const navigation = useNavigation();


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



  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const Card = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", UserReward)}
      >
        <View style={style.cardImage}>
          <View style={style.searchinput}>
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#000",
                padding: 5,
                width: 100,
                marginLeft: 20,
              }}
            >
              {UserReward.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 44,
                fontSize: 24,
                fontWeight: "700",
                color: "#000",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {UserReward.location}
            </Text>
          </View>
          <ImageBackground
            style={{
              height: 100,
              marginTop: -2,
            }}
            source={require("../assets/reward.png")}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const CardNew = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("DetailsScreen", UserReward)}
      >
        <View style={style.cardImageNew}>
          <View style={style.searchinput}>
            <Text
              style={{
                textAlign: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#000",
                padding: 5,
                width: 100,
                marginLeft: 20,
              }}
            >
              {UserCollection.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 40,
                fontSize: 24,
                fontWeight: "700",
                color: "#000",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {UserCollection.location}
            </Text>
          </View>
          <ImageBackground
            style={{
              height: 60,
              marginTop: 10,
            }}
            source={require("../assets/coll.jpg")}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleSettingsPress = () => {
    navigation.navigate('account'); // Navigate to the settings screen
  };



 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor="#004223" />
       <View style={style.header}>
      <TouchableOpacity onPress={handleSettingsPress}>
        <Icon name="account-circle" size={45} color="#fff" />
      </TouchableOpacity>
        <Text style={style.logo}>MintReward</Text>
        <TouchableOpacity onPress={handleLogin}>
        <Icon name="exit-to-app" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#004223",
            height: 120,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={style.headerTitle}>Don't trash it</Text>
            <Text style={style.headerTitle}>MINT it!</Text>
            <View style={style.inputContainer}>
              {/* <Icon name="search" size={28} /> */}
              <TextInput
                placeholder="Search place"
                style={{ color: COLORS.grey }}
              />
            </View>
          </View>
        </View>
        <Text style={style.sectionTitle}>Rewards</Text>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={{ flexDirection: "row", paddingLeft: 15 }}>
            <Card />
            <CardNew />
          </View>
          <Text style={style.collectiontext}>Next Collection Date</Text>

          <Calender />
          <ChartCollection />
          <Brands />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#004223",
  },
  collectiondate: {
    backgroundColor: "#fff",
    height: 80,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
  },
  collectiontext: {
    fontSize: 20,
    color: "#000",
    paddingTop: 10,
    fontWeight: "700",
    textAlign:"center"
  },
  collectiontext1: {
    fontSize: 16,
    color: "#000",
    padding: 5,
    fontWeight: "700",
  },
  skipbutton: {
    backgroundColor: "#004223",
    color: "#fff",
    padding: 6,
    width: 80,
    textAlign: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  collectionflex: {
    flexDirection: "row",
  },
  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 23,
  },
  searchinput: {
    flexDirection: "row",
    shadowColor: "#000",
    color: "#000",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  Logout: {
    backgroundColor: "#fff",
    fontSize: 16,
    padding: 4,
    borderRadius: 10,
  },
  inputContainer: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 90,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 24,
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,

    paddingTop: 20,
  },
  cardImage: {
    height: 180,
    width: 170,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 100,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#004223",
  },
  cardImageNew: {
    height: 180,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#004223",
    width: 170,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
});
export default HomeScreen;
