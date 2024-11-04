import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getVideos } from "../../api/Api";
import VideoCard from "../../components/videoItem/videoCard/VideoCard";

const Search = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const route = useRoute();
  const onSearch = route.params?.search;

  useEffect(() => {
    if (onSearch) searchVideo();
  }, [onSearch]);

  const searchVideo = async () => {
    try {
      const res = await getVideos(onSearch);
      if (res?.status === 200) {
        setVideos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <VideoCard video={item} navigation={navigation} />
          )}
          contentContainerStyle={styles.videoList}
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
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#f0f0f0",
  },
  videoList: {
    paddingBottom: 20,
  },
  noVideosText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Search;
