import React from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";
import { getVideoUrl } from "../../api/Api";

const VideoPlayer = ({ src }) => {
  console.log(src, "Loading video");
  const videoUrl = getVideoUrl(src.videoUrl);
  console.log(videoUrl);
  return (
    <View style={styles.videoPlayer}>
      <Video
        source={{ uri: videoUrl }}
        autoplay={false}
        defaultMuted={false}
        style={styles.video}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: 10,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoPlayer;
