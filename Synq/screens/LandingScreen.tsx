import React from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import ProfileScreen from "./ProfileScreen";
import CodeScreen from "./CodeScreen";
import HistoryScreen from "./HistoryScreen";

const Tab = createBottomTabNavigator();

const Landing = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Code") {
            icon = <IonIcon name={"qr-code"} size={size} color={color} />;
          } else if (route.name === "History") {
            icon = <IonIcon name={"time"} size={size} color={color} />;
          } else if (route.name === "Profile") {
            icon = <IonIcon name={"person"} size={size} color={color} />;
          }

          return icon;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Code" component={CodeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Landing;
