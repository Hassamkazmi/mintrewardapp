import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import { Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 80;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;


const Brands = () => {

   const [data, setData] = useState(
        [
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
            "color":"#e825c1",
            "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Foodpanda_logo_since_2017.jpeg"
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
            "color":"#164182",
            "UpdatedBy": null,
            "IsActive": true,
            "Status": "available soon",
            "ImageUrl": "https://media.licdn.com/dms/image/C4E12AQFjVRGvzXfQ7w/article-cover_image-shrink_600_2000/0/1595858364695?e=2147483647&v=beta&t=M1cz81QOyrkr1ZhC_bz3M3ARiBx-F12kXbZLl4fWJQU"
          },
          
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
            "color":"#45A28D",
            "Status": "available soon",
            "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
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
            "color":"#45A28D",
    
            "Status": "available soon",
            "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
          },{
            "ID": 32,
            "Name": "Al KARAM",
            "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide.",
            "Location": "karachi",
            "color":"#45A28D",
    
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
            "color":"#45A28D",
    
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
            "color":"#e825c1",
            "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Foodpanda_logo_since_2017.jpeg"
          },
          {
            "ID": 17,
            "Name": "Al KARAM",
            "color":"#45A28D",
    
    
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
            "color":"#45A28D",
    
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
            "color":"#45A28D",
    
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
            "color":"#45A28D",
    
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
            "color":"#45A28D",
    
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
    const randomColor = '#' + (Math.random() * 0xCCCCCC + 0x333333 << 0).toString(16).padStart(6, '0');


    return (
      <TouchableOpacity onPress={() => {item?.Status != "available soon" ? Linking.openURL(item.Url) : null }}>
      <Animated.View style={[item?.Status == "available soon" ? styles.itemavailable : styles.item, {backgroundColor: item.color,  transform: [{ scale }] }]}>
        
        <View style={styles.wrapText} >
           <View style={styles.brandcard}>
             <Text style={styles.fontSize}>{item.Name}</Text>
             <Text style={{
              fontSize:12,
              fontWeight:"500",
              color:"#fff"
             }}>{item?.Description}</Text>
             <Text style={styles.fontSize}>{item.Status}</Text>
             

           </View>
        </View>
        <Image
          style={styles.image}
          source={{uri:item.ImageUrl}}

        />
      </Animated.View>
      </TouchableOpacity>
    )

  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Brandscontainer}>
        <Text style={styles.brandtxt}>Best Brands</Text>
      </View>
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
    fontSize: 16,
    color:"#fff",
    fontWeight:"700", 
    lineHeight:18,
    textTransform:"capitalize"
  },
  fontSizeLocation: {
    fontSize: 14,
    color:"#000",
    fontWeight:"500", 
    lineHeight:18,
    textTransform:"capitalize"
  },
  brandcard:{
    flexDirection:"column"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: 'blue',
    objectFit:"fill",
    shadowColor: '#000',
    shadowOffset: {
      width: -5,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    overflow:"scroll"
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    height:80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    
    elevation: 22,
    padding: paddingItem,
  
  },
  itemavailable: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#e6f7f2',
    height:110,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    
    elevation: 22,
    padding: paddingItem,
  
  },
  container: {
    flex: 1,
    backgroundColor:"#fff",
  },
  Brandscontainer:{
    height:95,
    backgroundColor:"#004223", 
  },
  brandtxt:{
    color:"#fff",
    textAlign:"center",
    fontSize:22,
    padding:20,
    marginTop:30,
    fontWeight:"700"

  },
  icon: {
    marginRight: 10,
    color:"blue",
    fontWeight:"700"
  },

});

export default Brands;