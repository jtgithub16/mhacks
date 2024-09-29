import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { login } from "../lib/supabase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    try {
      const success = await login(email, password);
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
          <Image source={require("../assets/icons/back.png")} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Login</Text>
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
          placeholderTextColor={"#424242"}
          value={email}
          onChangeText={setEmail}
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
          className="border border-[#D5D8DE] rounded-md  w-full p-4  flex-row"
          placeholder="Password"
          placeholderTextColor={"#424242"}
          secureTextEntry={visible}
          value={password}
          onChangeText={setPassword} // Capture password input
        />
        <TouchableOpacity
          className="bg-synq-red w-full p-2 rounded-md items-center"
          title={"Login"}
          onPress={handleSubmit}
        >
          <Text className="text-white ">Login</Text>
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
            <Image source={require("../assets/icons/google.png")} />
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
            <Image source={require("../assets/icons/apple.png")} />
          </TouchableOpacity>
          {/* PUT GOOGLE AND APPLE LOG IN BUTTONS HERE */}
        </View>
      </View>
    </View>
  );
};

export default Login;
