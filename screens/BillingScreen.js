// screens/BillingScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BillingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Billing Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BillingScreen;
