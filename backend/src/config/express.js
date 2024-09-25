const express = require("express");

module.exports = (app) => {
  app.use(express.static("asset"));
  app.use(express.json());
  app.use("/media/image", express.static(__dirname + "/asset/image"));
  app.use("/media/avatar", express.static(__dirname + "/asset/avatar"));
  app.use("/media/video", express.static(__dirname + "/asset/video"));
  app.use("/media/banner", express.static(__dirname + "/asset/banner"));
};
