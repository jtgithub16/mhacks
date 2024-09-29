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

const PersonalDisplayProfile = ({profile, setEditMode, handleLogOut}) => {
    return (
        <View className="flex justify-center items-center h-full w-full p-8 border">
            <View className="flex flex-col justify-center items-center h-full w-full space-y-4 border">
                <Text className="text-2xl text-left font-bold mb-4 w-full border-2">Your Card</Text>
                <Image style={{width: 75, height: 75, borderRadius: 99999}} source={require("../../assets/icons/google.png")} />

        
                {profile ? (
                    // Render fields for personal profile
                    <View className="space-y-1 flex-1 justify-center text-center">
                        <Text className="text-xl font-bold mb-4">{profile.first_name} {profile.last_name}</Text>
                        <Text className="text-l mb-4">Student</Text>
                        <TouchableOpacity className="flex-row items-center justify-center border border-red-500 rounded-full px-4 py-2" onPress={() => setEditMode(true)}>
                            <Text className="text-red-500 text-lg font-bold mr-2">Edit Profile</Text>
                        </TouchableOpacity>
            
                        <View className="mb-4">
                            {/* Label */}
                            <Text className="text-gray-700 text-base mb-2">Email Address</Text>

                            <View className="border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
                                <Text className="text-gray-600">{profile.email}</Text>
                            </View>
                        </View>
            
                        <TouchableOpacity className="flex-row items-center justify-center bg-white border border-transparent rounded-lg shadow-lg px-4 py-3" onPress={handleLogOut}>
                        <Text className="text-red-600 text-lg font-bold ml-2">Log Out</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text className="text-red-500">No profile data found</Text>
                )}
        </View>
    </View>);
}
export default PersonalDisplayProfile;
