import { useState } from "react";
import Avatar from "../../components/avatar/Avatar";
import VideoCard from "../../components/videoItem/videoCard/VideoCard";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import "./Video.css";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import Comments from "../../components/commentItem/comments/Comments";

const Video = () => {
  const [more, setMore] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <div className="video-preview">
      <div className="video-preview-wrapper container">
        <div className="video-preview-left">
          <VideoPlayer />
          <h2>This video is another video</h2>
          <div className="video-preview-infos">
            <div className="channel-infos">
              <div className="left">
                <a href={`/channel/abc`} className="avatar-wrapper">
                  <Avatar size={35} />
                  <div className="avatar-infos">
                    <h4 className="name">Khang</h4>
                    <span>5K subscribers</span>
                  </div>
                  <button>subscribe</button>
                </a>
              </div>
              <div className="right">
                <div className="action-item">
                  <FaEdit />
                </div>
                <div className="action-item">
                  <FaTrashAlt />
                </div>
                <div className="like-wrapper">
                  <div
                    className="action-item"
                    onClick={() => setLiked((prev) => !prev)}
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                  </div>
                  <span>25</span>
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
              <div className="views"></div>
              <div className="video-desc">
                <p>Hello 1</p>
                <p>Hello 2</p>
                <p>Hello 3</p>
                <p>Hello 4</p>
                <p>Hello 5</p>
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
          {[...Array(15)].map((item, index) => (
            <VideoCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
