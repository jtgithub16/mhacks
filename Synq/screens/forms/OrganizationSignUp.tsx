import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { OrganizationProfile } from "../../lib/types";
import { organizationSignUp } from "../../lib/supabase";

const OrganizationSignUp = ({ navigation }) => {
  const initialState: OrganizationProfile = {
    organization_id: "", // Required: Provide a default or empty string
    org_name: "", // Required
    website: "", // Required
    email: "", // Required
  };
  const [formData, setFormData] = useState<OrganizationProfile>(initialState);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { email, org_name, website } = formData;
      const success = await organizationSignUp(
        email,
        password,
        org_name,
        website
      );

      if (success) {
        navigation.navigate("Landing");
      }
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
        <Text className="text-2xl font-bold">Organization Sign Up</Text>
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
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder={"Organization Name"}
          value={formData.org_name}
          onChangeText={(value) => handleChange("org_name", value)}
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
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder={"Website"}
          value={formData.website}
          onChangeText={(value) => handleChange("website", value)}
          // style={styles.input}
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
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
          // style={styles.input}
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
          }}
          className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => handlePasswordChange(value)} // Capture password input
          // style={styles.input}
        />
        <TouchableOpacity
          className="bg-synq-red w-full p-2 rounded-md items-center"
          title={"Sign Up"}
          onPress={handleSubmit}
        >
          <Text className="text-white ">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center space-x-4">
          <View className="flex h-px w-1/4 bg-[#424242] " />
          <Text>Or continue with</Text>
          <View className="flex h-px w-1/4   bg-[#424242] " />
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
            <Image source={require("../../assets/icons/google.png")} />
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
            <Image source={require("../../assets/icons/apple.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrganizationSignUp;
