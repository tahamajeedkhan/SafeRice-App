import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideMenu from 'react-native-side-menu';
import { BlurView } from 'expo-blur';

const MenuContent = ({ navigation, setIsOpen }) => (
  <View style={styles.menuContainer}>
    {/* <TouchableOpacity
      onPress={() => {
        setIsOpen(false);
        navigation.navigate('Profile');
      }}
      style={styles.menuButton}
    >
      <Text style={styles.menuText}>Profile</Text>
    </TouchableOpacity> */}
    <TouchableOpacity
      onPress={() => {
        setIsOpen(false);
        navigation.navigate('EditProfile');
      }}
      style={styles.menuButton}
    >
      <Text style={styles.menuText}>Edit Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        setIsOpen(false);
        navigation.navigate('About');
      }}
      style={styles.menuButton}
    >
      <Text style={styles.menuText}>About</Text>
    </TouchableOpacity>
  </View>
);

const MainMenu = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUserId = await AsyncStorage.getItem('use_id');
        if (storedToken) setToken(storedToken);
        if (storedUserId) setUserId(storedUserId);
        console.log()
      } catch (error) {
        console.error('Error fetching token or userId:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const fetchUsername = async () => {
        try {
          setLoading(true);
          const response = await fetch('http://172.16.65.127:5001/getUsername', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.username) {
            setUsername(data.username);
          } else {
            Alert.alert('Error', data.message || 'Failed to fetch username');
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          Alert.alert('Error', 'Failed to fetch username.');
        } finally {
          setLoading(false);
        }
      };
      fetchUsername();
    }
  }, [token]);

  const handleLogout = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is not available.');
      return;
    }
    try {
      const response = await fetch('http://172.16.65.127:5001/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('use_id');
        setUsername(null);
        setToken(null);
        setUserId(null);
        Alert.alert('Logged Out', 'You have been logged out.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SideMenu
      menu={<MenuContent navigation={navigation} setIsOpen={setIsOpen} />}
      isOpen={isOpen}
      onChange={setIsOpen}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/riceback.jpg')}
          style={styles.backgroundImage}
        >
          <BlurView style={styles.absolute} intensity={50} tint="light" />
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            style={styles.hamburgerButton}
          >
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#FF0000" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Welcome, {username || 'User'}!</Text>
          <View style={styles.optionBoxContainer}>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('Rice_Classification_Model')}
            >
              <Text style={styles.optionText}>Rice Classification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('Disease_Model')}
            >
              <Text style={styles.optionText}>Check Plant Disease</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('Health_Model')}
            >
              <Text style={styles.optionText}>Check Plant Health Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => navigation.navigate('Disease_Solutions')}
            >
              <Text style={styles.optionText}>Check Disease Solution</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionBoxContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionBox: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF0000',
    fontSize: 16,
    marginLeft: 5,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    top: 50,
  },
  menuButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MainMenu;
