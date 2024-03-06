import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 80;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;


const Brands = () => {

  const [data, setData] = useState(
   [
      {
        "ID": 1,
        "Name": "Brand A",
        "Description": "Description for Brand A",
        "Location": "Location A",
        "PhoneNumber": "123-456-7890",
        "Url": "https://www.brandA.com",
        "CreatedAt": "2024-02-18T06:03:27.857",
        "UpdatedAt": "2024-02-18T06:03:27.857",
        "CreatedBy": 1,
        "UpdatedBy": 1,
        "IsActive": true,
        "Status": "available"
      },
      {
        "ID": 2,
        "Name": "Brand B",
        "Description": "Description for Brand B",
        "Location": "Location B",
        "PhoneNumber": "987-654-3210",
        "Url": "https://www.brandB.com",
        "CreatedAt": "2024-02-18T06:03:27.857",
        "UpdatedAt": "2024-02-18T06:03:27.857",
        "CreatedBy": 2,
        "UpdatedBy": 2,
        "IsActive": true,
        "Status": "available soon"
      },
      {
        "ID": 3,
        "Name": "Brand C",
        "Description": "Description for Brand C",
        "Location": "Location C",
        "PhoneNumber": "555-555-5555",
        "Url": "https://www.brandC.com",
        "CreatedAt": "2024-02-18T06:03:27.857",
        "UpdatedAt": "2024-02-18T06:03:27.857",
        "CreatedBy": 3,
        "UpdatedBy": 3,
        "IsActive": true,
        "Status": "available"
      },
      {
        "ID": 4,
        "Name": "Food Panda",
        "Description": "Foodpanda is a simple service to order food from a variety of restaurants online. Enjoy different cuisines and flavours delivered to your door step.\r\n\r\n\r\nThis is how Foodpanda works:\r\n \r\n\r\n\r\nFind a restaurant\r\nEnter your areas on the home page. Browse from our extensive list of restaurants that deliver to your area. Pick a restaurant you like and browse its menu.\r\n\r\nOrder what you want\r\nBuild up your meal by choosing from any of your favorite restaurants, browse the menu and select the items you will like to order. If options are required, e.g pizza toppings, you will be asked to choose them one you click on an item. Your items will appear on your cart on the right.\r\n\r\nCheckout & Payment\r\nOnce you are happy with your order, click on the \"ORDER NOW\" button and enter your delivery address. Simply follow the checkout instructions from there. We currently only accept cash on delivery.\r\n\r\nDelivery\r\nWe will send you an SMS confirming your order and delivery time. Sit back, relax and wait for piping hot food to be conveniently delivered to you!\r\nFind Your Food Now",
        "Location": "Berlin",
        "PhoneNumber": "021-432212122",
        "Url": "https://www.foodpanda.pk/?utm_source=google&utm_medium=cpc&utm_campaign=17130031807&sem_tracker=17130031807&gad_source=1&gclid=CjwKCAiAlcyuBhBnEiwAOGZ2SzJJueH7h8XjlhDDcmRYuMYUMs_1DUawEcUbT78VydNZ3HOhtTNoLRoCcuwQAvD_BwE",
        "CreatedAt": "2024-02-19T21:56:52.977",
        "UpdatedAt": "2024-02-19T21:56:52.977",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available"
      },
      {
        "ID": 5,
        "Name": "UNILEVER PAKISTAN LIMITED\r\n\r\n",
        "Description": "We are Unilever.\r\nWe are 127,000 people across the world, we are over 400 brand names in 190 countries, we are a global company with a global purpose.\r\n\r\na diverse group of people sitting on blocks\r\nWe are driven by our purpose: to make sustainable living commonplace\r\n\r\nIt’s why we come to work. It’s why we’re in business. It’s how we inspire exceptional performance.\r\n\r\nBack in 1883, Sunlight Soap was launched in the UK by our founder – it was pioneering, it was innovative and it had a purpose: to popularise cleanliness and bring it within reach of ordinary people. That was sustainable living, even then. We now have over 400 brands and we are still driven by purpose.\r\n\r\nWe want to do more good for our planet and our society – not just less harm. We want to act on the social and environmental issues facing the world and we want to enhance people’s lives with our products.\r\n\r\nWe’ve been pioneers, innovators and future-makers for over 120 years – we plan to continue doing that. And we plan to do it sustainably.",
        "Location": "London United Kingdom",
        "PhoneNumber": "0000140",
        "Url": "https://www.unilever.pk/",
        "CreatedAt": "2024-02-19T22:00:56.547",
        "UpdatedAt": "2024-02-19T22:00:56.547",
        "CreatedBy": null,
        "UpdatedBy": null,
        "IsActive": true,
        "Status": "available"
      }
    ],);
  const [isLoading, setIsloading] = useState(false);
  const Yscroll = React.useRef(new Animated.Value(0)).current;

 

  const renderUser = ({ item, index }) => {
    const scale = Yscroll.interpolate({
      inputRange: [
        -1, 0,
        sizeOfItem * index,
        sizeOfItem * (index + 2)
      ],
      outputRange: [1, 1, 1, 0]
    })
    return (
      <Animated.View style={
        [styles.item,
        {
          transform: [{ scale }]
        }
        ]
      }>
        {/* <Image
          style={styles.image}
          source={{ uri: 'https://www.thewrap.com/wp-content/uploads/2018/08/doug-judy-craig-robinson.jpg' }}
          resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
        /> */}
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>{`${item.Name} ${item.Location}`}</Text>
        </View>
      </Animated.View>
    )

  }


  return (
    <SafeAreaView style={styles.container}>

      {
        isLoading ? <ActivityIndicator /> : (
          <Animated.FlatList
            data={data}
            keyExtractor={item => `key-${item.ID}`}
            renderItem={renderUser}
            contentContainerStyle={{
              padding: 20
            }}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
                { useNativeDriver: true }
              )}
          />
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 18,
    color:"#000"
  },
  image: {
    width: 100,
    height: imgHeight,
    borderRadius:70
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  item: {
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    height:100,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 30,
    padding: paddingItem
  },
  container: {
    flex: 1,
    backgroundColor:"#004223"
  }

});

export default Brands;