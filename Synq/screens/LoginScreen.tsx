import React, { useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground,
  AppState,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>THIS IS THE LOGIN SCREEN</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
