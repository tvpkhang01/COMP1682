import { useContext, useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import OtherVideos from "../../components/otherVideos/OtherVideos";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import "./Video.css";
import {
  getVideo,
  getAvatarUrl,
  dislikeVideo,
  likeVideo,
  deleteVideo,
  subscribeChannel,
  unsubscribeChannel,
  getPlaylist,
} from "../../api/Api";
import Comments from "../../components/commentItem/comments/Comments";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import dayjs from "dayjs";
import Upload from "../upload/Upload";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const Video = () => {
  const { state, logoutAuth } = useContext(AppContext);
  const [more, setMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const authUser = state?.channel;
  const [playlistVideos, setPlaylistVideos] = useState([]);

  const url = new URL(window.location.href);
  const playlistId = url.searchParams.get("playlistId");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCurrentVideo(id);
    if (playlistId) {
      loadPlaylistVideos(playlistId);
    }
  }, [id, playlistId, authUser]);

  const loadCurrentVideo = async () => {
    if (!id) return;
    try {
      const res = await getVideo(id);
      if (res.status == 200) {
        setVideoDetails(res.data);
        if (authUser && res.data.subscribers.includes(authUser._id)) {
          setSubStatus(true);
        } else {
          setSubStatus(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadPlaylistVideos = async (playlistId) => {
    try {
      const res = await getPlaylist(playlistId);
      if (res.status == 200) {
        console.log(res.data);
        const playlist = res.data;
        setPlaylistVideos(playlist?.videos || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (!videoDetails || !authUser) return;

    try {
      let res = null;
      if (videoDetails.likes.includes(authUser._id)) {
        res = await dislikeVideo(videoDetails._id);
      } else {
        res = await likeVideo(videoDetails._id);
      }
      if (res?.status == 200) {
        loadCurrentVideo();
      }
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
    }
  };

  const handleDelete = async () => {
    if (!videoDetails) return;

    try {
      if (window.confirm("Are you sure you want to delete this?")) {
        const res = await deleteVideo(videoDetails._id);
        if (res.status == 200) {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
    }
  };

  const handleSubscribe = async () => {
    if (!videoDetails || !authUser) return;

    try {
      if (!subStatus) {
        const res = await subscribeChannel(videoDetails.channelId);
        if (res.status == 200) {
          setSubStatus(true);
        }
      } else {
        const res = await unsubscribeChannel(videoDetails.channelId);
        if (res.status == 200) {
          setSubStatus(false);
        }
      }
      loadCurrentVideo();
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
    }
  };

  if (onEdit && videoDetails)
    return (
      <Upload
        selectedVideo={videoDetails}
        setSelectedVideo={setVideoDetails}
        onClose={setOnEdit}
      />
    );

  console.log(videoDetails);
  return (
    <div className="video-preview">
      <div className="video-preview-wrapper container">
        <div className="video-preview-left">
          {videoDetails && <VideoPlayer src={videoDetails} />}
          <h2 className="video-title">{videoDetails?.title}</h2>
          <div className="video-preview-infos">
            <div className="channel-infos">
              <div className="left">
                <a
                  href={`/channel/${videoDetails?.channelId}`}
                  className="avatar-wrapper"
                >
                  <Avatar
                    size={35}
                    src={getAvatarUrl(videoDetails?.avatarUrl)}
                  />
                  <div className="avatar-infos">
                    <h4 className="name">{videoDetails?.name}</h4>
                    <span>{`${videoDetails?.subscribers.length} ${
                      videoDetails?.subscribers.length > 1
                        ? "subscribers"
                        : "subscriber"
                    }`}</span>
                  </div>
                </a>
                {videoDetails?.channelId == authUser?._id ? (
                  <button>
                    <a href={`/channel/${videoDetails?.channelId}`}>
                      View Channel
                    </a>
                  </button>
                ) : (
                  <button onClick={handleSubscribe}>
                    {subStatus ? "Unsubscribe" : "Subscribe"}
                  </button>
                )}
              </div>
              <div className="right">
                {videoDetails?.channelId == authUser?._id && (
                  <>
                    <div
                      className="action-item"
                      onClick={() => setOnEdit(true)}
                    >
                      <FaEdit />
                    </div>
                    <div className="action-item" onClick={handleDelete}>
                      <FaTrashAlt />
                    </div>
                  </>
                )}
                <div className="like-wrapper">
                  <div className="action-item" onClick={handleLike}>
                    {videoDetails?.likes.includes(authUser?._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                  <span>{videoDetails?.likes.length}</span>
                </div>
              </div>
            </div>
            <div
              className={
                more ? "video-preview-desc active" : "video-preview-desc"
              }
            >
              <div className="views">{`${videoDetails?.views} views. ${dayjs(
                videoDetails?.createdAt
              ).format("MMM D, YYYY")}`}</div>
              <div className="video-desc">
                <p>{videoDetails?.description}</p>
              </div>
              <span
                onClick={() => setMore((prev) => !prev)}
                className="read-more"
              >
                {more ? "Show Less" : "Read More"}
              </span>
            </div>
            <div className="video-comments">
              <Comments />
            </div>
          </div>
        </div>
        <div className="video-preview-right">
          {playlistId && (
            <div className="playlist-box">
              <h4>Playlist</h4>
              <ul>
                {playlistVideos.map((video, index) => (
                  <li
                    key={video}
                    className={
                      video == videoDetails?._id
                        ? "current-video"
                        : "playlist-video"
                    }
                  >
                    <a
                      href={`/video/${video}?playlistId=${playlistId}&index=${
                        index + 1
                      }`}
                      className="playlist-item"
                    >
                      <div className="playlist-info">
                        <span className="playlist-title">
                          {video.title || `Video ${index + 1}`}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <OtherVideos />
        </div>
      </div>
    </div>
  );
};

export default Video;
