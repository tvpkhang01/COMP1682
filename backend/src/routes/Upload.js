const express = require("express");
const {
  uploadImage,
  uploadAvatar,
  uploadVideo,
  uploadBanner,
} = require("../config/upload");
const verifyToken = require("../config/verifyToken");

const router = express.Router();

router.post("/image", verifyToken, uploadImage.single("file"), (req, res) => {
  res.status(200).json("Image uploaded.");
});

router.post("/avatar", verifyToken, uploadAvatar.single("file"), (req, res) => {
  res.status(200).json("Avatar uploaded.");
});

router.post("/video", verifyToken, uploadVideo.single("file"), (req, res) => {
  res.status(200).json("Video uploaded.");
});

router.post("/banner", verifyToken, uploadBanner.single("file"), (req, res) => {
  res.status(200).json("Banner uploaded.");
});

module.exports = router;
