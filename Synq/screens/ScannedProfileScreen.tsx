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
  checkIdType,
} from "../lib/supabase";
import { PersonalProfile, OrganizationProfile } from "../lib/types";
import { Session } from "@supabase/supabase-js";

const Profile = ({ route, navigation }) => {
  const { accountId } = route.params;
  console.log(accountId);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState(null);
  const [type, setType] = useState<"personal" | "organization">("personal");
  // const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // setSessions(session);
      fetchProfile(session);
    };

    const fetchProfile = async (accountId) => {
      try {
        // Attempt to fetch personal profile
        const fetchedProfile = await getPersonalProfile(setLoading, accountId);

        // If successful, update state
        if (fetchedProfile) {
          console.log(fetchedProfile);
          setProfile(fetchedProfile);
          setType("personal");
        } else {
          // If not successful, attempt to fetch organization profile
          const fetchedOrgProfile = await getOrganizationProfile(
            setLoading,
            accountId
          );

          if (fetchedOrgProfile) {
            console.log(fetchedOrgProfile);
            setProfile(fetchedOrgProfile);
            setType("organization");
          }
        }
      } catch (error) {
        console.error("Error fetching profile history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-2xl font-bold mb-4">Profile Information</Text>

      {profile ? (
        type === "personal" ? (
          // Render fields for personal profile
          <View className="space-y-2">
            <Text className="text-lg">First Name: {profile.first_name}</Text>
            <Text className="text-lg">Last Name: {profile.last_name}</Text>
            <Text className="text-lg">Email: {profile.email}</Text>
          </View>
        ) : (
          // Render fields for organization profile
          <View className="space-y-2">
            <Text className="text-lg">
              Organization Name: {profile.organization_name}
            </Text>
            <Text className="text-lg">
              Contact Person: {profile.contact_person}
            </Text>
            <Text className="text-lg">Email: {profile.email}</Text>
          </View>
        )
      ) : (
        <Text className="text-red-500">No profile data found</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Code")}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <Text>id: {accountId}</Text>
    </View>
  );
};

export default Profile;
