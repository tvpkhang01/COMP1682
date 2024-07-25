import React from "react";
import { Input, Button } from "antd";
import {
  MenuOutlined,
  YoutubeFilled,
  AudioOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <MenuOutlined className="navbar-menu" />
        <Link to="/" className="navbar-logo">
          <YoutubeFilled style={{ color: "red" }} />
          MyTube
        </Link>
      </div>
      <div className="navbar-center">
        <Input.Search
          className="navbar-search-input"
          placeholder="Search"
          enterButton
        />
        <Button type="primary" shape="circle" className="navbar-audio-button">
          <AudioOutlined />
        </Button>
      </div>
      <div className="navbar-right">
        <Button className="navbar-more-button">
          <MoreOutlined />
        </Button>
        <Button className="navbar-login-button" shape="round">
          <Link to="/login" className="navbar-login">
            <div className="navbar-user-icon">
              <UserOutlined />
            </div>
            <span className="navbar-login-text">Sign in</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
