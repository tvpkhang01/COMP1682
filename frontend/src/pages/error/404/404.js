// src/pages/error/404/404.js
import React from "react";
import { Typography } from "antd";
import "./404.css";

const { Title, Text } = Typography;

const Error404 = () => {
  return (
    <div className="error-page">
      <Title level={1}>404</Title>
      <Text level={6}>Page Not Found</Text>
    </div>
  );
};

export default Error404;
