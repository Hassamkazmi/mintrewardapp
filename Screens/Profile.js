import React, { useState } from "react";
import { StyleSheet, Pressable, Text, View, Image, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import the close icon
import image from "../assets/bottle.png";
import { useNavigation } from "@react-navigation/native";

export default  UserProfileView = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const logout = () => {
    navigation.navigate("Login");
  };

  const savePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    // Perform any other validation checks here

    // If all validation checks pass, you can save the password
    // Add your logic here to save the new password
    Alert.alert("Password saved successfully");

    // Close the modal
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Welcome</Text>
            <Text style={styles.userInfo}>Sharyar</Text>
          </View>
          <View>
            <Image
              style={styles.avatar}
              source={require("../assets/male.png")}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>Don't trash it, MINT it!</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Pressable style={styles.RectangleShapeView}>
          <Text style={styles.headtText}>location</Text>
          <Text style={styles.SubjectText}>Malir Karachi</Text>
        </Pressable>
        <Pressable style={styles.RectangleShapeView}>
          <Text style={styles.headtText}>Collection Date</Text>
          <Text style={styles.SubjectText}>30 May, 2024 </Text>
        </Pressable>
        <Pressable style={styles.RectangleShapeView}>
          <Text style={styles.headtText}>Total Collection</Text>
          <Text style={styles.SubjectText}>43 KG </Text>
        </Pressable>
        <View>
          <Pressable style={styles.btn} onPress={toggleModal}>
            <Text style={styles.text}>Change Password</Text>
          </Pressable>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={logout}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal header with close icon */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity onPress={toggleModal}>
                <FontAwesome5 name="times" style={styles.closeicon} size={24} color="black" />
              </TouchableOpacity>
            </View>
            {/* Modal content */}
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={savePassword}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor:"#004223",
    backgroundSize: "contain",
    height: 200
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    float: "right"
  },
  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  headtText: {
    color: "grey",
    fontWeight: "600",
    float: "left",
    marginLeft: 20,
    marginTop: 10
  },
  SubjectText: {
    color: "black",
    fontWeight: "550",
    fontSize: 16,
    float: "left",
    marginLeft: 20,
    marginTop: 10
  },
  userInfo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#004223",
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    padding: "6px",
    elevation: 3
  },
  body: {
    backgroundColor: "white",
    height: 500,
    alignItems: "center"
  },
  text: {
    color: "white",
    margin: 14
  },
  RectangleShapeView: {
    marginTop: 20,
    width: "80%",
    height: 80,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 3
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#004223",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  closeicon:{
    padding:25
  }
});
