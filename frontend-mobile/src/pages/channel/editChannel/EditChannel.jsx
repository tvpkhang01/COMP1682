import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { uploadBanner, uploadAvatar, updateChannel } from "../../../api/Api";
import AppContext from "../../../context/AppContext";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const EditChannel = ({ user, setUser, open, onClose }) => {
  const navigation = useNavigation();
  const { state, logoutAuth } = useContext(AppContext);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [channel, setChannel] = useState({
    name: user ? user.name : "",
    description: user ? user.description : "",
  });

  const handleCancel = () => {
    clearInputs();
    onClose(false);
  };

  const clearInputs = () => {
    setBanner(null);
    setAvatar(null);
    setChannel({ name: "", description: "" });
  };

  const handleBanner = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setBanner(result.uri);
    }
  };

  const handleAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const bannerUrl = await addBanner();
      const avatarUrl = await addAvatar();

      const data = {
        bannerUrl: bannerUrl || user.bannerUrl,
        avatarUrl: avatarUrl || user.avatarUrl,
        name: channel.name,
        description: channel.description,
      };

      const res = await updateChannel(user._id, data);
      if (res.status === 200) {
        setUser(res.data);
        clearInputs();
        onClose(false);
      }
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        Alert.alert("Unauthorized", "Please log in again.");
        logoutAuth();
        navigation.navigate("Login");
      }
    }
  };

  const addBanner = async () => {
    if (!banner) return;
    try {
      const formData = new FormData();
      const filename = `${Date.now()}-banner.jpg`;
      formData.append("filename", filename);
      formData.append("file", {
        uri: banner,
        type: "image/jpeg",
        name: filename,
      });

      const res = await uploadBanner(formData);
      if (res.status === 200) {
        return filename;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addAvatar = async () => {
    if (!avatar) return;
    try {
      const formData = new FormData();
      const filename = `${Date.now()}-avatar.jpg`;
      formData.append("filename", filename);
      formData.append("file", {
        uri: avatar,
        type: "image/jpeg",
        name: filename,
      });

      const res = await uploadAvatar(formData);
      if (res.status === 200) {
        return filename;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal visible={open} transparent animationType="slide">
      <View style={styles.container}>
        <View style={[styles.wrapper, state?.theme === "dark" && styles.dark]}>
          <TouchableOpacity onPress={handleBanner} style={styles.banner}>
            <Image
              source={
                banner
                  ? { uri: banner }
                  : require("../../../assets/channelBanner.png")
              }
              style={styles.bannerImage}
            />
          </TouchableOpacity>
          <View style={styles.infos}>
            <TouchableOpacity
              onPress={handleAvatar}
              style={styles.avatarWrapper}
            >
              <Image
                source={
                  avatar
                    ? { uri: avatar }
                    : require("../../../assets/avatar.png")
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.details}>
              <TextInput
                style={styles.input}
                value={channel.name}
                onChangeText={(text) => setChannel({ ...channel, name: text })}
                placeholder="Channel Name"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={channel.description}
                onChangeText={(text) =>
                  setChannel({ ...channel, description: text })
                }
                placeholder="Channel Description"
                multiline
              />
              <View style={styles.actions}>
                <Button title="Cancel" onPress={handleCancel} color="#333" />
                <Button title="Save" onPress={handleSubmit} color="#d9534f" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  dark: {
    backgroundColor: "#333",
  },
  banner: {
    height: 230,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  bannerImage: {
    height: "100%",
    width: "100%",
  },
  infos: {
    flexDirection: "row",
  },
  avatarWrapper: {
    marginRight: 15,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  details: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditChannel;
