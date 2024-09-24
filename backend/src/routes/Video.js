const express = require("express");
const controller = require("../controllers/VideoController");
const verifyToken = require("../config/verifyToken");

const router = express.Router();

router.get("/", controller.getVideos);
router.get("/:id", controller.getVideo);
router.get("/channel/:channelId", controller.getVideosByChannelId);

router.post("/", verifyToken, controller.createVideo);
router.delete("/:id", verifyToken, controller.deleteVideo);
router.patch("/:id", verifyToken, controller.updateVideo);
router.patch("/like/:id", verifyToken, controller.likeVideo);
router.patch("/dislike/:id", verifyToken, controller.dislikeVideo);

module.exports = router;
