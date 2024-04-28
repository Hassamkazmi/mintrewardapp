import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  DrawerLayoutAndroid 
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import NewCard from "../Components/ChartComponent";
import CalenderDate from "../Components/Calender";
import TabBar from "../Components/TopTabs";
import { useNavigation } from "@react-navigation/native";
import DrawerData from "./DrawerData";

const handleLogin = () => {
  navigation.navigate("Login");
};

const handleSettingsPress = () => {

};
const Header_Max_Height = 400;
const Header_Min_Height = 360;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({ value, drawerRef }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    drawerRef.current.closeDrawer();
  };

  
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ["#fff", "#fff"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}
    >
      <SafeAreaView
        style={{ backgroundColor: "#fff", width: "100%", marginBottom: -10 }}
      >
        <StatusBar translucent={false} backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity
            style={{ paddingHorizontal: 15 }}
            onPress={openDrawer}
          >
            <Icon2 name="bars" size={40} color="#000" />
          </TouchableOpacity>
          <View style={{marginTop:-5}}>
          <Text style={styles.logotext}>MintRewards</Text>
          <Text style={styles.logoslogen}>Don't trash it,MINT it!</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{ paddingHorizontal: 15 }}
          >
            <Image
              source={require("../assets/male.png")}
              style={{ width: 40, height: 50, borderRadius: 15, marginTop:-2 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TabBar />
          <Text style={styles.sectionTitle}>
            <NewCard />
          </Text>
          {/* <View >
            <Text style={styles.bestbrand}>BEST BRANDS</Text>
          </View> */}
          <CalenderDate />
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const ScrollViewScreen = () => {
  const [data, setData] = useState(
    [
      
      
      
      {
        "ID": 97,
        "Name": "Al KARAM",
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "color":"#81c5d4",
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },
    
      {
        "ID": 13,
        "Name": "Food Panda",
        "Description": "Foodpanda is a simple service to order food from a variety of restaurants online.",
        "Location": "Berlin",
        "PhoneNumber": "021-432212122",
        "Url": "https://www.foodpanda.pk/?utm_source=google&utm_medium=cpc&utm_campaign=17130031807&sem_tracker=17130031807&gad_source=1&gclid=CjwKCAiAlcyuBhBnEiwAOGZ2SzJJueH7h8XjlhDDcmRYuMYUMs_1DUawEcUbT78VydNZ3HOhtTNoLRoCcuwQAvD_BwE",
        "CreatedAt": "2024-02-19T21:56:52.977",
        "UpdatedAt": "2024-02-19T21:56:52.977",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "color":"#E11B70",
        "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Foodpanda_logo_since_2017.jpeg"
      },
      {
        "ID": 35,
        "Name": "Coffee Wagera",
        "Description": "We are Unilever.\r\nWe are 127,000 people across the world.",
        "Location": "London United Kingdom",
        "PhoneNumber": "0000140",
        "Url": "https://www.unilever.pk/",
        "CreatedAt": "2024-02-19T22:00:56.547",
        "UpdatedAt": "2024-02-19T22:00:56.547",
        "CreatedBy": null,
        "color":"#da9ee6",
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://coffeewagera.com/wp-content/uploads/2021/09/CW-Logo-Brown-2.png"
      },
      
      {
        "ID": 5,
        "Name": "UNILEVER PAKISTAN LIMITED",
        "Description": "We are Unilever.\r\nWe are 127,000 people across the world.",
        "Location": "London United Kingdom",
        "PhoneNumber": "0000140",
        "Url": "https://www.unilever.pk/",
        "CreatedAt": "2024-02-19T22:00:56.547",
        "UpdatedAt": "2024-02-19T22:00:56.547",
        "CreatedBy": null,
        "color":"#8f92db",
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://media.licdn.com/dms/image/C4E12AQFjVRGvzXfQ7w/article-cover_image-shrink_600_2000/0/1595858364695?e=2147483647&v=beta&t=M1cz81QOyrkr1ZhC_bz3M3ARiBx-F12kXbZLl4fWJQU"
      },
      
      {
        "ID": 4,
        "Name": "Food Panda",
        "Description": "Foodpanda is a simple service to order food from a variety of restaurants online.",
        "Location": "Berlin",
        "PhoneNumber": "021-432212122",
        "Url": "https://www.foodpanda.pk/?utm_source=google&utm_medium=cpc&utm_campaign=17130031807&sem_tracker=17130031807&gad_source=1&gclid=CjwKCAiAlcyuBhBnEiwAOGZ2SzJJueH7h8XjlhDDcmRYuMYUMs_1DUawEcUbT78VydNZ3HOhtTNoLRoCcuwQAvD_BwE",
        "CreatedAt": "2024-02-19T21:56:52.977",
        "UpdatedAt": "2024-02-19T21:56:52.977",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "color":"#E11B70",
        "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Foodpanda_logo_since_2017.jpeg"
      },
      {
        "ID": 7,
        "Name": "Al KARAM",
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "color":"#81c5d4",
  
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },{
        "ID": 32,
        "Name": "Al KARAM",
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "color":"#81c5d4",
  
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },{
        "ID": 71,
        "Name": "Al KARAM",
        "color":"#81c5d4",
  
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },
      {
        "ID": 44,
        "Name": "Food Panda",
        "Description": "Foodpanda is a simple service to order food from a variety of restaurants online.",
        "Location": "Berlin",
        "PhoneNumber": "021-432212122",
        "Url": "https://www.foodpanda.pk/?utm_source=google&utm_medium=cpc&utm_campaign=17130031807&sem_tracker=17130031807&gad_source=1&gclid=CjwKCAiAlcyuBhBnEiwAOGZ2SzJJueH7h8XjlhDDcmRYuMYUMs_1DUawEcUbT78VydNZ3HOhtTNoLRoCcuwQAvD_BwE",
        "CreatedAt": "2024-02-19T21:56:52.977",
        "UpdatedAt": "2024-02-19T21:56:52.977",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "color":"#E11B70",
        "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Foodpanda_logo_since_2017.jpeg"
      },
      {
        "ID": 17,
        "Name": "Al KARAM",
        "color":"#81c5d4",
  
  
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },{
        "ID": 37,
        "color":"#81c5d4",
  
        "Name": "Al KARAM",
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },{
        "ID": 73,
        "color":"#81c5d4",
  
        "Name": "Al KARAM",
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },{
        "ID": 24,
        "Name": "Al KARAM",
        "color":"#81c5d4",
  
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      },{
        "ID": 22,
        "color":"#81c5d4",
  
        "Name": "Al KARAM",
        "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
        "Location": "karachi",
        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
      }
    ]);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef(null);
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    navigation.navigate("Detail", { item }); // Navigate to the detail screen and pass the item data
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* Your drawer content goes here */}
          <TouchableOpacity onPress={handleSettingsPress}>
            <DrawerData />
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <DynamicHeader value={scrollOffsetY} drawerRef={drawerRef} />

        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            {
              useNativeDriver: false,
            }
          )}
        >
          {data.map((val) => {
            return (
              <TouchableOpacity key={val.ID} onPress={() => handleCardPress(val)}>
                <View style={[styles.card, { backgroundColor: val.color }]}>
                  <View style={styles.cardleft}>
                    <Image
                      style={styles.imagesmall}
                      source={{ uri: val.ImageUrl }}
                    />
                    <Text style={styles.subtitle}>{val.Name}</Text>
                    <Text style={styles.subtitle1}>-{val.ID}:00</Text>
                  </View>
                  <Image style={styles.image} source={{ uri: val.ImageUrl }} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default ScrollViewScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  banner: {
    height: 100,
    objectFit: "cover",
    width: "100%",
  },

  bestbrand: {
    paddingLeft: 22,
    fontSize: 22,
    paddingTop: 6,
    color: "#3b3b3b",
    fontWeight: "200",

    marginTop: 5,
  },
  title: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  cardleft: {
    paddingLeft: 30,
  },
  card: {
    height: 130,
    backgroundColor: "#E6DDC4",
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 0,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "400",
  },
  subtitle1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 20,
    paddingLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: "fill",
  },
  imagesmall: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 10,
    objectFit: "fill",
    marginTop: -20,
  },
  username: {
    fontSize: 20,
    marginLeft: 25,
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    textShadowColor: "rgba(209, 207, 207, 0.3)", // Shadow color
    textShadowOffset: { width: 3, height: 3 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
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

  sectionTitle: {
    marginHorizontal: 24,
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    paddingTop: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  logoslogen:{
    textAlign:"center",
    color:"#004223",
    fontWeight:"700",


  },
  logotext:{
    textAlign:"center",
    fontWeight:"700",
    fontSize:18,
    color:"#004223"

  }
});
