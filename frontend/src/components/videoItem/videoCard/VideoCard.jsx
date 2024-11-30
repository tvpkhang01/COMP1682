/* eslint-disable react/prop-types */
import "./VideoCard.css";
import Avatar from "../../avatar/Avatar";
import { getAvatarUrl, getImageUrl } from "../../../api/Api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const avatar = getAvatarUrl(video?.avatarUrl);
  const image = getImageUrl(video?.imageUrl);
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video/${video?._id}`);
  };

  const handleChannelClick = () => {
    navigate(`/channel/${video?.channelId}`);
  };

  return (
    <div className="video-card">
      <div className="card-cover" onClick={handleVideoClick}>
        <img src={image} alt="Video Image" />
      </div>
      <div className="card-details">
        <div className="card-title" onClick={handleVideoClick}>
          {video?.title}
        </div>
        <div className="card-infos">
          <div className="card-profile" onClick={handleChannelClick}>
            <Avatar src={video?.avatarUrl ? avatar : ""} size={24} />
          </div>
          <div className="card-channel" onClick={handleChannelClick}>
            {video?.name}
          </div>
          <span className="card-views">{`${video?.views} views`}</span>
          <span className="timeline">
            {dayjs(video?.createdAt).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
