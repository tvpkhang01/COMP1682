const Channel = require("../models/Channel");

const updateChannel = async (req, res, next) => {
  if (req.params.id === req.channel.id) {
    try {
      const updatedChannel = await Channel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { createdAt, updatedAt, password, ...channel } = updatedChannel._doc;
      res.status(200).json(channel);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json({ message: "Cannot edit other channel" });
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
    await Channel.findByIdAndUpdate(req.channel.id, {
      $pull: { subscriptions: req.params.id },
    });
    await Channel.findByIdAndUpdate(req.params.id, {
      $pull: { subscribers: req.channel.id },
    });
    res.status(200).json("Unsubcription successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateChannel,
  getChannel,
  subscribeChannel,
  unsubscribeChannel,
};
