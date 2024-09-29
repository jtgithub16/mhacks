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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // setSessions(session);
      setUserId(session?.user.id);
      fetchProfile(session);
    };

    const fetchProfile = async (session) => {
      try {
<<<<<<< Updated upstream
        if (checkIdType(session)) {
=======
        if (checkIdType(userId)) {
>>>>>>> Stashed changes
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
            names.push("${userDetails.first_name} ${userDetails.last_name");
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
