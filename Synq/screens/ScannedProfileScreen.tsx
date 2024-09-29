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
  synqPersonalProfile,
  synqOrganizationProfile,
  checkIdType,
} from "../lib/supabase";
import { PersonalProfile, OrganizationProfile } from "../lib/types";
import { Session } from "@supabase/supabase-js";

const Profile = ({ route, navigation }) => {
  const { accountId } = route.params;
  console.log(accountId);
  const [loading, setLoading] = useState<boolean>(false);
  const [scannedProfile, setScannedProfile] = useState(null); // profile of scanned code
  const [scannedType, setScannedType] = useState<"personal" | "organization">("personal"); // account type of scanned code
  const [userId, setUserId] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        setUserId(session.user.id);
        fetchScannedProfile();
      }
    };

    const fetchScannedProfile = async () => {
      try {
        const accountType = await checkIdType(accountId);
        // Fetch appropriate profile based on session type
        if (accountType) {
          setScannedType("personal");
          const fetchedProfile = await getPersonalProfile(
            setLoading,
            accountId
          );
          console.log(fetchedProfile);
          setScannedProfile(fetchedProfile);
        } else {
          setScannedType("organization");
          const fetchedProfile = await getOrganizationProfile(
            setLoading,
            accountId
          );
          setScannedProfile(fetchedProfile);
        }
      } catch (error) {
        console.error("Error fetching scanned profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const handleSynq = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found.");
      return;
    }

    setLoading(true);
    try {
      if (scannedType === "personal") {
        // Update the organization profile's synqed list
        const updatedProfile = await synqOrganizationProfile({
          setLoading,
          session,
          accountId,
          userId,
        });
        
        Alert.alert("Success", "Successfully synced with the user.");
      } else {
        // Update the personal profile's synqed list
        const updatedProfile = await synqPersonalProfile({
          setLoading,
          session,
          accountId,
          userId,
        });
        Alert.alert("Success", "Successfully synced with the organization.");
      }
    } catch (error) {
      console.error("Error updating synced list:", error);
      Alert.alert("Error", "Could not sync. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-4 relative space-y-4">
      <TouchableOpacity
        className=""
        onPress={() => navigation.navigate("Landing")}
      >
        <Image
          className="h-8 w-8"
          source={require("../assets/icons/close.png")}
        />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-4">Profile </Text>

      {scannedProfile ? (
        scannedType === "personal" ? (
          // Render fields for personal profile
          <View className="space-y-2">
            <Text className="text-lg">First Name: {scannedProfile.first_name}</Text>
            <Text className="text-lg">Last Name: {scannedProfile.last_name}</Text>
            <Text className="text-lg">Email: {scannedProfile.email}</Text>
          </View>
        ) : (
          // Render fields for organization profile
          <View className="space-y-2">
            <Text className="text-lg">
              Organization Name: {scannedProfile.organization_name}
            </Text>
            <Text className="text-lg">
              Contact Person: {scannedProfile.contact_person}
            </Text>
            <Text className="text-lg">Email: {scannedProfile.email}</Text>
          </View>
        )
      ) : (
        <Text className="text-red-500">No profile data found</Text>
      )}
      <Text>id: {accountId}</Text>
      <TouchableOpacity
        className="shadow rounded-full bg-white p-1 w-40"
        onPress={handleSynq}
      >
        <Text className="text-2xl text-center">Synq</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
