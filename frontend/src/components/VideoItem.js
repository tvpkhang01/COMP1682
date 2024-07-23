import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const VideoItem = ({ video }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardMedia
        component="img"
        height="140"
        image={video.thumbnail}
        alt={video.title}
      />
      <CardContent>
        <Typography variant="h6">{video.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {video.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoItem;
