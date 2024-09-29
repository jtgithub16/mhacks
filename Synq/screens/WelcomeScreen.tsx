import React, { useState } from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Welcome = ({ navigation }) => {
  return (
    <View className="p-12 flex-1 justify-center">
      <Text className="font-bold text-5xl mb-2">Welcome to Synq! 👋</Text>
      <Text className="font-semibold text-xl mb-12">
        Let's get you started.
      </Text>
      <Text className="font-bold text-2xl mb-2">Sign up as a</Text>
      <TouchableOpacity
        className="flex flex-row bg-synq-red w-full p-2 rounded-md items-center justify-center space-x-2 mb-3"
        onPress={() => navigation.navigate("SignUp", { account: "personal" })}
      >
        <Image source={require("../assets/icons/person.png")} />
        <Text className="text-white text-md">Personal User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex flex-row w-full p-2 border-2 border-synq-red rounded-md items-center justify-center space-x-2 mb-3"
        onPress={() =>
          navigation.navigate("SignUp", { account: "organization" })
        }
      >
        <Image source={require("../assets/icons/corporate.png")} />
        <Text className="text-synq-red text-md">Company or Organization</Text>
      </TouchableOpacity>
      <View className="flex flex-row space-x-2">
        <Text>Already a user? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-[#007A8E] underline">Log in here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
