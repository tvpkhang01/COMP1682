import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Avatar from "../../avatar/Avatar";
import { getAvatarUrl, getImageUrl } from "../../../api/Api";
import dayjs from "dayjs";

const VideoCard = ({ video, navigation }) => {
  const avatar = getAvatarUrl(video?.avatarUrl);
  const image = getImageUrl(video?.imageUrl);

  return (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => navigation.navigate("Video", { id: video?._id })}
    >
      <Image source={{ uri: image }} style={styles.cardCover} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {video?.title}
        </Text>
        <View style={styles.cardInfos}>
          <Avatar src={avatar} size={24} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Channel", { id: video?.channelId })
            }
          >
            <Text style={styles.cardChannel}>{video?.name}</Text>
          </TouchableOpacity>
          <Text style={styles.cardViews}>{`${video?.views} views`}</Text>
          <Text style={styles.timeline}>
            {dayjs(video?.createdAt).format("MMM D, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoCard: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  cardCover: {
    width: "100%",
    height: 150,
  },
  cardDetails: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  cardInfos: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 8,
  },
  cardChannel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#0073e6",
  },
  cardViews: {
    fontSize: 12,
    color: "#666",
  },
  timeline: {
    fontSize: 12,
    color: "#666",
  },
});

export default VideoCard;
