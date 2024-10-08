const express = require("express");
const controller = require("../controllers/PlaylistController");
const verifyToken = require("../config/verifyToken");

const router = express.Router();

router.get("/:id", controller.getPlaylist);
router.get("/channel/:channelId", controller.getPlaylistsByChannelId);

router.post("/", verifyToken, controller.createPlaylist);
router.patch("/:id", verifyToken, controller.updatePlaylist);
router.delete("/:id", verifyToken, controller.deletePlaylist);

module.exports = router;
