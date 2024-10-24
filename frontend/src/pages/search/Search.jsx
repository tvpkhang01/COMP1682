import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getVideos } from "../../api/Api";
import VideoCard from "../../components/videoItem/videoCard/VideoCard";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const onSearch = useLocation().search;
  useEffect(() => {
    onSearch && searchVideo();
  }, [onSearch]);

  const searchVideo = async () => {
    try {
      const res = await getVideos(onSearch);
      if (res.status === 200) {
        setVideos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="home">
      <div className="video-list">
        {videos.length > 0 ? videos.map((item, index) => (
          <VideoCard key={index} video={item} />
        )) : "No videos found"}
      </div>
    </div>
  );
};

export default Search;
