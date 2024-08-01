import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Error404 from "../pages/error/404/404";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};

export default PublicRoutes;
