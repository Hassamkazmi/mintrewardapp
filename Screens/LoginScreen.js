import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet , Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons'; 

const LoginScreen = () => {
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
    alert("Invalid Credendials")    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={styles.container1}>
      <Text style={styles.socialText}>Or Sign up with social platforms</Text>
      <View style={styles.socialMedia}>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome5 name="facebook-f" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome5 name="twitter" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome5 name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome5 name="linkedin-in" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    marginTop: -20,
    backgroundColor:"#fff",
    width:"80%",
    margin:"auto"
  },

  container: {
    padding: 10,
    backgroundColor:"#fff",
    width:"100%",
    margin:"auto",
    marginTop:-10,
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 19,
  },

  socialText: {
    marginBottom: 10,
    fontSize: 16,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    margin:10,
    borderRadius: 30, // Adjust the value to change the roundness of the border
  },
  input: {
    height: 40,
    borderColor: "#a1a1a1",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 12,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#004223",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.8,
  },
  forgotPassword: {
    color: "#07F66E",
    textAlign: "center",
  },
});

export default LoginScreen;
