const mongoose = require("mongoose");

const ForumSchema = mongoose.Schema(
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
    publications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forum", ForumSchema);
