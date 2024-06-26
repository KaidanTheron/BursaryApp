import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import AdminScreen from '../screens/AdminScreen';
import AddScreen from '../screens/AddScreen';
import BursaryScreen from '../screens/BursaryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Admin" options={{headerShown: false}} component={AdminScreen} />
        <Stack.Screen name="Add" options={{headerShown: false}} component={AddScreen} />
        <Stack.Screen name="Bursaries" options={{headerShown: false}} component={BursaryScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}