const mongoose = require("mongoose");
const Post = require("./publication");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    accountType: {
      type: String,
      enum: ["Admin", "Investisseur", "Entrepreneur"],
      required: true,
    },
    profilePicture: {
      type: String,
      default: "uploads/profile.jpg",
    },
    status: {
      type: String,
      enum: ["notVerified", "verified", "blocked"],
      default: "notVerified",
    },
    reportCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()["_id"];
  await Post.deleteMany({ userId });
  next();
});

module.exports = mongoose.model("User", UserSchema);
