import "./Channel.css";
import avatarImg from "../../assets/avatar.png";
import channelBanner from "../../assets/channelBanner.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditChannel from "./editChannel/EditChannel";
import AppContext from "../../context/AppContext";
import {
  getChannel,
  getAvatarUrl,
  getBannerUrl,
  subscribeChannel,
  unsubscribeChannel,
  donateCoin,
} from "../../api/Api";
import ChannelVideos from "./videos/ChannelVideos";
import ChannelPlaylists from "./videos/ChannelPlaylists";

const Channel = () => {
  const { id } = useParams();
  const { state, logoutAuth } = useContext(AppContext);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const authUser = state?.channel;
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const tabPlaylist = url.searchParams.get("tabPlaylist");

  useEffect(() => {
    setTabIndex(tabPlaylist ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabPlaylist]);

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

  const handleSubscribe = async () => {
    if (!currentChannel || !authUser) return;

    try {
      if (!subStatus) {
        const res = await subscribeChannel(currentChannel._id);
        if (res.status == 200) {
          setSubStatus(true);
        }
      } else {
        const res = await unsubscribeChannel(currentChannel._id);
        if (res.status == 200) {
          setSubStatus(false);
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

  const handleDonate = async () => {
    if (authUser.coins >= 100) {
      try {
        const res = await donateCoin(currentChannel._id);
        if (res.status === 200) {
          alert("Donation successful!");
          loadCurrentChannel();
        } else {
          alert("Failed to donate coins. Please try again.");
        }
      } catch (err) {
        console.error("Error during donation:", err);
        alert("An error occurred. Please try again later.");
      }
    } else {
      alert("Insufficient coins. Please add more coins to donate.");
    }
  };
  

  const handleAdminPage = () => {
    navigate(`/admin`);
  };

  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img
            src={
              currentChannel?.bannerUrl
                ? getBannerUrl(currentChannel.bannerUrl)
                : channelBanner
            }
            alt="banner"
          />
        </div>
        <div className="infos">
          <img
            src={
              currentChannel?.avatarUrl
                ? getAvatarUrl(currentChannel.avatarUrl)
                : avatarImg
            }
            alt="avatar"
            className="avatar"
          />
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
              <>
                <button onClick={handleSubscribe}>
                  {subStatus ? "Unsubscribe" : "Subscribe"}
                </button>
                <button onClick={handleDonate}>Donate</button>
              </>
            )}
            {authUser && currentChannel?.admin == true && (
              <button onClick={handleAdminPage}>Admin Page</button>
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
        </div>
        <div className="tab-content">
          {tabIndex == 0 && <ChannelVideos channelId={id} />}
          {tabIndex == 1 && <ChannelPlaylists channelId={id} />}
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
