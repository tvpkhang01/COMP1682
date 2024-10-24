import { useNavigate, useParams } from "react-router-dom";
import "./Playlist.css";
import { useContext, useEffect, useState } from "react";
import {
  getPlaylist,
  getVideo,
  getImageUrl,
  deletePlaylist,
  removeVideoFromPlaylist,
} from "../../../api/Api";
import Uplist from "../../uplist/Uplist";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AppContext from "../../../context/AppContext";

const Playlist = () => {
  const { logoutAuth } = useContext(AppContext);
  const { id, playlistId } = useParams();
  const [playlist, setPlaylist] = useState();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onEdit, setOnEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadPlaylistInfo(playlistId);
  }, [playlistId]);

  useEffect(() => {
    if (playlist?.videos?.length > 0) {
      loadPlaylistVideosInfo();
    }
  }, [playlistId, playlist]);

  const loadPlaylistInfo = async (playlistId) => {
    if (!playlistId) return;
    try {
      const res = await getPlaylist(playlistId);
      if (res.status == 200) {
        setPlaylist(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadPlaylistVideosInfo = async () => {
    try {
      const videoPromises = playlist.videos.map((videoId) => getVideo(videoId));
      const res = await Promise.all(videoPromises);
      setVideos(res.map((videoRes) => videoRes.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylistImage = () => {
    const firstVideo = videos.length > 0 ? videos[0] : null;
    return playlist?.imageUrl
      ? getImageUrl(playlist.imageUrl)
      : firstVideo?.imageUrl
      ? getImageUrl(firstVideo.imageUrl)
      : null;
  };

  const handleDelete = async () => {
    if (!playlist) return;

    try {
      if (window.confirm("Are you sure you want to delete this?")) {
        const res = await deletePlaylist(playlist._id);
        if (res.status == 200) {
          navigate(`/channel/${id}`);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
    }
  };

  const handleRemove = async (videoId) => {
    if (!videoId) return;
    console.log(videoId);
    try {
      const res = await removeVideoFromPlaylist(playlistId, videoId);
      if (res.status == 200) {
        loadPlaylistInfo(playlistId);
        alert("Remove video successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (onEdit && playlist)
    return (
      <Uplist
        selectedPlaylist={playlist}
        setSelectedPlaylist={setPlaylist}
        onClose={setOnEdit}
      />
    );

  return (
    <div className="playlist">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="playlist-wrapper">
          <div className="left">
            <div className="playlist-image">
              <img src={getPlaylistImage()} alt={playlist?.title} />
            </div>
            <div className="playlist-title">{playlist?.title}</div>
            <div className="playlist-description">{playlist?.description}</div>
            <div className="playlist-options">
              <button className="playlist-button">
                <a
                  href={`/video/${videos[0]?._id}?playlistId=${playlist._id}&index=1`}
                >
                  Start the playlist
                </a>
              </button>
              <div className="playlist-icon" onClick={() => setOnEdit(true)}>
                <FaEdit />
              </div>
              <div className="playlist-icon" onClick={handleDelete}>
                <FaTrashAlt />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="playlist-videos">
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <div key={index} className="playlist-video">
                    <div className="video-card">
                      <a href={`/video/${video._id}`} className="card-cover">
                        <img
                          src={getImageUrl(video.imageUrl)}
                          alt="Video Image"
                        />
                      </a>
                      <div className="card-details">
                        <a href={`/video/${video._id}`} className="card-title">
                          {video.title}
                        </a>
                      </div>
                    </div>
                    <div
                      style={{ alignSelf: "center", cursor: "pointer" }}
                      onClick={() => handleRemove(video._id)}
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                ))
              ) : (
                <div>No videos found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
