// src/components/VideoItem.js
import React from "react";
import { Card, Typography } from "antd";
import "./VideoItem.css";

const { Meta } = Card;

const VideoItem = ({ video }) => {
  return (
    <Card
      hoverable
      className="video-item"
      cover={
        <img
          alt={video.title}
          src={video.thumbnail}
          className="video-thumbnail"
        />
      }
    >
      <Meta
        title={<Typography.Title level={4}>{video.title}</Typography.Title>}
        description={
          <Typography.Paragraph>{video.description}</Typography.Paragraph>
        }
      />
    </Card>
  );
};

export default VideoItem;
