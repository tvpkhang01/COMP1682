/* eslint-disable react/prop-types */
import "./PlaylistCard.css";
import headImg from "../../../assets/headImg.png";
import { getImageUrl, getVideo } from "../../../api/Api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiPlayList2Fill } from "react-icons/ri";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const firstVideoId = playlist?.videos?.length > 0 ? playlist.videos[0] : null;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (playlist?.imageUrl) {
        setImage(getImageUrl(playlist.imageUrl));
      } else if (firstVideoId) {
        try {
          const res = await getVideo(firstVideoId);
          if (res.status === 200 && res.data.imageUrl) {
            setImage(getImageUrl(res.data.imageUrl));
          }
        } catch (error) {
          console.error("Failed to fetch video image", error);
        }
      }
    };

    fetchImage();
  }, [playlist, firstVideoId]);

  const handleVideoClick = () => {
    navigate(`/video/${firstVideoId}?playlistId=${playlist?._id}&index=${1}`);
  };

  const handlePlaylistViewClick = () => {
    navigate(`/channel/${playlist?.channelId}/playlist/${playlist?._id}`);
  };

  return (
    <div className="playlist-card">
      <div className="wrapper">
        <div className="cover-wrapper" onClick={handleVideoClick}>
          <img src={image || headImg} alt="cover" className="cover" />
          <div className="icon-wrapper">
            <span>{playlist?.videos.length || 0}</span>
            <RiPlayList2Fill className="icon" />
          </div>
        </div>
        <div className="title" onClick={handleVideoClick}>
          {playlist?.title || "Untitled Playlist"}
        </div>
        <div className="view" onClick={handlePlaylistViewClick}>
          View the full Playlist
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
