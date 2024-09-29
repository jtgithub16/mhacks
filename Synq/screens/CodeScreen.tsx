import React, { useState, useEffect } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import QRCode from "react-native-qrcode-svg";
import { Session } from "@supabase/supabase-js";
import { red_edit, white_close, plus } from "../lib/svg";

const Code = ({ navigation }) => {
  const [clicked, setClicked] = useState(true);
  const [sessionData, setSession] = useState(null);
  const qrcodeContains = ["Organization", "Email", "Website"];
  const qrcodeLinks = [
    {
      id: 1,
      title: "Default QR Code",
      qrCodeUrl: `exp://35.3.242.196:8081/--/scanned/${sessionData?.user.id}`,
      contents: ["Organization", "Email", "Website"],
    },
    {
      id: 2,
      title: `${sessionData?.user.email} Description Code`,
      qrCodeUrl: `exp://35.3.242.196:8081/--/scanned/${sessionData?.user.id}`,
      contents: ["Organization", "Email", "Website", "Description"],
    },
  ];
  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    // setSessions(session);
    setSession(session);
  };
  useEffect(() => {
    fetchSession();
  }, [sessionData]);
  const whenClicked = () => {
    setClicked(!clicked);
  };
  return (
    <View className="flex justify-start items-center h-full w-full space-y-8">
      {clicked ? (
        <View className="w-full h-full p-8">
          <View className="w-full flex flex-row-reverse">
            <TouchableOpacity
              onPress={() => {}}
              className="absolute bg-synq-red rounded-full"
            >
              {plus}
            </TouchableOpacity>
            <Text className="text-3xl font-bold mb-12 w-full text-left">
              Your Codes
            </Text>
          </View>
          <ScrollView>
            {qrcodeLinks.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md w-full mb-6"
              >
                {/* QR Code */}
                <View className="mr-4">
                  <QRCode
                    value={item.qrCodeUrl} // Replace with the actual value you want to encode
                    size={60} // Adjust size as per your design
                    color="#000000"
                    backgroundColor="transparent"
                  />
                </View>
                {/* Text and Contents */}
                <View className="w-[40%] mr-4">
                  <Text className="text-red-500 text-m font-bold">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-s">
                    Includes: {item.contents.join(", ")}
                  </Text>
                </View>
                {/* Edit Icon and Send Button */}
                <View className="flex-col items-center justify-between my-2 space-y-4 space-x-2">
                  {/* Edit Icon */}
                  <TouchableOpacity onPress={whenClicked}>
                    {red_edit}
                  </TouchableOpacity>
                  {/* Send Button */}
                  <TouchableOpacity
                    className="bg-[#007A8E] px-4 py-2 rounded-lg flex-row items-center"
                    onPress={whenClicked}
                  >
                    <Text className="text-white font-bold mr-1">Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View className="flex h-full items-center justify-center space-y-8 p-10 bg-[#007A8E] rounded-xl shadow ">
          <View className="flex-row items-center space-x-4 p-2 w-full">
            <TouchableOpacity className="absolute" onPress={whenClicked}>
              {white_close}
            </TouchableOpacity>
            <Text className="font-bold text-2xl text-white w-full text-center">
              Your Card
            </Text>
          </View>
          <View className="flex justify-center items-center bg-white p-8 rounded-xl shadow ">
            <QRCode
              value={
                `exp://35.3.242.196:8081/--/scanned/${sessionData?.user.id}`
                // CURRENTLY: Atlas
              } // The link you want to encode
              size={250} // Size of the QR Code
              color="#000000"
              backgroundColor="transparent" // Background color of the QR Code
            />
          </View>
          <Text className="text-xl text-center text-white">
            Point your camera at the QR code to view the card.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Code;
