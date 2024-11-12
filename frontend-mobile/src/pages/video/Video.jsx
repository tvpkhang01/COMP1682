import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Avatar from "../../components/avatar/Avatar";
import OtherVideos from "../../components/otherVideos/OtherVideos";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import {
  getVideo,
  getAvatarUrl,
  dislikeVideo,
  likeVideo,
  deleteVideo,
  subscribeChannel,
  unsubscribeChannel,
} from "../../api/Api";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppContext from "../../context/AppContext";
import { FontAwesome } from "@expo/vector-icons";

const Video = () => {
  const { state, logoutAuth } = useContext(AppContext);
  const [more, setMore] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const authUser = state?.channel;

  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    loadCurrentVideo(id);
  }, [id]);

  const loadCurrentVideo = async () => {
    if (!id) return;
    try {
      const res = await getVideo(id);
      if (res.status === 200) {
        setVideoDetails(res.data);
        setSubStatus(authUser && res.data.subscribers.includes(authUser._id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (!videoDetails || !authUser) {
      Alert.alert("Please login first");
      navigation.navigate("Login");
      return;
    }

    try {
      let res = null;
      if (videoDetails.likes.includes(authUser._id)) {
        res = await dislikeVideo(videoDetails._id);
      } else {
        res = await likeVideo(videoDetails._id);
      }
      if (res?.status === 200) {
        loadCurrentVideo();
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        Alert.alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigation.navigate("Login");
      }
    }
  };

  const handleSubscribe = async () => {
    if (!videoDetails || !authUser) {
      Alert.alert("Please login first");
      navigation.navigate("Login");
      return;
    }

    try {
      const res = subStatus
        ? await unsubscribeChannel(videoDetails.channelId)
        : await subscribeChannel(videoDetails.channelId);
      if (res.status === 200) {
        setSubStatus(!subStatus);
      }
      loadCurrentVideo();
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        Alert.alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigation.navigate("Login");
      }
    }
  };

  return (
    <View style={styles.container}>
      {videoDetails && <VideoPlayer src={videoDetails} />}
      <Text style={styles.videoTitle}>{videoDetails?.title}</Text>
      <View style={styles.channelInfos}>
        <Avatar size={35} src={getAvatarUrl(videoDetails?.avatarUrl)} />
        <View style={styles.avatarInfos}>
          <Text style={styles.channelName}>{videoDetails?.name}</Text>
          <Text>{`${videoDetails?.subscribers.length} subscribers`}</Text>
        </View>
        <TouchableOpacity
          onPress={handleSubscribe}
          style={styles.subscribeButton}
        >
          <Text style={styles.subscribeText}>
            {subStatus ? "Unsubscribe" : "Subscribe"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.likeWrapper}>
        <TouchableOpacity onPress={handleLike}>
          <FontAwesome
            name={
              videoDetails?.likes.includes(authUser?._id) ? "heart" : "heart-o"
            }
            size={20}
          />
        </TouchableOpacity>
        <Text>{videoDetails?.likes.length}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{videoDetails?.description}</Text>
        <TouchableOpacity onPress={() => setMore(!more)}>
          <Text style={styles.readMoreText}>
            {more ? "Show Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      </View>
      <OtherVideos />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  channelInfos: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  avatarInfos: {
    marginLeft: 10,
  },
  channelName: {
    fontSize: 16,
  },
  subscribeButton: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FF0000",
    borderRadius: 5,
  },
  subscribeText: {
    color: "#FFF",
    fontSize: 14,
  },
  likeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  descriptionContainer: {
    marginVertical: 8,
  },
  descriptionText: {
    fontSize: 14,
  },
  readMoreText: {
    color: "#007BFF",
  },
});

export default Video;
