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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";

const Code = ({ navigation }) => {
  const [clicked, setClicked] = useState(true);
  const qrcodeContains = [
    "Organization",
    "Email",
    "Website",
  ];
  const qrcodeLinks = [
    { id: 1, title: "Default QR Code", qrCodeUrl:"exp://35.3.242.196:8081/--/scanned/7ea32499-d829-46f8-a386-d2dd69f59f14", 
        contents: [ 
         "Organization",
         "Email",
         "Website",
        ]
    },
    { id: 2, title: "Atlas Description Code", qrCodeUrl:"exp://35.3.242.196:8081/--/scanned/7ea32499-d829-46f8-a386-d2dd69f59f14", 
        contents: [ 
         "Organization",
         "Email",
         "Website",
         "Description",
        ]
    }
  ];
  const whenClicked = () =>{
    setClicked(!clicked)
  }
  return (
    <View className="flex-1 justify-center space-y-8 p-4 my-8 w-full">
      {clicked ? (
        <TouchableOpacity>
          {/* Heading */}
          <Text className="font-bold text-2xl mb-4">Your Cards</Text>

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
                color="#000"
                backgroundColor="transparent"
              />
            </View>
      
            {/* Text and Contents */}
            <View className = "w-[40%] mr-4">
              <Text className="text-red-500 text-m font-bold">{item.title}</Text>
              <Text className="text-gray-500 text-s">Includes: {item.contents.join(", ")}</Text>
            </View>
      
            {/* Edit Icon and Send Button */}
            <View className="flex-col items-center justify-between my-2 space-y-4 space-x-2">
              {/* Edit Icon */}
              <TouchableOpacity onPress={whenClicked}>
                <Image
                  source={require('../assets/icons/edit.png')}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </TouchableOpacity>
      
              {/* Send Button */}
              <TouchableOpacity className="bg-[#007A8E] px-4 py-2 rounded-lg flex-row items-center" onPress ={whenClicked}>
                <Text className="text-white font-bold mr-1">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
      ))}
      </TouchableOpacity>
      ) : 
      <View className="flex-1 items-center justify-center space-y-8 p-10 bg-[#007A8E] rounded-xl shadow ">
            <View className = "flex-row items-center space-x-4 mg-10 p-2">
              <TouchableOpacity onPress={whenClicked}>
                <Image source={require("../assets/icons/back.png")} />
              </TouchableOpacity>
              <Text className="font-bold text-2xl text-white">Your Card</Text>
            </View>
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
            <Text className="text-2xl text-center text-white">
              Point your camera at the QR code to view the card.
            </Text>
          </View>
        }
    </View>
    
  );
};

export default Code;
