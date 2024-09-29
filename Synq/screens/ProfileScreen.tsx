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
  supabase,
  getPersonalProfile,
  getOrganizationProfile,
  updatePersonalProfile,
  updateOrganizationProfile,
  checkSessionType,
} from "../lib/supabase";
import { PersonalProfile, OrganizationProfile } from "../lib/types";
import { Session } from "@supabase/supabase-js";

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<"personal" | "organization">("personal");
  const [session, setSessions] = useState(null);
  const [toRender, setToRender] = useState({});
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const tempSession = supabase.auth.getSession();
    setSessions(tempSession);
    const fetchProfile = async (profiletype) => {
      if (profiletype === "personal") {
        const fetchedProfile = await getPersonalProfile(setLoading, session); // Await the profile
        setProfile(fetchedProfile);
      } else {
        const fetchedProfile = await getOrganizationProfile(
          setLoading,
          session
        ); // Await the profile
        setProfile(fetchedProfile);
      }
    };

    try {
      if (checkSessionType(session)) {
        //1 = personal, 0 = organization
        //personal
        setType("personal");
        fetchProfile("personal");
      } else {
        //organization
        setType("organization");
        fetchProfile("organization");
      }
    } catch (e) {
      console.error("error fetching session information", e);
    }

    setLoading(false);
  }, [session]);

  return (
    <View class-name="flex-1 justify-center items-center px-4">
      <Text class-name="text-2xl font-bold mb-4">Profile Information</Text>

      {profile ? (
        type === "personal" ? (
          // Render fields for personal profile
          <View class-name="space-y-2">
            <Text class-name="text-lg">First Name: {profile.first_name}</Text>
            <Text class-name="text-lg">Last Name: {profile.last_name}</Text>
            <Text class-name="text-lg">Email: {profile.email}</Text>
          </View>
        ) : (
          // Render fields for organization profile
          <View class-name="space-y-2">
            <Text class-name="text-lg">
              Organization Name: {profile.organization_name}
            </Text>
            <Text class-name="text-lg">
              Contact Person: {profile.contact_person}
            </Text>
            <Text class-name="text-lg">Email: {profile.email}</Text>
          </View>
        )
      ) : (
        <Text class-name="text-red-500">No profile data found</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Code")}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
