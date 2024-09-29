import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LandingScreen from "./screens/LandingScreen";
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const Stack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: [prefix, 'exp://35.3.202.123:8081'],
    config: {
      screens: {
        Welcome: 'welcome', // Path for Home Screen
        SignUp: 'signup',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const linking = {
  prefixes: ["exp://35.3.242.196:8081"],
  config: {
    screens: {
      Welcome: "welcome",
      SignUp: "signup",
      Login: "login",
      Landing: "landing",
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
