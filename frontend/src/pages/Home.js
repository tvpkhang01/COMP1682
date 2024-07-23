import React from "react";
import VideoItem from "../components/VideoItem";

const videos = [
  {
    id: 1,
    title: "Video 1",
    description: "This is a description for video 1.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Video 2",
    description: "This is a description for video 2.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Video 3",
    description: "This is a description for video 3.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Video 4",
    description: "This is a description for video 4.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Video 5",
    description: "This is a description for video 5.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Video 6",
    description: "This is a description for video 6.",
    thumbnail: "https://via.placeholder.com/150",
  },
  // Add more video objects here
];

const Home = () => {
  return (
    <div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
