const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
