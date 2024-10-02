import { useContext } from "react";
import "./Menu.css";
import AppContext from "../../../context/AppContext";
import { NavLink } from "react-router-dom";
import Avatar from "../../avatar/Avatar";
import { getAvatarUrl } from "../../../api/Api";

import { FaGear, FaFlag, FaCircleHalfStroke } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const HeaderMenu = ({ open, onClose }) => {
  const { state, toggleTheme, logoutAuth } = useContext(AppContext);
  const authUser = state?.channel;
  const avatar = getAvatarUrl(authUser?.avatarUrl);
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
            <div
              className="header-menu-item"
              onClick={() => {
                logoutAuth();
                onClose(false);
              }}
            >
              <FiLogOut className="header-menu-icon" />
              <span>Logout</span>
            </div>
          ) : (
            <div className="auth">
              <p>Sign in now pls</p>
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
            }}
          >
            <FaCircleHalfStroke className="header-menu-icon" />
            <span>{state?.theme == "dark" ? "Light mode" : "Dark mode"}</span>
          </div>
          <NavLink
            to="/settings"
            onClick={() => {
              onClose(false);
            }}
          >
            <FaGear className="header-menu-icon" />
            <span>Setting</span>
          </NavLink>
          <NavLink
            to="/report"
            onClick={() => {
              onClose(false);
            }}
          >
            <FaFlag className="header-menu-icon" />
            <span>Report</span>
          </NavLink>
          <NavLink
            to="/help"
            onClick={() => {
              onClose(false);
            }}
          >
            <FaQuestionCircle className="header-menu-icon" />
            <span>Help</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
