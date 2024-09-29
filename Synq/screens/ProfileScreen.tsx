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
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<"personal" | "organization">("personal");
  const [session, setSession] = useState(null);
  const [toRender, setToRender] = useState({});
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        
        // Fetch session asynchronously
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error retrieving session:", error);
          return;
        }

        setSession(data.session);

        if (!data.session) {
          console.error("No active session found");
          return;
        }

        const sessionType = checkSessionType(data.session);

        // Fetch appropriate profile based on session type
        if (sessionType) {
          setType("personal");
          const fetchedProfile = await getPersonalProfile(setLoading, data.session);
          console.log(fetchedProfile);
          setProfile(fetchedProfile);
        } else {
          setType("organization");
          const fetchedProfile = await getOrganizationProfile(setLoading, data.session);
          setProfile(fetchedProfile);
        }
      } catch (e) {
        console.error("Error fetching session information:", e);
      } finally {
        setLoading(false); // Set loading to false after the process
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
    </View>
  );
};

export default Profile;
