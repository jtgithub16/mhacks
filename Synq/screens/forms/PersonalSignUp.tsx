import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { PersonalProfile } from "../../lib/types";
import { personalSignUp } from "../../lib/supabase";
import { apple, google } from "../../lib/svg";

const PersonalSignup = ({ navigation }) => {
  const initialState: PersonalProfile = {
    personal_id: "", // Required: Provide a default or empty string
    first_name: "", // Required
    last_name: "", // Required
    email: "", // Required
  };
  const [formData, setFormData] = useState<PersonalProfile>(initialState);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { email, first_name, last_name } = formData;
      await personalSignUp(email, password, first_name, last_name);
      navigation.navigate("Landing");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View className="flex justify-center items-center h-full w-full p-8">
      <View className="flex flex-col justify-center items-start h-full w-full space-y-8">
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={require("../../assets/icons/back.png")} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold" style={{ fontFamily: "IBMPlexSans-Bold" }}>Personal Sign Up</Text>
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            // Apply shadow properties
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Needed for Android shadow
            fontFamily: "IBMPlexSans-Regular"
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder={"First"}
          value={formData.first_name}
          onChangeText={(value) => handleChange("first_name", value)}
        />
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            // Apply shadow properties
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Needed for Android shadow
            fontFamily: "IBMPlexSans-Regular"
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder={"Last"}
          value={formData.last_name}
          onChangeText={(value) => handleChange("last_name", value)}
        />
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            // Apply shadow properties
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Needed for Android shadow
            fontFamily: "IBMPlexSans-Regular"
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            // Apply shadow properties
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Needed for Android shadow
            fontFamily: "IBMPlexSans-Regular"
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => handlePasswordChange(value)} // Capture password input
        />
        <TouchableOpacity
          className="bg-synq-red w-full p-2 rounded-md items-center"
          title={"Sign Up"}
          onPress={handleSubmit}
        >
          <Text className="text-white p-1" style={{ fontFamily: "IBMPlexSans-Bold" }}>Sign Up</Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-between space-x-4">
          <View className="h-px flex-1 bg-[#424242]" />
          <Text>Or continue with</Text>
          <View className="h-px flex-1 bg-[#424242]" />
        </View>
        <View className="flex flex-row items-center justify-center space-x-8 w-full">
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              // Apply shadow properties
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, // Needed for Android shadow
            }}
            className="flex items-center justify-center p-2 w-5/12 border border-[#D5D8DE] rounded-md "
          >
            {google}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              // Apply shadow properties
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, // Needed for Android shadow
            }}
            className="flex items-center justify-center p-2 w-5/12 border border-[#D5D8DE] rounded-md "
          >
            {apple}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PersonalSignup;
