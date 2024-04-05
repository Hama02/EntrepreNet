const mongoose = require("mongoose");

const ReactionSchema = mongoose.Schema(
  {
    publicationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Publication",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      enum: ["like", "love", "haha", "wow", "sad", "angry"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", ReactionSchema);
