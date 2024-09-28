import { useEffect, useState } from "react";
import VideoCard from "../videoItem/videoCard/VideoCard";
import { getVideos } from "../../api/Api";

const OtherVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getVideos();
      if (res.status == 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="video-preview-right">
      {videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      ))}
    </div>
  );
};

export default OtherVideos;
