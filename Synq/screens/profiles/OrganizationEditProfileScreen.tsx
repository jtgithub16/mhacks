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

const OrganizationEditProfile = ({profile, editMode, setEditMode, handleLogOut}) => {
    const [email, setEmail] = useState(profile.email)
    return (
        <View>
            <View className="w-full flex-row justify-start">
                <Text className="text-2xl font-bold mb-4">Your Card</Text>
            </View>
        
            {profile ? (
                // Render fields for personal profile
                <View className="space-y-1 flex-1 justify-center text-center">
                    <Image source={require("../../assets/icons/google.png")} />
                    <Text className="text-xl font-bold mb-4">{profile.first_name} {profile.last_name}</Text>
                    <Text className="text-l mb-4">Student</Text>
                    <TouchableOpacity className="flex-row items-center justify-center border border-red-500 rounded-full px-4 py-2" onPress={() => setEditMode(false)}>
                        <Text className="text-red-500 text-lg font-bold mr-2">Edit Profile</Text>
                    </TouchableOpacity>
        
                    <View className="mb-4">
                    {/* Label */}
                    <Text className="text-gray-700 text-base mb-2">Email Address</Text>
                    {editMode == true ?
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        onSubmitEditing={handlePersonalSubmit} // Submit on Enter
                        editable={editMode} // Control whether the field is editable or not
                        placeholder={profile.email}
                        className={`border border-gray-300 rounded-lg px-3 py-2 ${editMode ? 'bg-white text-black' : 'bg-gray-100 text-gray-600'}`} // Background changes based on editMode
                    /> :
                    <View className="border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
                        <Text className="text-gray-600">{profile.email}</Text>
                    </View>
                    }
        
                    </View>
        
                    <TouchableOpacity className="flex-row items-center justify-center bg-white border border-transparent rounded-lg shadow-lg px-4 py-3" onPress={handleLogOut}>
                        <Text className="text-red-600 text-lg font-bold ml-2">Log Out</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text className="text-red-500">No profile data found</Text>
            )}
        {/* <TouchableOpacity>
            <Text>Edit Profile</Text>
        </TouchableOpacity> */}
    </View>);
}

export default OrganizationEditProfile;
