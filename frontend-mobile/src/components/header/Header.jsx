import { useContext, useState } from "react";
import {
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppContext from "../../context/AppContext";
import { getAvatarUrl } from "../../api/Api";
import HeaderMenu from "./menu/Menu";
import Sider from "../sider/Sider";

const Header = () => {
  const { state, toggleMenu } = useContext(AppContext);
  const [onSearch, setOnSearch] = useState("");
  const [onMenu, setOnMenu] = useState(false);
  const authUser = state?.channel;
  const navigation = useNavigation();
  const avatar = getAvatarUrl(authUser?.avatarUrl);

  console.log(state);

  const handleSearch = () => {
    if (!onSearch) return;
    navigation.navigate("Search", { query: onSearch });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.header,
          state?.theme === "dark" ? styles.dark : styles.light,
        ]}
      >
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.logo}
        >
          <Text style={styles.logoText}>
            My<Text style={styles.tube}>Tube</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            value={onSearch}
            onChangeText={setOnSearch}
            placeholder="Search"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          {authUser && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Upload")}
                style={styles.iconButton}
              >
                <Ionicons name="videocam" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Uplist")}
                style={styles.iconButton}
              >
                <Ionicons name="list" size={26} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <Sider />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,

    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#333",
  },
  light: {
    backgroundColor: "#fff",
  },
  menuIcon: {
    padding: 5,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tube: {
    color: "#f03a0d",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    height: 35,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
  },
  searchButton: {
    paddingHorizontal: 5,
  },
});

export default Header;
