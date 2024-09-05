const moongose = require("mongoose");

const VideoSchema = new moongose.VideoSchema(
  {
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createAt: { type: String, required: true },
    updateAt: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
