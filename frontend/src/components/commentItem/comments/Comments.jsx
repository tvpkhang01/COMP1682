import "./Comments.css";
import Avatar from "../../avatar/Avatar";
import Comment from "../comment/Comment";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";

const Comments = () => {
  const { state } = useContext(AppContext);
  return (
    <div className={`comments ${state?.theme}`}>
      <div className="comments-wrapper">
        <h4>1K comments</h4>
        <form onSubmit={() => {}} className="comment-form">
          <div className="inputs-wrapper">
            <Avatar />
            <textarea required placeholder="Write your comment" />
          </div>
          <div className="inputs-actions">
            <button onClick={() => {}}>Clear</button>
            <button onClick={() => {}} type="submit">
              Comment
            </button>
          </div>
        </form>
        <div className="comment-list">
          {[...Array(4)].map((item, index) => (
            <Comment key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
