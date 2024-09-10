import "./EditChannel.css";
import channelBanner from "../../../assets/channelBanner.png";
import avatarImg from "../../../assets/avatar.png";
import { useContext, useState } from "react";
import ThemeContext from "../../../context/theme/ThemeContext";

import { FaCamera } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const EditChannel = ({ open, onClose }) => {
  const { state } = useContext(ThemeContext);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [channel, setChannel] = useState({
    name: "",
    desc: "",
  });

  const handleCancel = (e) => {
    e.preventDefault();
    clearInputs();
    onClose(false);
  };

  const handleBanner = (e) => {
    e.preventDefault();
    setBanner(e.target.files[0]);
  };

  const handleAvatar = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
  };

  const clearInputs = () => {
    setBanner(null);
    setAvatar(null);
    setChannel({ name: "", desc: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        banner,
        avatar,
        channel: channel.name,
        desc: channel.desc,
      };
    console.log(data);
    clearInputs();
    onClose(false);
  };

  return (
    <div className={open ? "edit-channel active" : "edit-channel"}>
      <div className={`wrapper ${state?.theme}`}>
        <div className="banner">
          <img
            src={banner ? URL.createObjectURL(banner) : channelBanner}
            alt="banner"
          />
          <label htmlFor="upload-banner">
            <input
              type="file"
              id="upload-banner"
              accept="image/png, image/jpg, image/jpeg"
              style={{ display: "none" }}
              onChange={handleBanner}
            />
            <div className="upload-banner">
              <FaCamera className="camera-icon" />
            </div>
          </label>
        </div>
        <div className="infos">
          <div className="avatar-wrapper">
            <img src={avatar ? URL.createObjectURL(avatar) : avatarImg} alt="avatar" className="avatar" />
            <label htmlFor="upload-avatar">
              <input
                type="file"
                id="upload-avatar"
                accept="image/png, image/jpg, image/jpeg"
                style={{ display: "none" }}
                onChange={handleAvatar}
              />
              <div className="upload-avatar">
                <FaCamera className="camera-icon" />
              </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="details">
            <input value={channel.name} onChange={(e) => setChannel({...channel, name: e.target.value})} type="text" placeholder="Channel Name" />
            <textarea value={channel.desc} onChange={(e) => setChannel({...channel, desc: e.target.value})} placeholder="Channel Description" />
            <div className="actions">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
