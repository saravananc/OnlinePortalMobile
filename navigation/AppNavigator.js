// // navigation/AppNavigator.js
// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthContext } from '../contexts/AuthContext';
// import AuthStack from './AuthStack';
// import DrawerNavigator from './DrawerNavigator';
// import LoadingIndicator from '../components/LoadingIndicator';

// const AppNavigator = () => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <LoadingIndicator />;
//   }

//   return (
//     <NavigationContainer>
//       {user ? <DrawerNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;


// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';
import LoadingIndicator from '../components/LoadingIndicator';

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
