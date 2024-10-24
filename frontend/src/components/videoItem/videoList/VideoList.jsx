import { useEffect, useState } from "react";
import VideoCard from "../videoCard/VideoCard";
import "./VideoList.css";
import { getVideos } from "../../../api/Api";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, [videos]);

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
      {videos.length > 0
        ? videos.map((item, index) => <VideoCard key={index} video={item} />)
        : "No videos found"}
    </div>
  );
};

export default VideoList;
