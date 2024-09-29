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
import PersonalDisplayProfile from "./PersonalDisplayProfileScreen";
import PersonalEditProfile from "./PersonalEditProfileScreen";

const PersonalProfileScreen = ({profile, editMode, setEditMode, handleLogOut,  handlePersonalSubmit, setEmail}) => {
    useEffect(() => {

    },[editMode]);
    return (
        <View className="w-full">
            {
                editMode ? (
                    <PersonalEditProfile 
                        profile={profile}
                        editMode = {editMode}
                        setEditMode={setEditMode}
                        handleLogOut={handleLogOut}
                        handlePersonalSubmit={handlePersonalSubmit}
                    />
                ) : (
                    <PersonalDisplayProfile
                        profile={profile}
                        setEditMode={setEditMode}
                        handleLogOut={handleLogOut}
                    />
                )
            }
        </View>
    );
}
export default PersonalProfileScreen;
