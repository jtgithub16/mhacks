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

const History = ({ navigation }) => {
  return (
    <View>
      <Text>THIS IS THE HISTORY SCREEN</Text>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default History;