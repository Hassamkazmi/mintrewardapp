import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
      />
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.socialText}>Or Sign up with social platforms</Text>
      <View style={styles.socialMedia}>
        {/* Social media icons here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  input: {
    height: 40,
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 12,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#004223',
    borderRadius: 15,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
  socialText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RegisterScreen;