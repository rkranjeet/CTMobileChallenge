/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN } from './src/constants';
import Form from './src/screens/Form';
import Otp from './src/screens/Otp';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN.OTP}>
        <Stack.Screen
          name={SCREEN.FORM}
          component={Form}
          options={{ title: 'Onboarding Form' }}
        />
        <Stack.Screen
          name={SCREEN.OTP}
          component={Otp}
          options={{ title: 'OTP Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
