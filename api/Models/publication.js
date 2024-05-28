const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    picturePath: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    domain: {
      type: String,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    budget: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["offre", "post"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", PublicationSchema);
