const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");

module.exports = (app) => {
  app.use(express.static("assets"));
  app.use("/api/medias/covers", express.static(__dirname + "/assets/covers"));
  app.use(
    "/api/medias/profiles",
    express.static(__dirname + "/assets/profiles")
  );
  app.use("/api/medias/videos", express.static(__dirname + "/assets/videos"));
  
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
};
