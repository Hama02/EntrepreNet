const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Publication"
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" 
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true
    },
    isSender: {
      type: Boolean,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
