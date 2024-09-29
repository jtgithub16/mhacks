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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getPersonalProfile,
  getOrganizationProfile,
  updatePersonalProfile,
  updateOrganizationProfile,
} from "../lib/supabase";
import { PersonalProfile, OrganizationProfile } from "../lib/types";

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("personal");

  return (
    <View>
      <Text>THIS IS THE PROFILE SCREEN</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Code")}>
        <Text>Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
