import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import VideoCard from "../videoItem/videoCard/VideoCard";
import { getVideos } from "../../api/Api";

const OtherVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getVideos();
      if (res.status === 200) {
        console.log("Video data loaded:", res.data);
        setVideos(res.data);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
    }
  };

  return (
    <View style={styles.container}>
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideoCard video={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No videos found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default OtherVideos;
