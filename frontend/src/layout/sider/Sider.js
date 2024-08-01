import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FireOutlined,
  SubnodeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import "./Sider.css";

const Sider = ({ siderVisible }) => {
  return (
    <div
      className={`sider ${siderVisible ? "sider-expanded" : "sider-collapsed"}`}
    >
      <Menu mode="inline" theme="light" className="sider-menu">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          {siderVisible && "Home"}
        </Menu.Item>
        <Menu.Item key="2" icon={<FireOutlined />}>
          {siderVisible && "Trending"}
        </Menu.Item>
        <Menu.Item key="3" icon={<SubnodeOutlined />}>
          {siderVisible && "Subscriptions"}
        </Menu.Item>
        <Menu.Item key="4" icon={<HistoryOutlined />}>
          {siderVisible && "History"}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sider;
