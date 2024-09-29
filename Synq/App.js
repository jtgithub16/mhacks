import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ScannedProfile from "./screens/ScannedProfileScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LandingScreen from "./screens/LandingScreen";
import CodeScreen from "./screens/CodeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import * as Linking from "expo-linking";
import { useFonts } from 'expo-font';

const prefix = Linking.createURL("/");

const Stack = createStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    'IBMPlexSans-Regular': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
    'IBMPlexSans-Bold': require('./assets/fonts/IBMPlexSans-Bold.ttf'),
  });

  const linking = {
    prefixes: [prefix, "exp://35.3.202.123:8081"],
    config: {
      screens: {
        Welcome: "welcome", // Path for Home Screen
        SignUp: "signup",
        ScannedProfile: "scanned/:accountId",
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
        <Stack.Screen
          name="ScannedProfile"
          component={ScannedProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Code" component={CodeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
