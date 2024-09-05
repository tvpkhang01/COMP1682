import Avatar from "../../avatar/Avatar";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

const Comment = () => {
  return (
    <div className="comment-item">
      <div className="user-infos">
        <a href={`/channel/abc`} className="channel-avatar">
          <Avatar size={26} />
        </a>

        <div className="info-wrapper">
          <a href={`/channel/abc`} className="channel-name">
            Khang
          </a>
          <span className="timeline">1 days ago</span>
        </div>
      </div>

      <div className="comment-body">
        <p>
          Comments are created by the following members of the community and are available.
        </p>
      </div>

      <div className="comments-actions">
        <div className="action-item like">
          <FaRegHeart />
          <span>30</span>
        </div>
        <div className="action-item">
          <FaShare />
        </div>
        <div className="action-item">
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
};

export default Comment;
