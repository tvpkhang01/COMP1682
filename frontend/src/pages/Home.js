import React from "react";
import { Card, Row, Col } from "antd";

const Home = () => {
  const videos = [
    { title: "Video 1", description: "This is a description for video 1." },
    { title: "Video 2", description: "This is a description for video 2." },
    { title: "Video 3", description: "This is a description for video 3." },
    { title: "Video 4", description: "This is a description for video 4." },
    { title: "Video 5", description: "This is a description for video 5." },
    { title: "Video 6", description: "This is a description for video 6." },
  ];

  return (
    <div className="home">
      <Row gutter={[16, 16]}>
        {videos.map((video, index) => (
          <Col md={8} lg={6} xl={4} key={index}>
            <Card title={video.title} bordered={false}>
              <div className="video-placeholder">150 x 150</div>
              <p>{video.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;