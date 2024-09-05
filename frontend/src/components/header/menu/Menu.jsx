import { useContext } from "react";
import "./Menu.css";
import ThemeContext from "../../../context/theme/ThemeContext";
import { NavLink } from "react-router-dom";
import Avatar from "../../avatar/Avatar";

import { FaGear, FaFlag, FaCircleHalfStroke } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const HeaderMenu = ({ user, open, onClose }) => {
  const { state, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={open ? "header-menu active" : "header-menu"}>
      <div className={`header-menu-wrapper ${state?.theme}`}>
        {user && (
          <NavLink
            onClick={() => onClose(false)}
            to={`channel/abc`}
            className="header-menu-avatar"
          >
            <Avatar size={40} />
            <div className="header-menu-infos">
              <h5>Khang</h5>
              <p>View Channel</p>
            </div>
          </NavLink>
        )}

        <div className="header-menu-links">
          {user ? (
            <div className="header-menu-item" onClick={() => onClose(false)}>
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
            <span>Dark Mode</span>
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
