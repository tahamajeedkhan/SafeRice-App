import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username and Password are required");
      return;
    }

    try {
      const response = await axios.post("http://172.16.65.127:5001/login", {
        username,
        password,
      });

      if (response.data.success) {
        console.log(response.data);

        // Store the JWT token and user ID in AsyncStorage
        await AsyncStorage.setItem("authToken", response.data.token);
        await AsyncStorage.setItem("use_id", response.data.use_id.toString());

        // Display success message and navigate to MainMenu
        Alert.alert("Login Successful", "You are now logged in");
        navigation.navigate("MainMenu");
      } else {
        Alert.alert("Login Failed", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error logging in");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/riceback.jpg")}
        style={styles.backgroundImage}
      >
        <BlurView style={styles.absolute} intensity={50} tint="light" />

        <Text style={styles.title}>Login</Text>

        {/* Username input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ddd"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "80%",
    paddingVertical: 12,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    fontSize: 16,
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  signupButton: {
    backgroundColor: "#00796B",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Login;
