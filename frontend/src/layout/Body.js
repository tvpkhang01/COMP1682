import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
const Body = () => {
  return (
    <div className="Main">
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Body;
