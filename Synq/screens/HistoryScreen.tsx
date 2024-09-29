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
  checkIdType,
} from "../lib/supabase";
import { PersonalProfile, OrganizationProfile } from "../lib/types";
import { Session } from "@supabase/supabase-js";

const History = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<"personal" | "organization">("personal");
  // const [session, setSessions] = useState(null);
  // const [profile, setProfile] = useState(null);
  const [synqedIds, setSynqedIds] = useState<string[]>([]);
  const [synqedNames, setSynqedNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // setSessions(session);
      fetchProfile(session?.user.id);
    };

    const fetchProfile = async (userId) => {
      try {
        if (await checkIdType(userId)) {
          setType("personal");
          const fetchedProfile = await getPersonalProfile(setLoading, userId);
          console.log(fetchedProfile);
          // setProfile(fetchedProfile);
          setSynqedIds(fetchedProfile.synqed); // choose first 10?
        } else {
          setType("organization");
          const fetchedProfile = await getOrganizationProfile(
            setLoading,
            userId
          );
          console.log(fetchedProfile);
          // setProfile(fetchedProfile);
          setSynqedIds(fetchedProfile.synqed);
        }
      } catch (error) {
        console.error("Error fetching profile history.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchSynqedNames = async () => {
      const names: string[] = [];

      for (const id of synqedIds) {
        if (type === "personal") {
          // get names of orgs personal synqed with
          const orgDetails = await getOrganizationProfile(setLoading, id);
          if (orgDetails) {
            names.push(orgDetails.org_name);
          }
          // get names of people org synqed with
        } else {
          const userDetails = await getPersonalProfile(setLoading, id);
          if (userDetails) {
            names.push(`${userDetails.first_name} ${userDetails.last_name}`);
          }
        }
      }

      setSynqedNames(names);
    };

    if (synqedIds && synqedIds.length > 0) {
      fetchSynqedNames();
    }
  }, [synqedIds]);

  return (
    <View className="flex justify-center items-center h-full w-full p-8 space-y-8">
        <View className="w-full flex-row justify-start">
          <Text className="text-3xl font-bold mb-4">History</Text>
        </View>
        <ScrollView className="w-full">
          {synqedNames.length > 0 ? (
            synqedNames.map((item, index) => 
            <View           
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              // Apply shadow properties
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, // Needed for Android shadow
              marginBottom: 30,
            }}
            className="border border-[#D5D8DE] w-full p-4 rounded-md drop-shadow-lg">
              <View className="flex-row">
                <View className="bg-light-gray p-10 px-10 mr-2"></View>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View>
                    <Text className="text font-semibold text-synq-red" key={index}>{item}</Text>
                    <Text className="text-xs text-synq-text">Time scanned: 1d ago</Text>
                  </View>
                  <View className="bg-synq-blue px-4 py-1 self-end rounded-md">
                    <TouchableOpacity>
                      <Text className="text-white">View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>)
          ) : (
            <Text>You haven't synced with anyone yet!</Text>
          )}
        </ScrollView>
    </View>
  );
};

export default History;
