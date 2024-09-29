import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { PersonalProfile } from "../../lib/types";
import { personalSignUp } from "../../lib/supabase";

const PersonalSignup = ({ navigation }) => {
  const initialState: PersonalProfile = {
    personal_id: "", // Required: Provide a default or empty string
    first_name: "", // Required
    last_name: "", // Required
    email: "", // Required
  };
  const [formData, setFormData] = useState<PersonalProfile>(initialState);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { email, first_name, last_name } = formData;
      await personalSignUp(email, password, first_name, last_name);
      navigation.navigate("Landing");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View className="p-20">
      <TextInput
        placeholder={"First"}
        value={formData.first_name}
        onChangeText={(value) => handleChange("first_name", value)}
        // style={styles.input}
      />
      <TextInput
        placeholder={"Last"}
        value={formData.last_name}
        onChangeText={(value) => handleChange("last_name", value)}
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

export default PersonalSignup;
