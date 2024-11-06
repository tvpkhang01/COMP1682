import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import VideoList from "../../components/videoItem/videoList/VideoList";
import head from "../../assets/headImg.png";

const Home = () => {
  return (
    <View style={styles.home}>
      {/* <View style={styles.head}>
        <Image source={head} style={styles.coverHead} />
        <View style={styles.headWrapper}>
          <Text style={styles.headingText}>
            My videos, my community, my stage.
          </Text>
          <Text style={styles.welcomeText}>Welcome to my website</Text>
        </View>
      </View> */}
      <VideoList />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    width: "100%",
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingTop: 100,
    flexDirection: "column",
  },
  head: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  coverHead: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  headWrapper: {
    position: "absolute",
    bottom: "20%",
    left: "5%",
    display: "flex",
    flexDirection: "column",
    color: "rgba(245, 245, 245, 0.82)",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    gap: 10,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f5f5f5d2",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#f5f5f5d2",
  },
});

export default Home;
