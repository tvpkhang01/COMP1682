/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import VideoCard from "../../../components/videoItem/videoCard/VideoCard";
import { getVideosByChannel } from "../../../api/Api";

const ChannelVideos = ({ channelId }) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        loadVideoByChannelId();
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
      {videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      ))}
    </div>
  )
}

export default ChannelVideos;