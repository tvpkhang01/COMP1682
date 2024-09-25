const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../asset/image");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../asset/avatar");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../asset/video");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "../asset/banner");
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadAvatar = multer({ storage: avatarStorage });
const uploadVideo = multer({ storage: videoStorage });
const uploadBanner = multer({ storage: bannerStorage });

module.exports = { uploadImage, uploadAvatar, uploadVideo, uploadBanner };
