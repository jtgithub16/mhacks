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

const Code = ({ navigation }) => {
  return (
    <View>
      <Text>THIS IS THE QR CODE SCREEN</Text>
      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <Text>History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Code;