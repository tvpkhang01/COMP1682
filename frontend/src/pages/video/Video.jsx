import { useContext, useEffect, useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import OtherVideos from "../../components/otherVideos/OtherVideos";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import "./Video.css";
import { getVideo, getAvatarUrl } from "../../api/Api";
import Comments from "../../components/commentItem/comments/Comments";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import dayjs from "dayjs";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

const Video = () => {
  const { state } = useContext(AppContext);
  const [more, setMore] = useState(false);
  const [liked, setLiked] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const authUser = state?.channel;

  const { id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    loadCurrentVideo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authUser]);

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
                  <Avatar size={35} src={getAvatarUrl(videoDetails?.profile)} />
                  <div className="avatar-infos">
                    <h4 className="name">{videoDetails?.name}</h4>
                    <span>5K subscribers</span>
                  </div>
                  {videoDetails?.channelId == authUser?._id ? (
                    <button>
                      <a href={`/channel/${videoDetails?.channelId}`}>
                        View Channel
                      </a>
                    </button>
                  ) : (
                    <button>{subStatus ? "unsubscribe" : "subscribe"}</button>
                  )}
                </a>
              </div>
              <div className="right">
                {videoDetails?.channelId == authUser?._id && (
                  <>
                    <div
                      className="action-item"
                      // onClick={() => setOnEdit(true)}
                    >
                      <FaEdit />
                    </div>
                    <div
                      className="action-item"
                      //  onClick={handleDelete}
                    >
                      <FaTrashAlt />
                    </div>
                  </>
                )}
                <div className="like-wrapper">
                  <div
                    className="action-item"
                    onClick={() => setLiked((prev) => !prev)}
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                  </div>
                  <span>{videoDetails?.likes.length}</span>
                </div>
                <div className="action-item">
                  <FaShare />
                </div>
                <div className="action-item">
                  <HiDotsHorizontal />
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
        <OtherVideos />
      </div>
    </div>
  );
};

export default Video;
