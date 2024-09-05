import { Link, NavLink } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { useContext, useState } from "react";
import ThemeContext from "../../context/theme/ThemeContext";
import "./Header.css";

import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiVideoAddFill } from "react-icons/ri";
import HeaderMenu from "./menu/Menu";
import Sider from "../sider/Sider";

const Header = () => {
  const { state, toggleMenu } = useContext(ThemeContext);
  const [onMenu, setOnMenu] = useState(false);
  const authUser = false;

  return (
    <div className={`header ${state?.theme}`}>
      <div className="header-wrapper">
        <div className="header-left">
          <div className="header-icon" onClick={toggleMenu}>
            <GiHamburgerMenu />
          </div>
          <Link to="/" className="logo">
            <span>My</span>
            <span className="tube">Tube</span>
          </Link>
        </div>
        <div className="header-center">
          <form onSubmit={() => {}} className="header-form">
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <FiSearch />
            </button>
          </form>
        </div>
        <div className="header-right">
          {authUser && (
            <>
              <NavLink to="/upload" className="header-icon">
                <RiVideoAddFill />
              </NavLink>
              <NavLink to="/notifications" className="header-icon">
                <FaBell />
              </NavLink>
            </>
          )}

          <div
            className="header-icon"
            onClick={() => setOnMenu((prev) => !prev)}
          >
            <div className="header-avatar">
              {authUser ? <Avatar size={35} /> : <HiDotsHorizontal />}
            </div>
          </div>

          <HeaderMenu user={authUser} open={onMenu} onClose={setOnMenu} />
        </div>
      </div>
      <Sider />
    </div>
  );
};

export default Header;
