const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    channelId: { type: String, require: true },
    videoId: { type: String, require: true },
    description: { type: String, require: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
