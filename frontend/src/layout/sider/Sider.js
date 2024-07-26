// src/layout/sider/Sider.js
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
    <div className={`sider ${siderVisible ? 'sider-visible' : 'sider-collapsed'}`}>
      <Menu mode="inline" theme="light" className="sider-menu">
        {siderVisible ? (
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
        ) : (
          <Menu.Item key="1" icon={<HomeOutlined />}></Menu.Item>
        )}
        {siderVisible ? (
          <Menu.Item key="2" icon={<FireOutlined />}>
            Trending
          </Menu.Item>
        ) : (
          <Menu.Item key="2" icon={<FireOutlined />}></Menu.Item>
        )}
        {siderVisible ? (
          <Menu.Item key="3" icon={<SubnodeOutlined />}>
            Subscriptions
          </Menu.Item>
        ) : (
          <Menu.Item key="3" icon={<SubnodeOutlined />}></Menu.Item>
        )}
        {siderVisible ? (
          <Menu.Item key="4" icon={<HistoryOutlined />}>
            History
          </Menu.Item>
        ) : (
          <Menu.Item key="4" icon={<HistoryOutlined />}></Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default Sider;