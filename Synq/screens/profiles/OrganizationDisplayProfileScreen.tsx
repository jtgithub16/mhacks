import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";

const OrganizationDisplayProfile = ({
  profile,
  setEditMode,
  handleLogOut,
  organizationFields,
}) => {
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
              <Text className="text-lg mb-4">Organization</Text>
              <TouchableOpacity
                className="flex-row items-center justify-center border border-synq-red rounded-full py-2 px-4 space-x-2"
                onPress={() => setEditMode(true)}
              >
                <Text className="bg-synq-red text-lg font-bold">
                  Edit Profile
                </Text>
                <Image source={require("../../assets/icons/edit.png")} />
              </TouchableOpacity>
            </View>

            <View className="flex flex-col justify-center items-center w-full">
              {organizationFields.map((organizationField, idx) => {
                return (
                  <View className="w-full mb-4" key={idx}>
                    <Text className="text-synq-text text-base">
                      {organizationField.title}
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
                      className="text-synq-text border text-[#424242] w-full p-4 rounded-md drop-shadow-lg"
                      value={profile[organizationField.field_name]}
                      editable={false}
                    />
                  </View>
                );
              })}
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
                className="flex flex-row items-center justify-center w-full bg-white rounded-lg shadow-lg px-4 py-2 space-x-2 mt-8"
                onPress={handleLogOut}
              >
                <Image
                  className=""
                  source={require("../../assets/icons/edit.png")}
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
export default OrganizationDisplayProfile;
