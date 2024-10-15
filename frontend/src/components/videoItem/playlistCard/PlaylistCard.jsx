/* eslint-disable react/prop-types */
import "./PlaylistCard.css";
import headImg from "../../../assets/headImg.png";
import { getImageUrl } from "../../../api/Api";

import { RiPlayList2Fill } from "react-icons/ri";

const PlaylistCard = ({ playlist }) => {
  console.log(playlist);
  const image = playlist?.imageUrl ? getImageUrl(playlist?.imageUrl) : null;
  const firstVideoId = playlist?.videos?.length > 0 ? playlist.videos[0].videoId : null;
  console.log(image);
  return (
    <div className="playlist-card">
      <div className="wrapper">
        <a
          href={`/video/${firstVideoId}?playlistId=${playlist?._id}&index=${1}`}
          className="cover-wrapper"
        >
          <img src={image || headImg} alt="cover" className="cover" />
          <div className="icon-wrapper">
            <span>{playlist?.videos.length || 0}</span>
            <RiPlayList2Fill className="icon" />
          </div>
        </a>
        <a
          href={`/video/${firstVideoId}?playlistId=${playlist?._id}&index=${1}`}
          className="title"
        >
          {playlist?.title || "Untitled Playlist"}
        </a>
      </div>
    </div>
  );
};

export default PlaylistCard;
