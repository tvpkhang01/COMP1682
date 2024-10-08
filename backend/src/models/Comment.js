const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    channelId: { type: String, require: true },
    videoId: { type: String, require: true },
    text: { type: String, require: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    replies: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
