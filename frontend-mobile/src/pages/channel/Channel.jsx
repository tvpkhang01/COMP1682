import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import EditChannel from "./editChannel/EditChannel";
import AppContext from "../../context/AppContext";
import {
  getChannel,
  getAvatarUrl,
  getBannerUrl,
  subscribeChannel,
  unsubscribeChannel,
} from "../../api/Api";
import ChannelVideos from "./videos/ChannelVideos";
import avatarImg from "../../assets/avatar.png";
import channelBanner from "../../assets/channelBanner.png";

const Channel = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  
  const { state, logoutAuth } = useContext(AppContext);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const authUser = state?.channel;

  useEffect(() => {
    loadCurrentChannel();
  }, [id, authUser]);

  const loadCurrentChannel = async () => {
    if (!id) return;
    try {
      if (id === authUser?._id) {
        setCurrentChannel(authUser);
        return;
      }
      const res = await getChannel(id);
      if (res.status === 200) {
        setCurrentChannel(res.data);
        setSubStatus(authUser && res.data.subscribers.includes(authUser._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubscribe = async () => {
    if (!currentChannel || !authUser) return;
    try {
      if (!subStatus) {
        const res = await subscribeChannel(currentChannel._id);
        if (res.status === 200) setSubStatus(true);
      } else {
        const res = await unsubscribeChannel(currentChannel._id);
        if (res.status === 200) setSubStatus(false);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        Alert.alert("Unauthorized", "Please log in again.");
        logoutAuth();
        navigation.navigate("Login");
      }
    }
  };

  const handleAdminPage = () => {
    navigation.navigate("Admin");
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Image
        source={
          currentChannel
            ? { uri: getBannerUrl(currentChannel.bannerUrl) }
            : channelBanner
        }
        style={styles.banner}
      />
      <View style={styles.infos}>
        <Image
          source={
            currentChannel
              ? { uri: getAvatarUrl(currentChannel.avatarUrl) }
              : avatarImg
          }
          style={styles.avatar}
        />
        <View style={styles.details}>
          <Text style={styles.channelName}>{currentChannel?.name}</Text>
          <Text style={styles.stats}>
            {`${currentChannel?.subscribers.length || 0} ${
              currentChannel?.subscribers.length === 1
                ? "subscriber"
                : "subscribers"
            }, ${currentChannel?.videos.length || 0} ${
              currentChannel?.videos.length === 1 ? "video" : "videos"
            }`}
          </Text>
          <Text style={styles.desc}>{currentChannel?.description}</Text>
          {authUser && currentChannel?._id === authUser?._id ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOnEdit(true)}
            >
              <Text style={styles.buttonText}>Edit Channel</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
              <Text style={styles.buttonText}>
                {subStatus ? "Unsubscribe" : "Subscribe"}
              </Text>
            </TouchableOpacity>
          )}
          {authUser && currentChannel?.admin && (
            <TouchableOpacity style={styles.button} onPress={handleAdminPage}>
              <Text style={styles.buttonText}>Admin Page</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.tabWrapper}>
        <TouchableOpacity
          style={[styles.tabItem, tabIndex === 0 && styles.activeTab]}
          onPress={() => setTabIndex(0)}
        >
          <Text style={styles.tabText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, tabIndex === 1 && styles.activeTab]}
          onPress={() => setTabIndex(1)}
        >
          <Text style={styles.tabText}>Playlist</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContent}>
        {tabIndex === 0 && <ChannelVideos channelId={id} />}
      </View>
      {onEdit && (
        <EditChannel
          user={currentChannel}
          setUser={setCurrentChannel}
          open={onEdit}
          onClose={() => setOnEdit(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  banner: {
    width: "100%",
    height: 200,
  },
  infos: {
    flexDirection: "row",
    padding: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  details: {
    marginLeft: 16,
    justifyContent: "center",
  },
  channelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stats: {
    fontSize: 14,
    color: "gray",
    marginVertical: 4,
  },
  desc: {
    fontSize: 14,
    marginVertical: 4,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FF4D4D",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  tabWrapper: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC",
  },
  tabItem: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF4D4D",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tabContent: {
    padding: 16,
  },
});

export default Channel;
