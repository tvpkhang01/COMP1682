// src/pages/home/Home.js
import React from "react";
import { Row, Col } from "antd";
import VideoItem from "../../components/video/VideoItem";
import "./Home.css";

const Home = () => {
  const videos = [
    {
      title: "Video 1",
      description: "This is a description for video 1.",
      thumbnail: "thumbnail1.jpg",
    },
    {
      title: "Video 2",
      description: "This is a description for video 2.",
      thumbnail: "thumbnail2.jpg",
    },
    {
      title: "Video 3",
      description: "This is a description for video 3.",
      thumbnail: "thumbnail3.jpg",
    },
    {
      title: "Video 4",
      description: "This is a description for video 4.",
      thumbnail: "thumbnail4.jpg",
    },
    {
      title: "Video 5",
      description: "This is a description for video 5.",
      thumbnail: "thumbnail5.jpg",
    },
    {
      title: "Video 6",
      description: "This is a description for video 6.",
      thumbnail: "thumbnail6.jpg",
    },
  ];

  return (
    <div className="home">
      <Row gutter={[16, 16]}>
        {videos.map((video, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
            <VideoItem video={video} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
