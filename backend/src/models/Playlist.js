const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    videos: { type: [String], default: [] },   
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
