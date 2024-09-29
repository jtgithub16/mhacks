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

const Welcome = ({ navigation }) => {
  return (
    <View className="p-16 flex-1 justify-center space-y-2">
      <Text className="text-bold text-4xl">Welcome to Sync! 👋</Text>
      <Text>Let's get you started.</Text>
      <Text>Sign up as a</Text>
      <TouchableOpacity
        className="bg-synq-red rounded p-4 flex items-center text-bold"
        onPress={() => navigation.navigate("SignUp", { account: "personal" })}
      >
        <Text>Personal User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-synq-red rounded p-4 flex items-center text-bold"
        onPress={() =>
          navigation.navigate("SignUp", { account: "organization" })
        }
      >
        <Text>Company or Organization</Text>
      </TouchableOpacity>
      <View>
        <Text>Already a user? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Log in here</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Navigate to Profile for John and Johann</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
