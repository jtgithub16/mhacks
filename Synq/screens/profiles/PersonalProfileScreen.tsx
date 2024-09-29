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

const PersonalProfileScreen = ({
  profile,
  setProfile,
  editMode,
  setEditMode,
  handleLogOut,
  handlePersonalSubmit,
}) => {
  const personalFields = [
    { field_name: "first_name", title: "First Name" },
    { field_name: "last_name", title: "Last Name" },
    { field_name: "number", title: "Number" },
    { field_name: "citizenship", title: "Citizenship" },
  ];

  return (
    <View className="w-full">
      {editMode ? (
        <PersonalEditProfile
          profile={profile}
          setProfile={setProfile}
          setEditMode={setEditMode}
          handleLogOut={handleLogOut}
          handlePersonalSubmit={handlePersonalSubmit}
          personalFields={personalFields}
        />
      ) : (
        <PersonalDisplayProfile
          profile={profile}
          setEditMode={setEditMode}
          handleLogOut={handleLogOut}
          personalFields={personalFields}
        />
      )}
    </View>
  );
};
export default PersonalProfileScreen;
