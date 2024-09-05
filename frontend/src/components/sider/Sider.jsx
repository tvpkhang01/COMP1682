import { useContext } from "react";
import "./Sider.css";
import ThemeContext from "../../context/theme/ThemeContext";
import { NavLink } from "react-router-dom";

import { FaLayerGroup } from "react-icons/fa";
import {
  FaHouse,
  FaGear,
  FaFlag,
  FaCirclePlay,
  FaCircleQuestion,
  FaCircleHalfStroke,
  FaClockRotateLeft,
} from "react-icons/fa6";

const Sider = () => {
  const { state, toggleTheme, toggleMenu } = useContext(ThemeContext);
  return (
    <div className={state?.onMenu ? "sider active" : "sider"}>
      <div className={`sider-wrapper ${state?.theme}`}>
        <NavLink to="/" onClick={toggleMenu}>
          <FaHouse className="sider-icon" />
          <span>My Videos</span>
        </NavLink>
        <NavLink to="/videos/history" onClick={toggleMenu}>
          <FaClockRotateLeft className="sider-icon" />
          <span>History</span>
        </NavLink>
        <NavLink to="/videos/playlist" onClick={toggleMenu}>
          <FaLayerGroup className="sider-icon" />
          <span>Playlists</span>
        </NavLink>
        <NavLink to={`/channel/videos/abc`} onClick={toggleMenu}>
          <FaCirclePlay className="sider-icon" />
          <span>My Videos</span>
        </NavLink>

        <hr className="separator" />

        <div className="auth">
          <p>Sign in pls</p>
          <NavLink className="login-btn" to="/login" onClick={toggleMenu}>
            Sign In
          </NavLink>
        </div>

        <hr className="separator" />

        <NavLink to="/settings" onClick={toggleMenu}>
          <FaGear className="sider-icon" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/reports" onClick={toggleMenu}>
          <FaFlag className="sider-icon" />
          <span>Report</span>
        </NavLink>
        <NavLink to="/help" onClick={toggleMenu}>
          <FaCircleQuestion className="sider-icon" />
          <span>Help</span>
        </NavLink>
        <div className="toggle-theme" onClick={toggleTheme}>
          <FaCircleHalfStroke className="sider-icon" />
          <span>Dark Mode</span>
        </div>

        <hr className="separator" />

        <div className="terms">
          <div className="terms-wrapper">
            <span>Term and Services</span>
            <span>Privacy Policy and Safety</span>
          </div>
          <span className="terms-rights">
            Truong Van Phuc Khang Final Year Project © 2024 copyright all rights
            and reserved.
          </span>
        </div>
      </div>
      <div className="close-sider" onClick={toggleMenu}></div>
    </div>
  );
};

export default Sider;
