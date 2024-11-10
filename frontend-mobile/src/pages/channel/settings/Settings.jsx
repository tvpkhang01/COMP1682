import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppContext from "../../../context/AppContext";
import { updateChannel } from "../../../api/Api";

const Settings = () => {
  const route = useRoute();
  const { id } = route.params; // Extract the user ID from route params
  const { state, logoutAuth } = useContext(AppContext);
  const authUser = state?.auth;
  const navigation = useNavigation();

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authUser) {
      Alert.alert("Error", "You must login first", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } else if (authUser.id !== id) {
      Alert.alert("Error", "You don't have permission to access this page", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    }
  }, [authUser, id, navigation]);

  const handleChange = (name, value) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await updateChannel(id, { password: passwords.newPassword });
      if (res.status === 200) {
        Alert.alert("Success", "Password updated successfully", [
          {
            text: "OK",
            onPress: () => logoutAuth() && navigation.navigate("Login"),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.settings}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.form}>
        <Text style={styles.subtitle}>Change Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="New Password"
          value={passwords.newPassword}
          onChangeText={(value) => handleChange("newPassword", value)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
        <Button
          title={loading ? "Updating..." : "Update Password"}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  coinText: {
    fontSize: 18,
    marginBottom: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Settings;
