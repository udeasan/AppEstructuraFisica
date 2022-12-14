import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './Screens/Pages/HomeScreen';
import SplashScreen from './Screens/Pages/SplashScreen';
import RegisterScreen from './Screens/Pages/RegisterScreen';
import LoginScreen from './Screens/Pages/LoginScreen';
import NewDateScreen from './Screens/Pages/NewDateScreen';
import ViewDateScreen from './Screens/Pages/ViewDateScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarActiveTintColor: '#e91e63',
  tabBarStyle: [
    {
      display: 'flex',
    },
    null,
  ],
};

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: 'Inicio',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="NewDate"
        component={NewDateScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: 'Nueva Cita',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="clock-time-nine-outline"
              color={color}
              size={24}/>
          ),
        }}
      />
      <Tab.Screen
        name="ViewDate"
        component={ViewDateScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          showIcon: true,
          tabBarLabel: 'Mis Citas',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="clipboard-text-multiple"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Auth() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
