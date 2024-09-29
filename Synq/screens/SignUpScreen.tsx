import React, { useState } from "react";
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
import { supabase } from "../lib/supabase";
import OrganizationSignUp from "./forms/OrganizationSignUp";
import PersonalSignUp from "./forms/PersonalSignUp";

const SignUp = ({ route, navigation }) => {
  const { account } = route.params;
  return (
    <View class-name="p-4 flex-1 justify-center space-y-2">
      {account === "personal" ? (
        <PersonalSignUp navigation={navigation} />
      ) : (
        <OrganizationSignUp navigation={navigation} />
      )}
    </View>
  );
};

export default SignUp;
