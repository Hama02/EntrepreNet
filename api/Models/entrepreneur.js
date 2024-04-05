const mongoose = require("mongoose");

const EntrepreneurSchema = mongoose.Schema(
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entrepreneur", EntrepreneurSchema);
