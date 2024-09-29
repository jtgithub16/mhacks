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
import OrganizationEditProfile from "./OrganizationEditProfileScreen";
import OrganizationDisplayProfile from "./OrganizationDisplayProfileScreen";

const OrganizationProfileScreen = ({profile, editMode, setEditMode, handleLogOut}) => {
    return (
        <View>
            {
                editMode ? (
                    <OrganizationEditProfile 
                        profile={profile}
                        editMode = {editMode}
                        setEditMode={setEditMode}
                        handleLogOut={handleLogOut}
                        // handlePersonalSubmit={handlePersonalSubmit}
                    />
                ) : (
                    <OrganizationDisplayProfile
                        profile={profile}
                        setEditMode={setEditMode}
                        handleLogOut={handleLogOut}
                    />
                )
            }
        </View>
    );
}
export default OrganizationProfileScreen;
