import "./VideoPlayer.css";
import video from "../../assets/video.mp4";

// eslint-disable-next-line react/prop-types
const VideoPlayer = ({ src }) => {
  return (
    <div className="video-player">
      <video src={src ? src : video} controls />
    </div>
  );
};

export default VideoPlayer;
