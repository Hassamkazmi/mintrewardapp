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
        "ID": 4,
        "Name": "Food Panda",
        "color":"#ebc5dd",

        "Description": "Our journey with Foodpanda began in 2012 with a bold vision: to transform the way people order food. Starting in Berlin, we quickly expanded globally, bringing our convenient food delivery service to hungry customers around the world. Despite challenges, like fierce competition and logistical hurdles, our passion for great food and outstanding service never wavered. Today, Foodpanda isn't just a platform—it's a community of food lovers, restaurant partners, and dedicated team members. As we look to the future, we're excited to continue serving up delicious meals to hungry customers worldwide, one order at a time.",
        "Location": "Berlin",
        "PhoneNumber": "021-432212122",
        "Url": "https://www.foodpanda.pk/?utm_source=google&utm_medium=cpc&utm_campaign=17130031807&sem_tracker=17130031807&gad_source=1&gclid=CjwKCAiAlcyuBhBnEiwAOGZ2SzJJueH7h8XjlhDDcmRYuMYUMs_1DUawEcUbT78VydNZ3HOhtTNoLRoCcuwQAvD_BwE",
        "CreatedAt": "2024-02-19T21:56:52.977",
        "UpdatedAt": "2024-02-19T21:56:52.977",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available",
        "ProductUrl": "https://images.deliveryhero.io/image/foodpanda/homepage/refresh-hero-home-th.png",
        "Logo": "https://i.pinimg.com/564x/9a/0b/0d/9a0b0d56eaaab0ee22ee907d703d07a2.jpg"
      },
      
      {
        "ID": 6,
        "Name": "KHAADI",
        "color":"#f2ac99",

        "Description": "Our story began in 1998, with a humble boutique in Karachi, Pakistan. Founded by Shamoon Sultan, Khaadi was born out of a passion for our country's rich textile heritage. From the start, we aimed to celebrate Pakistan's diverse culture through our designs, blending traditional craftsmanship with contemporary aesthetics. As we grew, so did our commitment to quality and authenticity. We worked closely with local artisans and weavers, preserving age-old techniques and supporting communities across Pakistan. Each Khaadi creation tells a story of craftsmanship and dedication, reflecting the vibrancy of our nation. Over the years, our brand has blossomed into a global phenomenon, capturing the hearts of fashion enthusiasts around the world. From pret wear to home textiles, our products embody the essence of Khaadi—timeless elegance with a modern twist. Despite the challenges of the fashion industry, we've remained true to our roots, embracing innovation while staying connected to our heritage. Our journey is a testament to the power of creativity, community, and resilience. Today, Khaadi is more than just a fashion brand—it's a symbol of Pakistani pride, cherished by millions worldwide. As we continue to evolve and expand, our commitment to quality, craftsmanship, and sustainability remains unwavering. Join us as we celebrate the colors, patterns, and stories of Khaadi, weaving dreams into reality, one thread at a time.",
        "Location": "karachi",
        "PhoneNumber": "080074007",
        "Url": "https://pk.khaadi.com/",
        "CreatedAt": "2024-02-25T21:31:00.99",
        "UpdatedAt": "2024-02-25T21:31:00.99",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ProductUrl": "https://fragrances.khaadi.com/images/khaadi-fragrances-adaptation-logo.png",
        "Logo": "https://upload.wikimedia.org/wikipedia/commons/0/0f/KhaadiLogo-22.png"
      },
      {
        "ID": 7,
        "Name": "Al KARAM",
        "Description": "Alkaram Studio, established in 1986, has evolved from a textile manufacturer into one of Pakistan's leading fashion brands. Known for its vibrant colors, intricate designs, and high-quality fabrics, Alkaram offers a diverse range of clothing and home textile products. From traditional embroidered lawn suits to modern ready-to-wear ensembles, Alkaram caters to men, women, and children, ensuring there's something for everyone. In addition to apparel, Alkaram is renowned for its home textile collections, including bedding, curtains, and towels, all reflecting the brand's commitment to quality and style. With a network of retail outlets across Pakistan and a growing international presence, Alkaram continues to push the boundaries of Pakistani fashion while staying true to its ethos of craftsmanship and elegance.",
        "Location": "karachi",
        "color":"#f5c9ce",

        "PhoneNumber": "+922137130271",
        "Url": "https://www.alkaramstudio.com/",
        "CreatedAt": "2024-02-25T21:36:52.677",
        "UpdatedAt": "2024-02-25T21:36:52.677",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available",
        "ProductUrl": "https://www.alkaramstudio.com/cdn/shop/files/carousal-image_11.jpg?v=1713788302",
        "Logo": "https://mir-s3-cdn-cf.behance.net/projects/404/8c55f0196699999.Y3JvcCwxMzgwLDEwODAsMjc2LDA.jpg"
      },
      {
        "ID": 8,
        "Name": "Costa Coffee",
        "Description": "Costa Coffee, founded in London in 1971, is a globally renowned coffeehouse chain known for its high-quality coffee, warm atmosphere, and commitment to sustainability. With thousands of stores across more than 30 countries, Costa Coffee offers a wide range of espresso-based drinks, specialty beverages, and delicious food options. The brand's dedication to crafting the perfect cup of coffee, coupled with its inviting cafes and focus on sustainability, has made it a favorite destination for coffee lovers worldwide.",
        "Location": "Level 5, Emirates Holidays Building P.O.Box 122199,\r\nSheikh Zayed Road, Dubai, UAE",
        "PhoneNumber": "",
        "color":"#9c9998",

        "Url": "https://www.costacoffee.ae/",
        "CreatedAt": "2024-04-25T04:44:14.737",
        "UpdatedAt": "2024-04-25T04:44:14.737",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ProductUrl": "https://www.shutterstock.com/image-photo/poznan-poland-january-29-2016-600nw-377511499.jpg",
        "Logo": "https://seeklogo.com/images/C/costa-coffee-logo-7C00958BFF-seeklogo.com.png"
      },
      {
        "ID": 9,
        "Name": "Dunkin Donots",
        "Description": "Dunkin Donuts, established in 1950 in Quincy, Massachusetts, is a beacon of delightful indulgence and warm hospitality. With its origins in freshly brewed coffee and handcrafted doughnuts, Dunkin' Donuts has blossomed into a global phenomenon, captivating taste buds and hearts alike. Beyond its iconic offerings, Dunkin' Donuts has curated a diverse menu catering to a myriad of cravings, from delectable baked goods to hearty breakfast sandwiches and refreshing beverages. Each item is crafted with care to provide a moment of joy in every bite and sip. What truly sets Dunkin' Donuts apart is its unwavering commitment to customer satisfaction and convenience, making it a cherished gathering spot where friendships are forged and memories are made. As Dunkin' Donuts continues to evolve and innovate, its iconic logo remains a beacon of comfort and familiarity, sweetening life's moments, one doughnut at a time.",
        "Location": "Karachi",
        "color":"#cdcfb2",

        "PhoneNumber": "",
        "Url": "https://www.dunkindonuts.pk/",
        "CreatedAt": "2024-04-25T04:59:28.86",
        "UpdatedAt": "2024-04-25T04:59:28.86",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ProductUrl": "https://tb-static.uber.com/prod/image-proc/processed_images/df2de7977509b3697cd12d679c8571c2/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
        "Logo": "https://lh6.googleusercontent.com/e4S_9ZLu6AfTLXmCu3m5U0oBVClPIBR1oFnd8cEV_kyZTWGxEVJndyrhhEzHL4MkAunYRQeeTz1HA8EvCoi4iqMyV7yRE_1kOiqyPxImjzaCVjNUElUHTLxMDT8K13fud2AsaHbM"
      },
      {
        "ID": 10,
        "Name": "Carrefour",
        "Description": "Carrefour is a multinational retail corporation headquartered in France and one of the largest hypermarket chains in the world. Founded in 1958, Carrefour operates a variety of store formats, including hypermarkets, supermarkets, convenience stores, and cash-and-carry outlets. With a presence in over 30 countries and territories, Carrefour serves millions of customers daily, offering a wide range of products including groceries, electronics, household items, clothing, and more. The company is committed to providing quality products at competitive prices while also promoting sustainability and responsible business practices. Carrefours mission is to be the preferred retailer wherever it operates, providing customers with a unique shopping experience that meets their needs and exceeds their expectations.",
        "Location": "France",
        "PhoneNumber": "",
        "color":"#b9baed",

        "Url": "https://www.carrefour.pk/mafpak/en/",
        "CreatedAt": "2024-04-25T05:10:00.707",
        "UpdatedAt": "2024-04-25T05:10:00.707",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ProductUrl": "https://cdnprod.mafretailproxy.com/assets/images/App_EN_2f5e2d301d.jpg",
        "Logo": "https://e7.pngegg.com/pngimages/785/205/png-clipart-potloodslijper-2-gaten-carrefour-taille-crayons-en-metal-2-trous-logo-brand-line-line-text-logo.png"
      },
      {
        "ID": 10,
        "Name": "Dunkin Donots",
        "Description": "Dunkin Donuts, established in 1950 in Quincy, Massachusetts, is a beacon of delightful indulgence and warm hospitality. With its origins in freshly brewed coffee and handcrafted doughnuts, Dunkin' Donuts has blossomed into a global phenomenon, captivating taste buds and hearts alike. Beyond its iconic offerings, Dunkin' Donuts has curated a diverse menu catering to a myriad of cravings, from delectable baked goods to hearty breakfast sandwiches and refreshing beverages. Each item is crafted with care to provide a moment of joy in every bite and sip. What truly sets Dunkin' Donuts apart is its unwavering commitment to customer satisfaction and convenience, making it a cherished gathering spot where friendships are forged and memories are made. As Dunkin' Donuts continues to evolve and innovate, its iconic logo remains a beacon of comfort and familiarity, sweetening life's moments, one doughnut at a time.",
        "Location": "Karachi",
        "color":"#cab4de",

        "PhoneNumber": "",
        "Url": "https://www.dunkindonuts.pk/",
        "CreatedAt": "2024-04-25T04:59:28.86",
        "UpdatedAt": "2024-04-25T04:59:28.86",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available soon",
        "ProductUrl": "https://e7.pngegg.com/pngimages/484/980/png-clipart-dunkin-donuts-coffee-and-doughnuts-cream-national-doughnut-day-donuts-miscellaneous-baked-goods-thumbnail.png",
        "Logo": "https://lh6.googleusercontent.com/e4S_9ZLu6AfTLXmCu3m5U0oBVClPIBR1oFnd8cEV_kyZTWGxEVJndyrhhEzHL4MkAunYRQeeTz1HA8EvCoi4iqMyV7yRE_1kOiqyPxImjzaCVjNUElUHTLxMDT8K13fud2AsaHbM"
      },
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
                      source={{ uri: val.Logo }}
                    />
                    <Text style={styles.subtitle}>{val.Name}</Text>
                    <Text style={styles.subtitle1}>-{val.ID}:00</Text>
                  </View>
                  <Image style={styles.image} source={{ uri: val.ProductUrl }} />
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
