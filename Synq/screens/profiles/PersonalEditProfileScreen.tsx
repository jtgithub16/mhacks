import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { red_edit } from "../../lib/svg";

const PersonalEditProfile = ({
  profile,
  setProfile,
  setEditMode,
  handleLogOut,
  handlePersonalSubmit,
  personalFields,
}) => {
  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleClick = () => {
    setEditMode(false);
    handlePersonalSubmit();
  };

  return (
    <View className="flex justify-center items-center h-full w-full">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
        className="w-full p-8"
        // className="flex flex-col justify-center items-center h-full w-full"
      >
        {profile ? (
          // Render fields for personal profile
          <View className="flex justify-center items-center text-center space-y-8 w-full mb-12">
            <Text className="text-2xl text-left font-bold w-full">
              Your Card
            </Text>
            <View className="flex flex-col justify-center items-center">
              <View className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-full mb-4" />
              <Text className="text-xl font-bold">{profile.email}</Text>
              <Text className="text-lg mb-4">Student</Text>
              <TouchableOpacity
                className="flex-row items-center justify-center border-2 border-synq-red rounded-full py-2 px-4 space-x-2"
                onPress={handleClick}
              >
                <Text className="text-synq-red text-lg font-bold">
                  Save Profile
                </Text>
                {red_edit}
              </TouchableOpacity>
            </View>

            <View className="flex flex-col justify-center items-center w-full">
              {personalFields.map((personalField, idx) => {
                return (
                  <View className="w-full" key={idx}>
                    <Text className="text-synq-text text-base">
                      {personalField.title}
                    </Text>
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
                      className="text-synq-text border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg mb-4"
                      value={profile[personalField.field_name]}
                      onChangeText={(value) =>
                        handleChange(personalField.field_name, value)
                      }
                    />
                  </View>
                );
              })}
              <TouchableOpacity
                className="flex flex-row items-center justify-center w-full bg-white rounded-lg shadow-lg px-4 py-2 space-x-2"
                onPress={handleLogOut}
              >
                <Image
                  className=""
                  source={require("../../assets/icons/logout.png")}
                />
                <Text className="text-synq-red text-center text-lg font-bold">
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="space-y-4 flex-1 justify-center items-center text-center">
            <Text className="text-2xl text-left font-bold mb-4 w-full border-2">
              Your Card
            </Text>
            <Text className="text-red-500">No profile data found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PersonalEditProfile;
