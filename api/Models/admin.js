const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    receiveNotifications: {
      type: Boolean,
      default: true
    },
    canDeletePublication: {
      type: Boolean,
      default: true
    },
    canBlockUser: {
      type: Boolean,
      default: true
    },
    canVerifyUser: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
