import React from "react";
import { Card, Typography } from "antd";

const { Meta } = Card;

const VideoItem = ({ video }) => {
  return (
    <Card
      hoverable
      style={{ width: 300, marginBottom: 20 }}
      cover={<img alt={video.title} src={video.thumbnail} />}
    >
      <Meta
        title={<Typography.Title level={4}>{video.title}</Typography.Title>}
        description={<Typography.Paragraph>{video.description}</Typography.Paragraph>}
      />
    </Card>
  );
};

export default VideoItem;