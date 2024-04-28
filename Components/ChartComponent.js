import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/AntDesign";

const windowWidth = Dimensions.get("window").width;

export default function Categories({ categoryList }) {
  const Data = [
    {
      id: 1,
      name: "Most Favourite",
      point: "35 Coupons",
      image: "https://www.mymintrewards.com/img/reg-img.png",
      iconname:"hearto"
    },
    {
      id: 2,
      name: "Total Collection",
      point: "25 KG",
      iconname:"clockcircleo",
      image:
        "https://res.cloudinary.com/dmxjqstkz/image/upload/v1712916942/WhatsApp_Image_2024-03-16_at_15.54.35_779d1a5f_jca7og.jpg",
    },
    {
      id: 11,
      name: "Reward",
      point: "3562",
      iconname:"linechart",
      image: "https://www.mymintrewards.com/img/reg-img.png",
    },
    {
      id: 21,
      name: "Newest",
      point: "31 Places",
      iconname:"playcircleo",
      image:
        "https://res.cloudinary.com/dmxjqstkz/image/upload/v1712916942/WhatsApp_Image_2024-03-16_at_15.54.35_779d1a5f_jca7og.jpg",
    },
  ];

  const navigation = useNavigation();

  // Define gradient colors
  const gradientColors = ["#2897a8", "#DEA135", "#FF6347", "#ba299b"];

  const renderItem = ({ item, index }) => {
    // Get gradient color based on index
    const gradientColor = gradientColors[index % gradientColors.length];

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("item-list", { category: item.name })
        }
        style={[styles.itemContainer, { backgroundColor: gradientColor }]}
      >
        {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.point}>{item.point}</Text>
        {/* <Image
          source={require("../assets/icons/like-outline.png")}
          style={[
            styles.iconcss,
            { position: "absolute", bottom: 20, right: 20 },
          ]}
        /> */}
                <Icon name={item.iconname} size={40} color="#fff" style={[
            styles.iconcss,
            { position: "absolute", bottom: 20, right: 20 },
          ]} />

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <Carousel
        data={Data}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.38} // Adjusted to 50% of window width
        layout="default"
        contentContainerCustomStyle={{ paddingLeft: 15 }} // Align items to the left
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontWeight: "300",
    fontSize: 21,
    paddingLeft: 15,
    paddingVertical: 12,
  },
  itemContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 8,
    borderWidth: 0,
    borderColor: "#fff",
    marginVertical: 5,
    height: 180, // Fixed height for all cards
    borderRadius: 25,
    backgroundColor: "#90EE90",
  },
  image: {
    width: 45,
    height: 45,
  },
  name: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "600",
    color: "#fff",
    padding: 5,
  },
  point: {
    fontSize: 14,
    marginTop: 5,
    color: "#fff",
    fontWeight: "600",
    padding: 5,
  },
  iconcss: {
    width: 40,
    height: 40,
    color: "#fff",
    
  },
});
