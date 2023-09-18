import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsPage from './src/DetailsPage';
import HomePage from './src/HomePage';
import LoginPage from './src/LoginPage';
import ExtraPage from './src/ExtraPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login">
        <Stack.Screen name = "DetailsPage" component = {DetailsPage} />
        <Stack.Screen name = "HomePage" component = {HomePage} />
        <Stack.Screen name = "LoginPage" component = {LoginPage} />
        <Stack.Screen name = "ExtraPage" component = {ExtraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}