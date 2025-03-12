// components/Header.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useContext(AuthContext);

  // Hide drawer icon on Dashboard screen
  const showDrawerIcon = route.name !== 'Dashboard';

  return (
    <View style={styles.header}>
      {showDrawerIcon && (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/images/drawer-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{user ? user.name : 'Welcome'}</Text>
      <Image source={require('../assets/images/user-icon.png')} style={styles.userIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  title: { flex: 1, textAlign: 'center', fontSize: 18 },
  icon: { width: 24, height: 24 },
  userIcon: { width: 32, height: 32, borderRadius: 16 },
});

export default Header;
