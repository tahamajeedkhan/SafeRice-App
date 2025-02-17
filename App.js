import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from 'react-native';

import SplashScreen from 'react-native-splash-screen'; // Import splash screen

// Import all components
import Login from "./components/Login";
import SignUp from "./components/Signup";
import MainMenu from "./components/Main_Menu"; // Keep the import
import Health_Model from "./components/Health_Model"; // Fixed the name format
import Disease_Model from "./components/Disease_Model"; // Fixed the name format
import Rice_Classification_Model from "./components/Rice_Classification_Model";
import WorkInProgress from "./components/Work_In_Progress"; // Fixed the name format
import Disease_Solutions from "./components/Disease_Solutions";
import Profile from "./components/Profile"; // New component
import EditProfile from "./components/Edit_Profile"; // New component
import About from "./components/About"; // New component
import SplashScreenComponent from "./components/Splash_Screen"; // New component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* Splash Screen */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreenComponent}
          options={{ headerShown: false }}
        />

        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* SignUp Screen */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        {/* MainMenu Screen */}
        <Stack.Screen
          name="MainMenu"
          component={MainMenu} // Use the imported MainMenu component
          options={({ navigation }) => ({
            headerShown: true, // Show header with logout button
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout(navigation)} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />

        {/* Work in Progress Screen */}
        <Stack.Screen
          name="WorkInProgress"
          component={WorkInProgress}
          options={{ headerShown: false }}
        />

        {/* About Screen */}
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: true, title: "About" }}
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true, title: "Profile" }}
        />

        {/* Edit Profile Screen */}
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: true, title: "Edit Profile" }}
        />

        {/* Health Model Screen */}
        <Stack.Screen
          name="Health_Model"
          component={Health_Model}
          options={{ headerShown: false }}
        />

        {/* Disease Model Screen */}
        <Stack.Screen
          name="Disease_Model"
          component={Disease_Model}
          options={{ headerShown: false }}
        />

        {/* Rice Classification Model Screen */}
        <Stack.Screen
          name="Rice_Classification_Model"
          component={Rice_Classification_Model}
          options={{ headerShown: false }}
        />

        {/* Disease Solutions Screen */}
        <Stack.Screen
          name="Disease_Solutions"
          component={Disease_Solutions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Function to handle logout
const handleLogout = (navigation) => {
  console.log('Logging out...');
  navigation.navigate('Login'); // Redirect to the Login screen after logout
};

// Styles for the layout (if needed, add your styles here)
const styles = {
  logoutButton: {
    marginRight: 10,
    padding: 10,
  },
  logoutText: {
    color: '#FF0000', // Red color for logout
    fontSize: 16,
    fontWeight: '600',
  },
};
