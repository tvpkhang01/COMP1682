const Channel = require("../models/Channel");
const Playlist = require("../models/Playlist");
const Video = require("../models/Video");
const bcrypt = require("bcryptjs");

const getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find({
      admin: false,
    });
    let l_channels = [];
    for (const l_channel of channels) {
      const { createdAt, updatedAt, password, ...channel } = l_channel._doc;
      l_channels.push(channel);
    }
    res.status(200).json(l_channels);
  } catch (error) {
    next(error);
  }
};

const getChannel = async (req, res, next) => {
  try {
    const l_channel = await Channel.findById(req.params.id);
    const { createdAt, updatedAt, password, ...channel } = l_channel._doc;
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};

const updateChannel = async (req, res, next) => {
  if (req.params.id === req.channel.id) {
    try {
      if (req.body.password) {
        const hashPassword = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10)
        );
        req.body.password = hashPassword;
      }
      const updatedChannel = await Channel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { createdAt, updatedAt, password, ...channel } =
        updatedChannel._doc;
      res.status(200).json(channel);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json({ message: "Cannot edit other channel" });
  }
};

const subscribeChannel = async (req, res, next) => {
  try {
    await Channel.findByIdAndUpdate(
      req.channel.id,
      { $push: { subscriptions: req.params.id } },
      { new: true }
    );
    await Channel.findByIdAndUpdate(
      req.params.id,
      { $push: { subscribers: req.channel.id } },
      { new: true }
    );
    res.status(200).json("Subcription successfully");
  } catch (error) {
    next(error);
  }
};

const unsubscribeChannel = async (req, res, next) => {
  try {
    await Channel.findByIdAndUpdate(
      req.channel.id,
      {
        $pull: { subscriptions: req.params.id },
      },
      { new: true }
    );
    await Channel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { subscribers: req.channel.id },
      },
      { new: true }
    );
    res.status(200).json("Unsubcription successfully");
  } catch (error) {
    next(error);
  }
};

const addCoin = async (req, res, next) => {
  try {
    await Channel.findByIdAndUpdate(
      req.channel.id,
      { $inc: { coins: 100 } },
      { new: true }
    );
    res.status(200).json("Add coin successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const donateCoin = async (req, res, next) => {
  try {
    await Channel.findByIdAndUpdate(
      req.params.id,
      { $inc: { coins: 100 } },
      { new: true }
    );
    await Channel.findByIdAndUpdate(
      req.channel.id,
      { $inc: { coins: -100 } },
      { new: true }
    );
    res.status(200).json("Donate coin successfully");
  } catch (error) {
    next(error);
  }
};

const deleteChannel = async (req, res, next) => {
  if (req.channel.admin === true) {
    try {
      const l_videos = await Video.find({
        channelId: req.params.id,
      });
      for (const l_video of l_videos) {
        await Video.findByIdAndDelete(l_video._id);
      }
      const l_playlists = await Playlist.find({
        channelId: req.params.id,
      });
      for (const l_playlist of l_playlists) {
        await Playlist.findByIdAndDelete(l_playlist._id);
      }
      const l_subscribers = await Channel.find({
        subscribers: req.params.id,
      });
      for (const l_subscriber of l_subscribers) {
        await Channel.findByIdAndUpdate(l_subscriber._id, {
          $pull: { subscribers: req.params.id },
        });
      }
      await Channel.findByIdAndDelete(req.params.id);
      res.status(200).json("Channel deleted successfully");
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json({ message: "Cannot delete other channel" });
  }
};

module.exports = {
  getChannels,
  getChannel,
  updateChannel,
  subscribeChannel,
  unsubscribeChannel,
  deleteChannel,
  addCoin,
  donateCoin,
};
