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

const OrganizationProfileScreen = ({
  profile,
  setProfile,
  editMode,
  setEditMode,
  handleLogOut,
  handleOrganizationSubmit,
}) => {
  const organizationFields = [
    { field_name: "org_name", title: "Organization Name" },
    { field_name: "website", title: "Website" },
    { field_name: "first_name", title: "First Name" },
    { field_name: "last_name", title: "Last Name" },
    { field_name: "number", title: "Number" },
  ];

  return (
    <View className="w-full">
      {editMode ? (
        <OrganizationEditProfile
          profile={profile}
          setProfile={setProfile}
          setEditMode={setEditMode}
          handleLogOut={handleLogOut}
          handleOrganizationSubmit={handleOrganizationSubmit}
          organizationFields={organizationFields}
        />
      ) : (
        <OrganizationDisplayProfile
          profile={profile}
          setEditMode={setEditMode}
          handleLogOut={handleLogOut}
          organizationFields={organizationFields}
        />
      )}
    </View>
  );
};
export default OrganizationProfileScreen;
