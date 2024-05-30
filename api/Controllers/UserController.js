const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../Models/User");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", msg: "Invalid ID" });
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ status: "failed", msg: "User not found" });
    }
    return res.status(200).json({ status: "success", user });
  } catch (err) {
    return res.status(500).json({ status: "failed", err });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", msg: "Invalid ID" });
    }

    const { email, username } = req.body;
    const updatedFields = {};
    if (email) updatedFields.email = email;
    if (username) updatedFields.username = username;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      updatedFields.profilePicture = newPath;
    }
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ status: "failed", msg: "User not found" });
    }
    updatedUser.password = undefined;
    return res
      .status(200)
      .json({ status: "success", msg: "Updated Successfully!", updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "failed", err });
  }
};

exports.changePass = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(id);
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({
        status: "failed",
        msg: "Wrong Old Password!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();
    return res
      .status(200)
      .json({ status: "success", msg: "Password Updated!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "failed", err });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (req.user.id !== userId) {
      return res.status(403).json({
        status: "failed",
        msg: "You can only delete your own account!",
      });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        msg: "User not found!",
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ status: "failed", err });
  }
};
