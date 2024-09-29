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
            // icon = <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            // <mask id="mask0_24_164" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
            // <rect width="30" height="30" fill="#D9D9D9"/>
            // </mask>
            // <g mask="url(#mask0_24_164)">
            // <path d="M15 26.25C12.125 26.25 9.61979 25.2969 7.48438 23.3906C5.34896 21.4844 4.125 19.1042 3.8125 16.25H6.375C6.66667 18.4167 7.63021 20.2083 9.26562 21.625C10.901 23.0417 12.8125 23.75 15 23.75C17.4375 23.75 19.5052 22.901 21.2031 21.2031C22.901 19.5052 23.75 17.4375 23.75 15C23.75 12.5625 22.901 10.4948 21.2031 8.79688C19.5052 7.09896 17.4375 6.25 15 6.25C13.5625 6.25 12.2188 6.58333 10.9688 7.25C9.71875 7.91667 8.66667 8.83333 7.8125 10H11.25V12.5H3.75V5H6.25V7.9375C7.3125 6.60417 8.60938 5.57292 10.1406 4.84375C11.6719 4.11458 13.2917 3.75 15 3.75C16.5625 3.75 18.026 4.04688 19.3906 4.64063C20.7552 5.23438 21.9427 6.03646 22.9531 7.04688C23.9635 8.05729 24.7656 9.24479 25.3594 10.6094C25.9531 11.974 26.25 13.4375 26.25 15C26.25 16.5625 25.9531 18.026 25.3594 19.3906C24.7656 20.7552 23.9635 21.9427 22.9531 22.9531C21.9427 23.9635 20.7552 24.7656 19.3906 25.3594C18.026 25.9531 16.5625 26.25 15 26.25ZM18.5 20.25L13.75 15.5V8.75H16.25V14.5L20.25 18.5L18.5 20.25Z" fill="#424242"/>
            // </g>
            // </svg>
          } else if (route.name === "Profile") {
            icon = <IonIcon name={"person"} size={size} color={color} />;
          }

          return icon;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Code" component={CodeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Landing;
