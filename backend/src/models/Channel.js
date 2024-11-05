const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    bannerUrl: { type: String },
    description: { type: String },
    subscribers: { type: [String] },
    subscriptions: { type: [String] },
    videos: { type: [String] },
    playlists: { type: [String] },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", ChannelSchema);

module.exports = Channel;
