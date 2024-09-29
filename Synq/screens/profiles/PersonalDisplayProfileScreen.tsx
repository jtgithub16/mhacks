import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

const PersonalDisplayProfile = ({profile, setEditMode, handleLogOut}) => {
    const personalFields = [
        {field_name: "first_name", title: "First Name"},
        {field_name: "last_name", title: "Last Name"},
        {field_name: "number", title: "Number"},
        {field_name: "citizenship", title: "Citizenship"},
    ]

    return (
        <SafeAreaView className="flex justify-center items-center h-full w-full">
            <ScrollView 
                contentContainerStyle={{justifyContent: "center", alignItems: "center", width: "100%", display: "flex", flexDirection: "column"}}
                // className="flex flex-col justify-center items-center h-full w-full"
            >
                {profile ? (
                    // Render fields for personal profile
                    <View className="flex justify-center items-center text-center space-y-8 w-full mb-12">
                        <Text className="text-2xl text-left font-bold w-full">Your Card</Text>
                        <View className="flex flex-col justify-center items-center">
                            <View className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-full mb-4"/>
                            <Text className="text-xl font-bold">{profile.email}</Text>
                            <Text className="text-lg mb-4">Student</Text>
                            <TouchableOpacity className="flex-row items-center justify-center border border-synq-red rounded-full py-2 px-4 space-x-2" onPress={() => setEditMode(true)}>
                                <Text className="text-synq-red text-lg font-bold">Edit Profile</Text>
                                <Image source={require("../../assets/icons/edit.png")} />
                            </TouchableOpacity>
                        </View>

                        <View className="flex flex-col justify-center items-center w-full border">
                            {
                                personalFields.map((personalField, idx) => {
                                    return (
                                        <View className="w-full border" key={idx}>
                                            <Text className="text-[#424242] text-base">{personalField.title}</Text>
                                            <Text 
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
                                                className="border border-[#D5D8DE] text-[#424242] w-full p-4 rounded-md drop-shadow-lg"
                                            >{profile[personalField.field_name]}</Text>
                                        </View>
                                    )
                                })
                            }
                            <TouchableOpacity className="flex flex-row items-center justify-center w-full bg-white rounded-lg shadow-lg px-4 py-2 space-x-2" onPress={handleLogOut}>
                                <Image 
                                    className="border"
                                    source={require("../../assets/icons/edit.png")} />
                                <Text className="text-synq-red text-center text-lg font-bold">Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="space-y-4 flex-1 justify-center items-center text-center">
                        <Text className="text-2xl text-left font-bold mb-4 w-full border-2">Your Card</Text>
                        <Text className="text-red-500">No profile data found</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
export default PersonalDisplayProfile;
