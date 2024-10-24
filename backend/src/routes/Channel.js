const express = require("express");
const controller = require("../controllers/ChannelController");
const verifyToken = require("../config/verifyToken");

const router = express.Router();

router.get("/", controller.getChannels);
router.get("/:id", controller.getChannel);
router.patch("/:id", verifyToken, controller.updateChannel);
router.patch("/subscribe/:id", verifyToken, controller.subscribeChannel);
router.patch("/unsubscribe/:id", verifyToken, controller.unsubscribeChannel);
router.delete("/:id", verifyToken, controller.deleteChannel);

module.exports = router;
