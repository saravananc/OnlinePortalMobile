import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar 
          barStyle="light-content"  
          backgroundColor={Platform.OS === "android" ? '#007bff' : "transparent"} 
          translucent={Platform.OS === "ios"}
        /> */}
        <AppNavigator />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6200EE", // Ensure it matches the StatusBar color
  },
});

