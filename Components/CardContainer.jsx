import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import Card from './Card';
const CardContainer = ({maxVisibleItems}) => {
  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);
  const data = [
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
      "Status": "available",
      "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Foodpanda_logo_since_2017.jpeg"
    },
    {
      "ID": 5,
      "Name": "UNILEVER PAKISTAN LIMITED",
      "Description": "We are Unilever.\r\nWe are 127,000 people across the world, we are over 400 brand names in 190 countries, we are a global company with a global purpose.\r\n\r\na diverse group of people sitting on blocks\r\nWe are driven by our purpose: to make sustainable living commonplace\r\n\r\nIt’s why we come to work. It’s why we’re in business. It’s how we inspire exceptional performance.\r\n\r\nBack in 1883, Sunlight Soap was launched in the UK by our founder – it was pioneering, it was innovative and it had a purpose: to popularise cleanliness and bring it within reach of ordinary people. That was sustainable living, even then. We now have over 400 brands and we are still driven by purpose.\r\n\r\nWe want to do more good for our planet and our society – not just less harm. We want to act on the social and environmental issues facing the world and we want to enhance people’s lives with our products.\r\n\r\nWe’ve been pioneers, innovators and future-makers for over 120 years – we plan to continue doing that. And we plan to do it sustainably.",
      "Location": "London United Kingdom",
      "PhoneNumber": "0000140",
      "Url": "https://www.unilever.pk/",
      "CreatedAt": "2024-02-19T22:00:56.547",
      "UpdatedAt": "2024-02-19T22:00:56.547",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://media.licdn.com/dms/image/C4E12AQFjVRGvzXfQ7w/article-cover_image-shrink_600_2000/0/1595858364695?e=2147483647&v=beta&t=M1cz81QOyrkr1ZhC_bz3M3ARiBx-F12kXbZLl4fWJQU"
    },
    {
      "ID": 6,
      "Name": "KHAADI",
      "Description": "Khaadi Corporation Limited is a leading retail company owned by Shamoon Sultan. It has experienced tremendous growth, starting with Khaadi, a single store, selling hand-woven fabric and now over 50 stores and 4 brands, including Khaadi, Chapter 2, Kanteen and Kreate Your Mark.",
      "Location": "karachi",
      "PhoneNumber": "080074007",
      "Url": "https://pk.khaadi.com/",
      "CreatedAt": "2024-02-25T21:31:00.99",
      "UpdatedAt": "2024-02-25T21:31:00.99",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available soon",
      "ImageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0f/KhaadiLogo-22.png"
    },
    {
      "ID": 97,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },
    {
      "ID": 7,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 32,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 71,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 17,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 37,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 73,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 24,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    },{
      "ID": 22,
      "Name": "Al KARAM",
      "Description": "The Al Karam Group was founded in March 1986 with a vision to be a provider of innovative textile solutions worldwide. We are a manufacturer and suppliers of distinguished fabric for apparel, home and industrial markets with clients all over the world.",
      "Location": "karachi",
      "PhoneNumber": "+922137130271",
      "Url": "https://www.alkaramstudio.com/",
      "CreatedAt": "2024-02-25T21:36:52.677",
      "UpdatedAt": "2024-02-25T21:36:52.677",
      "CreatedBy": null,
      "UpdatedBy": null,
      "IsActive": true,
      "Status": "available",
      "ImageUrl": "https://hyderi.dolmenmalls.com/wp-content/uploads/2022/04/alkaram-studio.png"
    }
  ]
  return (
    <>
      {data?.map((item, index) => {
        return (
          <Card
            maxVisibleItems={maxVisibleItems}
            item={item}
            index={index}
            dataLength={data.length}
            animatedValue={animatedValue}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
            key={index}
          />
        );
      })}
    </>
  );
};

export default CardContainer;