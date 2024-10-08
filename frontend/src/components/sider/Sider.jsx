import { useContext } from "react";
import "./Sider.css";
import AppContext from "../../context/AppContext";
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
  const { state, toggleTheme, toggleMenu } = useContext(AppContext);
  const authUser = state?.auth;
  return (
    <div className={state?.onMenu ? "sider active" : "sider"}>
      <div className={`sider-wrapper ${state?.theme}`}>
        <NavLink to="/" onClick={toggleMenu}>
          <FaHouse className="sider-icon" />
          <span>Home Page</span>
        </NavLink>
        {authUser && (
          <div>
            <hr className="separator" />
            <NavLink to={`/channel/${authUser.id}`} onClick={toggleMenu}>
              <FaCirclePlay className="sider-icon" />
              <span>My Channel</span>
            </NavLink>
            <NavLink to={`/channel/${authUser.id}?tabPlaylist=true`} onClick={toggleMenu}>
              <FaLayerGroup className="sider-icon" />
              <span>Playlists (Under Construction)</span>
            </NavLink>
            <NavLink to={`/channel/${authUser.id}`} onClick={toggleMenu}>
              <FaClockRotateLeft className="sider-icon" />
              <span>History (Under Construction)</span>
            </NavLink>
            <NavLink to={`/channel/${authUser.id}/settings`} onClick={toggleMenu}>
              <FaGear className="sider-icon" />
              <span>Settings</span>
            </NavLink>
          </div>
        )}

        {!authUser && (
          <div>
            <hr className="separator" />
            <div className="auth">
              <NavLink className="login-btn" to="/login" onClick={toggleMenu}>
                Sign In
              </NavLink>
            </div>
          </div>
        )}

        <hr className="separator" />

        <NavLink to="/reports" onClick={toggleMenu}>
          <FaFlag className="sider-icon" />
          <span>Report (Under Construction)</span>
        </NavLink>
        <NavLink to="/help" onClick={toggleMenu}>
          <FaCircleQuestion className="sider-icon" />
          <span>Help (Under Construction)</span>
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
