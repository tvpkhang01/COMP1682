import { useEffect, useState } from "react";
import VideoCard from "../videoCard/VideoCard";
import "./VideoList.css";
import { getVideos } from "../../../api/Api";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    loadVideos();
  }, []);
  const loadVideos = async () => {
    try {
      const res = await getVideos();
      if (res?.data) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="video-list">
      {videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      ))}
    </div>
  );
};

export default VideoList;
