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

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text>THIS IS THE PROFILE SCREEN</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Code")}>
        <Text>Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;