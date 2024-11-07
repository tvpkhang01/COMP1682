import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../context/AppContext";
import { FontAwesome5 } from "react-native-vector-icons";

const Sider = () => {
  const { state, toggleTheme, toggleMenu } = useContext(AppContext);
  const authUser = state?.auth;
  const navigation = useNavigation();

  const handleNavigation = (route) => {
    toggleMenu();
    navigation.navigate(route);
  };

  return (
    <Modal visible={state?.onMenu} transparent animationType="none">
      <TouchableOpacity
        style={styles.overlay}
        onPress={toggleMenu}
        activeOpacity={1}
      >
        <View
          style={[
            styles.sider,
            state?.onMenu && styles.active,
            state?.theme === "dark" ? styles.dark : styles.light,
          ]}
        >
          <View style={[styles.siderWrapper]}>
            <TouchableOpacity
              onPress={() => handleNavigation("Home")}
              style={styles.link}
            >
              <FontAwesome5 name="home" size={20} style={styles.icon} />
              <Text style={styles.text}>Home Page</Text>
            </TouchableOpacity>

            {authUser && (
              <>
                <View style={styles.separator} />
                <TouchableOpacity
                  onPress={() => handleNavigation("Channel")}
                  style={styles.link}
                >
                  <FontAwesome5
                    name="play-circle"
                    size={20}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>My Channel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleNavigation("Settings")}
                  style={styles.link}
                >
                  <FontAwesome5 name="cog" size={20} style={styles.icon} />
                  <Text style={styles.text}>Settings</Text>
                </TouchableOpacity>
              </>
            )}

            {!authUser && (
              <>
                <View style={styles.separator} />
                <TouchableOpacity
                  onPress={() => handleNavigation("Login")}
                  style={styles.authButton}
                >
                  <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.separator} />

            <TouchableOpacity onPress={toggleTheme} style={styles.link}>
              <FontAwesome5 name="adjust" size={20} style={styles.icon} />
              <Text style={styles.text}>
                {state?.theme == "dark" ? "Light mode" : "Dark mode"}
              </Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <View style={styles.terms}>
              <Text style={styles.termText}>Term and Services</Text>
              <Text style={styles.termText}>Privacy Policy and Safety</Text>
              <Text style={styles.rights}>
                Truong Van Phuc Khang Final Year Project © 2024 copyright all
                rights and reserved.
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay when menu is open
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sider: {
    width: "70%", // Width of the sidebar
    backgroundColor: "#fff",
    height: "100%",
    transform: [{ translateX: -300 }], // Start off-screen to the left
    zIndex: 100,
  },
  active: {
    transform: [{ translateX: 0 }], // Slide in effect
  },
  siderWrapper: {
    padding: 20,
  },
  dark: {
    backgroundColor: "#333",
  },
  light: {
    backgroundColor: "#fff",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    color: "#333",
  },
  authButton: {
    backgroundColor: "#8b0000",
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  terms: {
    marginTop: 20,
  },
  termText: {
    fontSize: 12,
    color: "#666",
  },
  rights: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
  },
});

export default Sider;
