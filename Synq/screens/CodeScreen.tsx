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
import QRCode from "react-native-qrcode-svg";

const Code = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center space-y-8 p-8">
      <Text className="font-bold text-2xl">Your Code</Text>
      <View className="flex justify-center items-center bg-white p-8 rounded-xl shadow ">
        <QRCode
          value={
            "exp://35.3.242.196:8081/--/scanned/7ea32499-d829-46f8-a386-d2dd69f59f14" // CURRENTLY: Atlas
          } // The link you want to encode
          size={250} // Size of the QR Code
          color="#FF5A5F"
          backgroundColor="transparent" // Background color of the QR Code
        />
      </View>
      <Text className="text-2xl text-center">
        Point your camera at the QR code to view the card.
      </Text>
    </View>
  );
};

export default Code;
