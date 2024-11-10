import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import VideoCard from "../../../components/videoItem/videoCard/VideoCard";
import { getVideosByChannel } from "../../../api/Api";

const ChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideoByChannelId();
  }, [channelId]);

  const loadVideoByChannelId = async () => {
    if (!channelId) return;
    try {
      const res = await getVideosByChannel(channelId);
      if (res.status === 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <VideoCard video={item} />}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noVideosText}>No videos found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  noVideosText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default ChannelVideos;
