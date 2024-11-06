import React, { useContext, useState } from "react";
import {
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AppContext from "../../context/AppContext";
import { getAvatarUrl } from "../../api/Api";

const Header = () => {
  console.log(Platform.OS);
  const { state, toggleMenu } = useContext(AppContext);
  const [onSearch, setOnSearch] = useState("");
  const [onMenu, setOnMenu] = useState(false);
  const authUser = state?.channel;
  const navigation = useNavigation();

  const avatar = getAvatarUrl(authUser?.avatarUrl);

  const handleSearch = () => {
    if (!onSearch) return;
    navigation.navigate("Search", { query: onSearch });
  };

  return (
    <View
      style={[
        styles.header,
        state?.theme === "dark" ? styles.dark : styles.light,
      ]}
    >
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name="bars" size={24} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.logo}
          >
            <Text>My</Text>
            <Text style={styles.tube}>Tube</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <View style={styles.headerForm}>
            <TextInput
              value={onSearch}
              onChangeText={setOnSearch}
              placeholder="Search"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Icon name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerRight}>
          {authUser && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Upload")}
                style={styles.headerIcon}
              >
                <Icon name="video-camera" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Uplist")}
                style={styles.headerIcon}
              >
                <Icon name="list" size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            onPress={() => setOnMenu(!onMenu)}
            style={styles.headerIcon}
          >
            {authUser ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <Icon name="ellipsis-h" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  header: {
    height: 70,
    width: "100%",
    top: 0,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 50 : 0,
    zIndex: 200,
  },
  dark: {
    backgroundColor: "#222",
  },
  light: {
    backgroundColor: "#fff",
  },
  headerWrapper: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
  },
  tube: {
    color: "#f03a0d",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    marginHorizontal: 20,
    maxWidth: 500,
  },
  headerForm: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchButton: {
    paddingHorizontal: 10,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderLeftWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 10,
    backgroundColor: "rgba(180, 180, 180, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
};

export default Header;
