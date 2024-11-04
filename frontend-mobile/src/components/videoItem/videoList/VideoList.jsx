import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import VideoCard from "../videoCard/VideoCard";
import { getVideos } from "../../../api/Api";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getVideos();
      if (res?.data) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.videoList}>
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideoCard video={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <Text>No videos found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  videoList: {
    flex: 1,
    paddingVertical: 30,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default VideoList;
