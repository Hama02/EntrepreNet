const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
    userPicturePath: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", PublicationSchema);
