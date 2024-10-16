/* eslint-disable react/prop-types */
import "./PlaylistCard.css";
import headImg from "../../../assets/headImg.png";
import { getImageUrl, getVideo } from "../../../api/Api";
import { useState, useEffect } from "react";

import { RiPlayList2Fill } from "react-icons/ri";

const PlaylistCard = ({ playlist }) => {
  console.log(playlist);
  const firstVideoId = playlist?.videos?.length > 0 ? playlist.videos[0] : null;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (playlist?.imageUrl) {
        setImage(getImageUrl(playlist.imageUrl));
      } else if (firstVideoId) {
        try {
          const res = await getVideo(firstVideoId);
          if (res.status == 200) {
            if (res.data.imageUrl) {
              setImage(getImageUrl(res.data.imageUrl));
            }
          }
        } catch (error) {
          console.error("Failed to fetch video image", error);
        }
      }
    };

    fetchImage();
  }, [playlist, firstVideoId]);

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
        <a
          href={`/channel/${playlist?.channelId}/playlist/${playlist?._id}`}
          className="view"
        >
          View the full Playlist
        </a>
      </div>
    </div>
  );
};

export default PlaylistCard;
