import "./VideoCard.css";
import cover from "../../../assets/videoCover.png";
import Avatar from "../../avatar/Avatar";

const VideoCard = () => {
  return (
    <div className="video-card">
      <a href="/video/abc" className="card-cover">
        <img src={cover} alt="Video Cover" />
      </a>
      <div className="card-details">
        <a href="/video/abc" className="card-title">
          Video Card
        </a>
        <div className="card-infos">
          <a href={`/channel/abc`} className="card-profile">
            <Avatar size={24} />
          </a>
          <a href={`/channel/abc`} className="card-channel">
            Khang
          </a>
          <span className="card-views">12K views</span>
          <span className="timeline">1 weeks ago</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
