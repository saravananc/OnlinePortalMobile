
// navigation/DrawerNavigator.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import AccountsScreen from '../screens/accounts/AccountsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigationState } from "@react-navigation/native";
import { AuthContext } from '../contexts/AuthContext';
import { Image } from "react-native";
import PatientQuery from '../screens/Patientquery';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const AccountsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
  </Stack.Navigator>
);

// ✅ Drawer Navigator (Shows the header)
const DrawerNavigator = () => {
  const currentRouteName = useNavigationState((state) => {
    if (!state) return "Dashboard"; // Default value

    const drawerRoute = state.routes[state.index]; // Get current drawer route
    if (drawerRoute.name === "Main" && drawerRoute.state) {
      // 🏆 Access nested tab navigator state
      const tabState = drawerRoute.state;
      const activeTab = tabState.routes[tabState.index].name;
      return activeTab; // Return active tab name
    }
    return drawerRoute.name;
  });

  //   const route = useRoute();
  // const activeTabName = getFocusedRouteNameFromRoute(route) ?? "Home";
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        headerTitle:currentRouteName, // 🔥 Set main header title
        headerRight: () => <DrawerIconWithAvatar navigation={navigation} />, // 🏆 Custom drawer button + avatar
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={MainTabNavigator} />
      <Drawer.Screen name="Accounts" component={AccountsStack} />
      <Drawer.Screen name="Patientquery" component={PatientQuery} />
    </Drawer.Navigator>
  );
};

// ✅ Custom Drawer Icon with Avatar
const DrawerIconWithAvatar = ({ navigation }) => {
  const { user} = useContext(AuthContext);
  const userName = user.userFirstName; 
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <View style={styles.headerContainer}>
      {/* 🍔 Drawer Menu Button */}
      
      {/* 👤 User Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{userInitial}</Text>
      </View>
    </View>
  );
};

// ✅ Custom Drawer Content
const CustomDrawerContent = (props) => {
  const { signOut, user } = useContext(AuthContext); // Get user info from context

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* User Avatar Section */}
      <View style={styles.userInfoContainer}>
        <Image 
        source={user?.avatar ? { uri: user.avatar } : require("../assets/user-profile.png")} 
          style={styles.userAvatar} 
        />
        <Text style={styles.userName}>{user?.userFirstName || "Guest User"}</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.menuContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <MaterialIcons name="logout" size={24} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    
  },
  menuButton: {
    marginRight: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  drawerContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    marginTop:10
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginTop: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    color: 'red',
    fontSize: 16,
  },
  userInfoContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
   
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default DrawerNavigator;
