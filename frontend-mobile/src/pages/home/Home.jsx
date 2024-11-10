import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import VideoList from "../../components/videoItem/videoList/VideoList";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.home}>
        <VideoList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  home: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
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
