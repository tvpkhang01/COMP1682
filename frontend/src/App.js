// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './layout/navbar/Navbar';
import Sider from './layout/sider/Sider';

const App = () => {
  const [siderVisible, setSiderVisible] = useState(false);

  const toggleSider = () => {
    setSiderVisible(!siderVisible);
  };

  return (
    <div>
      <Navbar toggleSider={toggleSider} />
      <Sider siderVisible={siderVisible} />
      <div className={`content ${siderVisible ? 'content-with-sider' : ''}`}>
        <Routes>
          {/* Define your routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default App;