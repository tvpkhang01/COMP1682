const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    videoUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
