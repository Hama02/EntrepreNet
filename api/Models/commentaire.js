const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    publicationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Publication'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    content: {
      type: String,
      required: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
