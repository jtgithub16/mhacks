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
  checkSessionType,
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

  let userId = "";

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // setSessions(session);
      userId = session?.user.id;
      fetchProfile(session);
    };

    const fetchProfile = async (session) => {
      try {
        if (checkSessionType(session)) {
          setType("personal");
          const fetchedProfile = await getPersonalProfile(setLoading, userId);
          // setProfile(fetchedProfile);
          setSynqedIds(fetchedProfile.synqed); // choose first 10?
        } else {
          setType("organization");
          const fetchedProfile = await getOrganizationProfile(
            setLoading,
            userId
          );
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
          const userDetails = await getPersonalProfile(setLoading, userId);
          if (userDetails) {
            names.push("${userDetails.first_name} ${userDetails.last_name");
          }
        } else {
          const orgDetails = await getOrganizationProfile(setLoading, userId);
          if (orgDetails) {
            names.push(orgDetails.org_name);
          }
        }
      }

      setSynqedNames(names);
    };

    if (synqedIds.length > 0) {
      fetchSynqedNames();
    }
  });

  return (
    <View>
      <Text>Who you've synqed with:</Text>
      <ScrollView>
        {synqedNames.length > 0 ? (
          synqedNames.map((item, index) => <Text key={index}>{item}</Text>)
        ) : (
          <Text>You haven't synced with anyone yet!</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default History;
