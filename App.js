import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text } from 'react-native';

import HomeScreen from './Screens/Pages/HomeScreen';
import SplashScreen from './Screens/Pages/SplashScreen';
import RegisterScreen from './Screens/Pages/RegisterScreen';
import LoginScreen from './Screens/Pages/LoginScreen';
import NewDateScreen from './Screens/Pages/NewDateScreen';
import ViewDateScreen from './Screens/Pages/ViewDateScreen';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="NewDate" component={NewDateScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="ViewDate" component={ViewDateScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;