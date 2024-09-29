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
import { white_close, mail, call } from "../lib/svg";

const Profile = ({ route, navigation }) => {
  const { accountId } = route.params;
  //const qrcodeId = route.params?.qrid ? parseInt(route.params.qrid, 10) : null;
  console.log(accountId);
  const [loading, setLoading] = useState<boolean>(false);
  const [scannedProfile, setScannedProfile] = useState(null); // profile of scanned code
  const [scannedType, setScannedType] = useState<"personal" | "organization">(
    "personal"
  ); // account type of scanned code
  const [userId, setUserId] = useState("");
  const [session, setSession] = useState(null);

  const organizationFields = [
    { field_name: "email", title: "Organization Email" },
    { field_name: "website", title: "Website" },
    { field_name: "Description", title: "Description" },
    { field_name: "number", title: "Number" },
  ];

  const personalFields = [
    { field_name: "first_name", title: "First Name" },
    { field_name: "last_name", title: "Last Name" },
    { field_name: "email", title: "Email" },
    { field_name: "number", title: "Number" },
    { field_name: "citizenship", title: "Citizenship" },
  ];

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
          console.log("personal profile", fetchedProfile);
          setScannedProfile(fetchedProfile);
        } else {
          setScannedType("organization");
          const fetchedProfile = await getOrganizationProfile(
            setLoading,
            accountId
          );
          console.log("organization profile", fetchedProfile);
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
        const updatedOrgProfile = await synqOrganizationProfile({
          setLoading,
          session,
          accountId,
          userId,
        });
        Alert.alert("Success", "Successfully synced boths users.");
      } else {
        const updatedPersonProfile = await synqPersonalProfile({
          setLoading,
          session,
          accountId,
          userId,
        });
        Alert.alert("Success", "Successfully synced boths users.");
      }
    } catch (error) {
      console.error("Error updating synced list:", error);
      Alert.alert("Error", "Could not sync. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex justify-center items-center h-full w-full">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
        className="w-full p-8 mt-24 bg-synq-blue "
      >
        <View className="flex flex-row items-center mb-12">
          <TouchableOpacity
            className="absolute z-50"
            onPress={() => navigation.navigate("Landing")}
          >
            {white_close}
          </TouchableOpacity>
          <Text className="text-3xl text-center text-white font-bold w-full">
            Scanned Card
          </Text>
        </View>
        {scannedProfile ? (
          scannedType === "personal" ? (
            // Render fields for personal profile
            <View className="flex justify-center items-center text-center space-y-8 w-full mb-12">
              <View className="flex flex-col justify-center items-center space-y-2">
                <View className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-full mb-4" />
                <Text className="text-xl font-bold text-white">
                  {scannedProfile.email}
                </Text>
                <Text className="text-lg text-white mb-4">Student</Text>
              </View>
              <View className="flex flex-col justify-center items-center w-full">
                {personalFields.map((personalField, idx) => {
                  return (
                    <View className="w-full" key={idx}>
                      {personalField.title !== "First Name" &&
                      personalField.title !== "Last Name" ? (
                        <View>
                          <Text className="text-white text-base mb-2 text-bold">
                            {personalField.title}
                          </Text>
                          <View className="flex align-center flex-row">
                            {personalField.title === "Email" ? (
                              <Text>{mail} </Text>
                            ) : null}
                            {personalField.title === "Number" ? (
                              <Text>{call} </Text>
                            ) : null}
                            <Text className="text-white mb-2">
                              {scannedProfile[personalField.field_name]}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                      {/* <TextInput
                        style={{
                          borderRadius: 10,
                          // Apply shadow properties
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5, // Needed for Android shadow
                        }}
                        className="text-white border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg mb-4"
                        value={scannedProfile[personalField.field_name]}
                        onChangeText={(value) =>
                          handleChange(personalField.field_name, value)
                        }
                      /> */}
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            // Render fields for organization profile
            <View className="flex justify-center items-center text-center space-y-8 w-full mb-12">
              <View className="flex flex-col justify-center items-center space-y-2">
                <View className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-full mb-4" />
                <Text className="text-xl font-bold text-white">
                  {scannedProfile.org_name}
                </Text>
                <Text className="text-lg text-white mb-4">Organization</Text>
              </View>
              <View className="flex flex-col justify-center items-center w-full">
                {organizationFields.map((organizationField, idx) => {
                  return (
                    <View className="w-full" key={idx}>
                      <Text className="text-white text-base mb-2">
                        {organizationField.title}
                      </Text>
                      {scannedProfile[organizationField.field_name] === null ? (
                        <Text className="text-white mb-2">Nothing listed</Text>
                      ) : (
                        <Text className="text-white mb-2">
                          {"   "}
                          {scannedProfile[organizationField.field_name]}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          )
        ) : (
          <Text className="text-red-500">No profile data found</Text>
        )}
        <TouchableOpacity
          className="shadow rounded-full bg-white p-1 w-40 mb-24"
          onPress={handleSynq}
        >
          <Text className="text-2xl text-center">Synq</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
