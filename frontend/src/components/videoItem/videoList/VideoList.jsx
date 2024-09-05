import VideoCard from "../videoCard/VideoCard";
import "./VideoList.css";


const VideoList = () => {
  return (
    <div className="video-list">
      {[...Array(30)].map((item, index) => (
        <VideoCard key={index} />
      ))}
    </div>
  )
}

export default VideoList