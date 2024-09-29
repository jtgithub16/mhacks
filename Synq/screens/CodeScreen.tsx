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
    <View className="p-8">
      <View className="flex justify-center items-center bg-white p-8 rounded-xl shadow ">
        <QRCode
          value={
            "exp://35.3.242.196:8081/--/scanned/0c882021-2ff1-4f59-91ef-617bf0f7c76a"
          } // The link you want to encode
          size={250} // Size of the QR Code
          color="#FF5A5F"
          backgroundColor="transparent" // Background color of the QR Code
        />
      </View>
      <Text>Point your camera at the QR code to view the card.</Text>
    </View>
  );
};

export default Code;
