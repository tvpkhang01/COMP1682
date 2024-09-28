/* eslint-disable react/prop-types */
import "./VideoPlayer.css";
import { getVideoUrl } from "../../api/Api";

const VideoPlayer = ({ src }) => {
  const video = getVideoUrl(src.videoUrl);
  return (
    <div className="video-player">
      <video src={video} controls />
    </div>
  );
};

export default VideoPlayer;
