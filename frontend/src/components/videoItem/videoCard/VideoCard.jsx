/* eslint-disable react/prop-types */
import "./VideoCard.css";
import Avatar from "../../avatar/Avatar";
import { getAvatarUrl, getImageUrl } from "../../../api/Api";
import dayjs from "dayjs";

const VideoCard = ({ video }) => {
  const avatar = getAvatarUrl(video?.avatarUrl);
  const image = getImageUrl(video?.imageUrl);
  return (
    <div className="video-card">
      <a href={`/video/${video?._id}`} className="card-cover">
        <img src={image} alt="Video Image" />
      </a>
      <div className="card-details">
        <a href={`/video/${video?._id}`} className="card-title">
        {video?.title}
        </a>
        <div className="card-infos">
          <a href={`/channel/${video?.channelId}`} className="card-profile">
            <Avatar src={video?.avatarUrl ? avatar : ""} size={24} />
          </a>
          <a href={`/channel/${video?.channelId}`} className="card-channel">
          {video?.name}
          </a>
          <span className="card-views">{`${video?.views} views`}</span>
          <span className="timeline">{dayjs(
                video?.createdAt
              ).format("MMM D, YYYY")}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
