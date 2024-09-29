import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { synq_logo, personal_login, organization_login } from "../lib/svg";

const Welcome = ({ navigation }) => {

  return (
    <View className="p-12 flex-1 justify-center">
      <View className="h-16 w-16 mb-8">{synq_logo}</View>
      <Text className="font-bold text-5xl mb-2 text-synq-text" style={{ fontFamily: "IBMPlexSans-Bold" }}>Welcome to Synq! 👋</Text>
      <Text className="font-semibold text-xl mb-16 text-synq-text" style={{ fontFamily: "IBMPlexSans-Regular" }}>
        Let's get you started.
      </Text>
      <View className="space-y-2">
        <Text className="font-bold text-2xl mb-2 text-synq-text" style={{ fontFamily: "IBMPlexSans-Bold" }}>Sign up as a</Text>
        <View>
          <TouchableOpacity
            className="flex flex-row bg-synq-red w-full p-2 rounded-md items-center justify-center space-x-2 mb-3"
            onPress={() => navigation.navigate("SignUp", { account: "personal" })}
          >
            {personal_login}
            <Text className="text-white text-md font-bold" style={{ fontFamily: "IBMPlexSans-Bold" }}>Personal User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row w-full p-2 border-2 border-synq-red rounded-md items-center justify-center space-x-2 mb-3"
            onPress={() =>
              navigation.navigate("SignUp", { account: "organization" })
            }
          >
            {organization_login}
            <Text className="text-synq-red text-md font-bold" style={{ fontFamily: "IBMPlexSans-Bold" }}>Company or Organization</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row space-x-4 pt-4">
          <Text style={{ fontFamily: "IBMPlexSans-Regular" }}>Already a user?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-[#007A8E] underline" style={{ fontFamily: "IBMPlexSans-Regular" }}>Log in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
