import "./Channel.css";
import VideoCard from "../../components/videoItem/videoCard/VideoCard";
import PlaylistCard from "../../components/videoItem/playlistCard/PlaylistCard";
import avatarImg from "../../assets/avatar.png";
import channelBanner from "../../assets/channelBanner.png";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditChannel from "./editChannel/EditChannel";
import AppContext from "../../context/AppContext";
import { getChannel, getAvatarUrl, getBannerUrl } from "../../api/Api";

const Channel = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const authUser = state?.channel;

  useEffect(() => {
    loadCurrentChannel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authUser]);

  const loadCurrentChannel = async () => {
    if (!id) return;
    try {
      if (id == authUser?._id) {
        setCurrentChannel(authUser);
        return;
      }
      const res = await getChannel(id);
      if (res.status === 200) {
        setCurrentChannel(res.data);
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

  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img src={authUser ? getBannerUrl(authUser.bannerUrl) :channelBanner} alt="banner" />
        </div>
        <div className="infos">
          <img src={authUser ? getAvatarUrl(authUser.avatarUrl) : avatarImg} alt="avatar" className="avatar" />
          <div className="details">
            <h4 className="channel-name">{currentChannel?.name}</h4>
            <span className="stats">{`${currentChannel?.subscribers.length} ${
              currentChannel?.subscribers.length > 1
                ? "subscribers"
                : "subscriber"
            } ${currentChannel?.videos.length} ${
              currentChannel?.videos.length > 1 ? "videos" : "video"
            }`}</span>
            <p className="desc">{currentChannel?.description}</p>
            {authUser && currentChannel?._id == authUser?._id ? (
              <button onClick={() => setOnEdit(true)}>Edit Channel</button>
            ) : (
              <button>{subStatus ? "Unsubscribe" : "Subscribe"}</button>
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
      {onEdit && (
        <EditChannel
          user={currentChannel}
          setUser={setCurrentChannel}
          open={onEdit}
          onClose={setOnEdit}
        />
      )}
    </div>
  );
};

export default Channel;
