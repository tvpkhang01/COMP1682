// src/App.js
import React, { useState } from "react";
import Navbar from "./layout/navbar/Navbar";
import Sider from "./layout/sider/Sider";
import PublicRoutes from "./routes/PublicRoutes";
import "./App.css";

const App = () => {
  const [siderVisible, setSiderVisible] = useState(true);

  const toggleSider = () => {
    setSiderVisible(!siderVisible);
  };

  return (
    <div>
      <Navbar toggleSider={toggleSider} />
      <div className="main-container">
        <Sider siderVisible={siderVisible} />
        <div
          className={`content ${
            siderVisible ? "content-with-sider" : "content-without-sider"
          }`}
        >
          <PublicRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;
