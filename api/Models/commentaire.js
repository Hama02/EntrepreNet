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
    status: {
      type: String,
      enum: ["active", "reported", "deleted"],
      default: "active",
    },
    reportReason: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
