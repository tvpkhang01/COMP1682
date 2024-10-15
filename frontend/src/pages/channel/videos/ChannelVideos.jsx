
import { useEffect, useState } from "react";
import VideoCard from "../../../components/videoItem/videoCard/VideoCard";
import { getVideosByChannel } from "../../../api/Api";

// eslint-disable-next-line react/prop-types
const ChannelVideos = ({ channelId }) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        loadVideoByChannelId();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [channelId]);
    
      const loadVideoByChannelId = async () => {
        if (!channelId) return;
        try {
          const res = await getVideosByChannel(channelId);
          if (res.status == 200) {
            setVideos(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="list-items">
      {videos.length > 0 ? videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      )) : "No videos found"}
    </div>
  )
}

export default ChannelVideos;