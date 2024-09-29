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
import { Session } from "@supabase/supabase-js";

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<"personal" | "organization">("personal");
  const [session, setSession] = useState(null);
  const [toRender, setToRender] = useState({});
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogOut = async () => {
    const success = await logout()
    if(success){  
      console.log("succesfully logged out")
      navigation.navigate("Welcome")
    }
  };
  const handleEdit = () => {
    setEmail(email);
    setEditMode(!editMode);
  }
  const handleEmail = () => {
    setEmail(email);
  }

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
          const fetchedProfile = await getPersonalProfile(setLoading, data.session?.user.id);
          console.log(fetchedProfile);
          setProfile(fetchedProfile);
          setEmail(email);
        } else {
          setType("organization");
          const fetchedProfile = await getOrganizationProfile(setLoading, data.session?.user.id);
          setProfile(fetchedProfile);
          setEmail(email);
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
    <View className="flex-1 justify-center items-center p-20">
     <View className="w-full flex-row justify-start">
        <Text className="text-2xl font-bold mb-4">Your Card</Text>
     </View>

      {profile ? (
        type === "personal" ? (
          // Render fields for personal profile
          <View className="space-y-1 flex-1 justify-center text-center">
            <Image source={require("../assets/icons/google.png")} />
            <Text className="text-xl font-bold mb-4">{profile.first_name} {profile.last_name}</Text>
            <Text className="text-l mb-4">Student</Text>
            <TouchableOpacity className="flex-row items-center justify-center border border-red-500 rounded-full px-4 py-2" onPress={handleEdit}>
                <Text className="text-red-500 text-lg font-bold mr-2">Edit Profile</Text>
            </TouchableOpacity>

            <View className="mb-4">
              {/* Label */}
              <Text className="text-gray-700 text-base mb-2">Email Address</Text>
              {editMode == true ? 
              <TextInput
                value={email}
                onChange={handleEmail}
                onSubmitEditing={handleEdit} // Submit on Enter
                editable={editMode} // Control whether the field is editable or not
                placeholder={profile.email}
                className={`border border-gray-300 rounded-lg px-3 py-2 ${editMode ? 'bg-white text-black' : 'bg-gray-100 text-gray-600'}`} // Background changes based on editMode
              /> :
              <View className="border border-gray-300 rounded-lg bg-gray-100 px-3 py-2">
                <Text className="text-gray-600">{profile.email}</Text>
              </View>
              } 
   
            </View>

            <TouchableOpacity className="flex-row items-center justify-center bg-white border border-transparent rounded-lg shadow-lg px-4 py-3" onPress={handleLogOut}>
              <Text className="text-red-600 text-lg font-bold ml-2">Log Out</Text>
            </TouchableOpacity>
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
      <TouchableOpacity>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
