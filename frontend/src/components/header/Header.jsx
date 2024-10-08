import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import "./Header.css";
import { getAvatarUrl } from "../../api/Api";

import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiVideoAddFill } from "react-icons/ri";
import HeaderMenu from "./menu/Menu";
import Sider from "../sider/Sider";

const Header = () => {
  const { state, toggleMenu } = useContext(AppContext);
  const [onSearch, setOnSearch] = useState("");
  const [onMenu, setOnMenu] = useState(false);
  const authUser = state?.channel;
  const navigate = useNavigate();

  const avatar = getAvatarUrl(authUser?.avatarUrl);

  console.log(onSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!onSearch) return;
    navigate(`/search?search=${onSearch}`);
  };

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
          <form onSubmit={handleSearch} className="header-form">
            <input
              value={onSearch}
              onChange={(e) => {
                setOnSearch(e.target.value);
              }}
              type="search"
              placeholder="Search"
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>
        </div>
        <div className="header-right">
          {authUser && (
            <NavLink to="/upload" className="header-icon">
              <RiVideoAddFill />
            </NavLink>
          )}

          <div
            className="header-icon"
            onClick={() => setOnMenu((prev) => !prev)}
          >
            <div className="header-avatar">
              {authUser ? (
                <Avatar src={authUser.avatarUrl ? avatar : ""} size={35} />
              ) : (
                <HiDotsHorizontal />
              )}
            </div>
          </div>

          <HeaderMenu open={onMenu} onClose={setOnMenu} />
        </div>
      </div>
      <Sider />
    </div>
  );
};

export default Header;
