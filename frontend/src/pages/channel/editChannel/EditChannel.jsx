/* eslint-disable react/prop-types */
import "./EditChannel.css";
import channelBanner from "../../../assets/channelBanner.png";
import avatarImg from "../../../assets/avatar.png";
import { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
import { uploadBanner, uploadAvatar, updateChannel } from "../../../api/Api";

import { FaCamera } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EditChannel = ({ user, setUser, open, onClose }) => {
  console.log(user);
  const navigate = useNavigate();
  const { state, logoutAuth } = useContext(AppContext);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [channel, setChannel] = useState({
    name: user ? user.name : "",
    description: user ? user.description : "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const bannerUrl = await addBanner();
      const avatarUrl = await addAvatar();

      console.log(bannerUrl, avatarUrl);
      const data = {
        bannerUrl: bannerUrl ? bannerUrl : user?.bannerUrl,
        avatarUrl: avatarUrl ? avatarUrl : user?.avatarUrl,
        name: channel.name,
        description: channel.description,
      };
      console.log(data);
      const res = await updateChannel(user._id, data);
      if (res.status == 200) {
        setUser(res.data);
        clearInputs();
        onClose(false);
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

  const addBanner = async () => {
    if (!banner) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + banner.name;
      formData.append("filename", filename);
      formData.append("file", banner);

      const res = await uploadBanner(formData);
      if (res.status == 200) {
        return filename;
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

  const addAvatar = async () => {
    if (!avatar) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + avatar.name;
      formData.append("filename", filename);
      formData.append("file", avatar);

      const res = await uploadAvatar(formData);
      if (res.status == 200) {
        return filename;
      }
      return;
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
    }
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
            <img
              src={avatar ? URL.createObjectURL(avatar) : avatarImg}
              alt="avatar"
              className="avatar"
            />
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
            <input
              value={channel.name}
              onChange={(e) => setChannel({ ...channel, name: e.target.value })}
              type="text"
              placeholder="Channel Name"
            />
            <textarea
              value={channel.description}
              onChange={(e) =>
                setChannel({ ...channel, description: e.target.value })
              }
              placeholder="Channel Description"
            />
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
