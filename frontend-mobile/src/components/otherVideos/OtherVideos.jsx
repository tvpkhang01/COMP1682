import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
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
        setVideos(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderVideoCard = ({ item }) => <VideoCard video={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderVideoCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default OtherVideos;
