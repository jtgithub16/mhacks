import React, { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = ({ navigation }) => {
  return (
    <View className="p-2 bg-synq-yellow">
      <Text>Welcome to Sync!</Text>
      <Text>Let's get you started.</Text>
      <Text>Sign up as a</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Personal User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Company or Organization</Text>
      </TouchableOpacity>
      <Text>Already a user? </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Log in here</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Navigate to Profile for John and Johann</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
