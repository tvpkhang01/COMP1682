import "./Channel.css";
import VideoCard from "../../components/videoItem/videoCard/VideoCard";
import PlaylistCard from "../../components/videoItem/playlistCard/PlaylistCard";
import avatarImg from "../../assets/avatar.png";
import channelBanner from "../../assets/channelBanner.png";
import { useState } from "react";
import EditChannel from "./editChannel/EditChannel";

const Channel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const authUser = true;
  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img src={channelBanner} alt="banner" />
        </div>
        <div className="infos">
          <img src={avatarImg} alt="avatar" className="avatar" />
          <div className="details">
            <h4 className="channel-name">Khang</h4>
            <span className="stats">1K subscribers. 100 videos</span>
            <p className="desc">
              This is the channel about to be published later.
            </p>
            {authUser ? (
              <button onClick={() => setOnEdit(true)}>Edit Channel</button>
            ) : (
              <button>Subscribe</button>
            )}
          </div>
        </div>
        <div className="tab-wrapper">
          <div
            className={tabIndex == 0 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(0)}
          >
            <span>Video</span>
          </div>
          <div
            className={tabIndex == 1 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(1)}
          >
            <span>Playlist</span>
          </div>
          <div
            className={tabIndex == 2 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(2)}
          >
            <span>Settings</span>
          </div>
        </div>
        <div className="tab-content">
          {tabIndex == 0 && (
            <div className="list-items">
              {[...Array(15)].map((item, index) => (
                <VideoCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 1 && (
            <div className="list-items">
              {[...Array(15)].map((item, index) => (
                <PlaylistCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 2 && <div className="channel-settings">Settings</div>}
        </div>
      </div>
      <EditChannel open={onEdit} onClose={setOnEdit} />
    </div>
  );
};

export default Channel;
