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
import { useNavigation } from "@react-navigation/native";
import {
  supabase,
  getPersonalProfile,
  getOrganizationProfile,
  updatePersonalProfile,
  updateOrganizationProfile,
  checkIdType,
  logout,
} from "../lib/supabase";
import { PersonalProfile, OrganizationProfile } from "../lib/types";
import PersonalProfileScreen from "./profiles/PersonalProfileScreen";
import OrganizationProfileScreen from "./profiles/OrganizationProfileScreen";
import { Session } from "@supabase/supabase-js";

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<"personal" | "organization">("personal");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleLogOut = async () => {
    const success = await logout();
    if (success) {
      console.log("succesfully logged out");
      navigation.navigate("Welcome");
    }
  };

  const handlePersonalSubmit = async () => {
    setEditMode(!editMode);
    updatePersonalProfile(setLoading, session, profile);
  };

  const handleOrganizationSubmit = async () => {
    setEditMode(!editMode);
    updateOrganizationProfile(setLoading, session, profile);
  };

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

        const sessionType = await checkIdType(data.session?.user.id);
        // Fetch appropriate profile based on session type
        if (sessionType) {
          setType("personal");
          const fetchedProfile = await getPersonalProfile(
            setLoading,
            data.session?.user.id
          );
          console.log(fetchedProfile);
          setProfile(fetchedProfile);
        } else {
          setType("organization");
          const fetchedProfile = await getOrganizationProfile(
            setLoading,
            data.session?.user.id
          );
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
    <View className="flex justify-center items-center w-full ">
      {loading ? (
        <Text>Loading...</Text>
      ) : type === "personal" ? (
        <PersonalProfileScreen
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
          setEditMode={setEditMode}
          handleLogOut={handleLogOut}
          handlePersonalSubmit={handlePersonalSubmit}
        />
      ) : (
        <OrganizationProfileScreen
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
          setEditMode={setEditMode}
          handleLogOut={handleLogOut}
          handleOrganizationSubmit={handleOrganizationSubmit}
        />
      )}
    </View>
  );
};

export default Profile;
