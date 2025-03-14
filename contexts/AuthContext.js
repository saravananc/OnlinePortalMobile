// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, storeToken } from '../utils/storage';
import { signIn as apiSignIn } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check persistent login token on mount
    getToken().then(token => {
      if (token) {
        // Optionally, fetch user info using token
        setUser({ token, name:user.userFirstName}); // Replace with real user data
      }
      setLoading(false);
    });
  }, []);

  const signIn = async (credentials) => {
    try {
        setLoading(true);
        const response = await apiSignIn(credentials);
        console.log(response);

        if (response.status && response.data.length > 1) {
            const userData = response.data[0]; // Extract user details
            const tokenData = response.data[1]; // Extract token details

            const user = {
                userId: userData.userId,
                userFirstName: userData.userFirstName,
                refType: userData.refType,
                roleId: userData.roleId,
                AccessToken: tokenData.AccessToken,
                RefreshToken: tokenData.RefreshToken
            };

            await storeToken(tokenData.AccessToken);
            setUser(user);
        }
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
};


  const signOut = async () => {
    try {
      // Clear all data from AsyncStorage
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage during sign out', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
