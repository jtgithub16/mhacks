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
import { supabase } from '../lib/supabase';

const Welcome = ({ navigation }) => {
  return (
    <View className="p-4 bg-synq-bg flex-1 justify-center space-y-2">
      <Text className="text-bold text-4xl">Welcome to Sync! 👋</Text>
      <Text>Let's get you started.</Text>
      <Text>Sign up as a</Text>
      <TouchableOpacity className="bg-synq-red rounded p-4 flex items-center" onPress={() => navigation.navigate("Login")}>
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

export default Welcome;
