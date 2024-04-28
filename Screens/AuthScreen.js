import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker'

const AuthScreen = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Check if username and password are correct
    if (username === "Sharyar" && password === "1234") {
      // Navigate to Home screen if credentials are correct
      navigation.navigate("Home");
    } else {
      // Display error message using Toastify
      alert("Invalid Credendials");
    }
  };

  const gotoGoogle = () => {
    navigation.navigate("googlelogin");
  }

  const [categoryList,setCategoryList]=useState([
    {
      "id":1,
      "name":"Male"
    },
    {
      "id":2,
      "name":"Female"
    },
    {
        "id":2,
        "name":"Other"
      }
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Text style={styles.heading}>Mint Rewards</Text>
        <Text style={styles.subHeading}>Collect Waste, Earn Rewards</Text>
      </View>
      
      <View style={styles.main}>
        <View style={styles.formWrapper}>
          <Text style={styles.formtext}>{isLogin ? "Login" : "Sign Up"} </Text>

          <View style={styles.tile}>
            <Text
              style={[styles.tab, isLogin ? styles.activeTab : null]}
              onPress={() => setIsLogin(true)}
            >
              Login
            </Text>
            <Text
              style={[styles.tab, !isLogin ? styles.activeTab : null]}
              onPress={() => setIsLogin(false)}
            >
              Sign Up
            </Text>
          </View>
          <View style={styles.formWrap}>
            {isLogin ? (
              <View style={styles.formField}>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Email Address"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.notMem}>
                  <View style={styles.socialMedia}>
                    <TouchableOpacity style={styles.socialIcon}>
                      <FontAwesome5 name="facebook-f" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                      <FontAwesome5 name="twitter" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={gotoGoogle} style={styles.socialIcon}>
                      <FontAwesome5 name="google" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                      <FontAwesome5
                        name="linkedin-in"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.formField}>
                <TextInput style={styles.input} placeholder="User Name" />
                <TextInput style={styles.input} placeholder="Phone Number" />
                <TextInput style={styles.input} placeholder="Email Address" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                />
                 <View style={styles.inputoicker}>
                 <Picker
                                   
              onValueChange={itemValue=>setFieldValue('category',itemValue)}
            > 
              {categoryList.length>0&&categoryList?.map((item,index)=>(
                  <Picker.Item key={index} 
                  
                   label={item?.name} value={item?.name} />
              ))}
          
               </Picker>
                </View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Signup</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    backgroundColor: "#04790C",
    alignItems: "center",
    paddingTop: 85,
    paddingBottom: 20,
    height: 300,
    position: "relative",
  },
  inputoicker:{
    borderWidth: 2,
    borderColor: "#f1f1f1",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 12,
    fontSize: 15,
    height:60
   
  },
  formtext: {
    textAlign: "center",
    color: "#000",
    paddingBottom: 15,
    fontSize: 20,
    fontWeight: "700",
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight:"700"
  },
  subHeading: {
    color: "#fff",
    fontSize: 18,
    fontWeight:"700"

  },
  main: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: -100,
    alignItems: "center",
    
  },
  formWrapper: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    position: "relative",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
    // marginTop:-40
  },
  tile: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    width: "48%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 2,
    borderColor: "#a1a1a1",
    borderRadius: 5,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#004223",
    color: "#fff",
  },
  formWrap: {
    flexDirection: "row",
  },
  formField: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: "#f1f1f1",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
    fontSize: 15,
  },
  forgot: {
    marginBottom: 15,
    paddingHorizontal: 2,
    color: "#07F66E",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#004223",
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  notMem: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  notMemText: {
    marginRight: 5,
  },
  signupLink: {
    color: "#07F66E",
    textDecorationLine: "underline",
  },
  socialText: {
    marginBottom: 10,
    fontSize: 16,
  },
  socialMedia: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 30, // Adjust the value to change the roundness of the border
  },
});

export default AuthScreen;
