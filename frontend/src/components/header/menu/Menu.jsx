import { useContext } from "react";
import "./Menu.css";
import AppContext from "../../../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../../avatar/Avatar";
import { getAvatarUrl, logout } from "../../../api/Api";

import { FaGear, FaFlag, FaCircleHalfStroke } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const HeaderMenu = ({ open, onClose }) => {
  const { state, toggleTheme, logoutAuth } = useContext(AppContext);
  const authUser = state?.channel;
  const avatar = getAvatarUrl(authUser?.avatarUrl);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout({ name: state?.auth.name });
      if (res.status == 200) {
        logoutAuth();
        onClose(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={open ? "header-menu active" : "header-menu"}>
      <div className={`header-menu-wrapper ${state?.theme}`}>
        {authUser && (
          <NavLink
            onClick={() => onClose(false)}
            to={`channel/${authUser?._id}`}
            className="header-menu-avatar"
          >
            <Avatar src={authUser.avatarUrl ? avatar : ""} size={40} />
            <div className="header-menu-infos">
              <h5>{authUser?.name}</h5>
              <p>View Channel</p>
            </div>
          </NavLink>
        )}

        <div className="header-menu-links">
          {authUser ? (
            <div className="header-menu-item" onClick={handleLogout}>
              <FiLogOut className="header-menu-icon" />
              <span>Logout</span>
            </div>
          ) : (
            <div className="auth">
              <NavLink
                to="/login"
                className="login-btn"
                onClick={() => onClose(false)}
              >
                Sign In
              </NavLink>
            </div>
          )}
          <div
            className="header-menu-item"
            onClick={() => {
              toggleTheme();
              onClose(false);
            }}
          >
            <FaCircleHalfStroke className="header-menu-icon" />
            <span>{state?.theme == "dark" ? "Light mode" : "Dark mode"}</span>
          </div>
          {authUser && (
            <NavLink
              to={`/channel/${authUser._id}/settings`}
              onClick={() => {
                onClose(false);
              }}
            >
              <FaGear className="header-menu-icon" />
              <span>Setting</span>
            </NavLink>
          )}

          <NavLink
            to="/report"
            onClick={() => {
              onClose(false);
            }}
          >
            <FaFlag className="header-menu-icon" />
            <span>Report (Under Construction)</span>
          </NavLink>
          <NavLink
            to="/help"
            onClick={() => {
              onClose(false);
            }}
          >
            <FaQuestionCircle className="header-menu-icon" />
            <span>Help (Under Construction)</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
