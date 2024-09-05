import "./VideoPlayer.css";
import sample from "../../assets/sample.mp4";

// eslint-disable-next-line react/prop-types
const VideoPlayer = ({ src }) => {
  return (
    <div className="video-player">
      <video src={src ? src : sample} controls />
    </div>
  );
};

export default VideoPlayer;
