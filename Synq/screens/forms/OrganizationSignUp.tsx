import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { OrganizationProfile } from "../../lib/types";
import { organizationSignUp } from "../../lib/supabase";

const OrganizationSignUp = ({ navigation }) => {
  const initialState: OrganizationProfile = {
    organization_id: "", // Required: Provide a default or empty string
    org_name: "", // Required
    website: "", // Required
    email: "", // Required
  };
  const [formData, setFormData] = useState<OrganizationProfile>(initialState);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { email, org_name, website } = formData;
      await organizationSignUp(email, password, org_name, website);
      navigation.navigate("Landing");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder={"Organization Name"}
        value={formData.org_name}
        onChangeText={(value) => handleChange("org_name", value)}
        // style={styles.input}
      />
      <TextInput
        placeholder={"Website"}
        value={formData.website}
        onChangeText={(value) => handleChange("website", value)}
        // style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
        // style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => handlePasswordChange(value)} // Capture password input
        // style={styles.input}
      />
      <Button title={"Submit"} onPress={handleSubmit} />
    </View>
  );
};

export default OrganizationSignUp;
