import React, {useRef} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';

const DATA = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
];

const Header_Max_Height = 500;
const Header_Min_Height = 180;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({value}) => {
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#678983'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}>
         <SafeAreaView style={{ flex: 1, backgroundColor: "#fff"}}>
      <StatusBar translucent={false} backgroundColor="#004223" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Icon2 name="male" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.logo}>Mint Rewards</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Icon name="exit-to-app" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#004223",
            height: 80,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Don't trash it</Text>
            <Text style={styles.headerTitle}>MINT it!</Text>
            
          </View>
        </View>
        <Text style={styles.sectionTitle}></Text>
        
      </ScrollView>
    </SafeAreaView>
    </Animated.View>
  );
};

const ScrollViewScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <DynamicHeader value={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {DATA.map(val => {
          return (
            <View style={styles.card}>
              <Text style={styles.subtitle}>({val.id})</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollViewScreen;

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#004223",
      },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
  redeemnow:{
    backgroundColor:"#004223",
    marginLeft:20
  },
  username:{
    fontSize:20,
    marginLeft:25,
    fontWeight:"700",
    textDecorationLine:"underline",
  },
  imagedata: {
    height: 50,
    width: 50,
    marginLeft: 20,
  },
  brandtext: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },
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
    height: 100,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    top: 70,
    bottom: 20,
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
    textAlign: "center",
    paddingTop: 20,
  },
  cardImage: {
    backgroundColor: "#c4f6bf",
    height: 170,
    width: 170,
    marginRight: 20,
    padding: 10,
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "#7bd98e",
  },
  cardImageNew: {
    height: 165,
    backgroundColor: "#c4f6bf",
    borderWidth: 10,
    borderColor: "#7bd98e",
    width: 170,
    marginRight: 20,
    marginTop: 10,
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