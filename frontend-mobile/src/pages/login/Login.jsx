import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../context/AppContext";
import { login } from "../../api/Api";

const Login = () => {
  const { state, loginAuth } = useContext(AppContext);
  const [errMessage, setErrMessage] = useState("");
  const [username, setUsername] = useState(""); // For username input
  const [password, setPassword] = useState(""); // For password input

  const navigation = useNavigation();

  useEffect(() => {
    if (state?.auth) {
      navigation.navigate("Home");
    }
  }, [state]);

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setErrMessage("");
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      setErrMessage("Please enter all fields");
      return;
    }
    try {
      const res = await login({ name: username, password: password });
      if (res.status === 200) {
        loginAuth(res.data);
        handleClear();
      }
    } catch (err) {
      setErrMessage(err.response.data);
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[
          styles.wrapper,
          state?.theme === "dark" ? styles.dark : styles.light,
        ]}
      >
        <Text style={styles.heading}>Login</Text>
        {errMessage ? <Text style={styles.errMsg}>{errMessage}</Text> : null}

        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              state?.theme === "dark" ? styles.inputDark : null,
            ]}
            placeholder="Username"
            placeholderTextColor={state?.theme === "dark" ? "#fff" : "#000"}
            value={username}
            onChangeText={setUsername} // Update username state
          />
          <TextInput
            style={[
              styles.input,
              state?.theme === "dark" ? styles.inputDark : null,
            ]}
            placeholder="Password"
            placeholderTextColor={state?.theme === "dark" ? "#fff" : "#000"}
            value={password}
            onChangeText={setPassword} // Update password state
            secureTextEntry
          />
          <Text style={styles.terms}>
            By logging in you are agreeing to our Terms of Services and Privacy
            Policy.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.action}>
            <Text>No Account? Sign up</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}> here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  dark: {
    backgroundColor: "#333",
  },
  light: {
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  errMsg: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    width: "100%",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputDark: {
    color: "#fff",
    borderColor: "#555",
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  link: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
});

export default Login;
