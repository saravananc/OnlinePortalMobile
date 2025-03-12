
// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNavigator from './MainTabNavigator';
import AccountsScreen from '../screens/AccountsScreen'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Main">
    <Drawer.Screen name="Main" component={MainTabNavigator} />
    <Drawer.Screen name="Accounts" component={AccountsScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
