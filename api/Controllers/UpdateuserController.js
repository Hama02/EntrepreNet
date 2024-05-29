const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, accountType, profilePicture, status } = req.body;

  try {
    if (req.user.id !== userId) {
      return res.status(403).json({
        status: "failed",
        msg: "You can only update your own account!",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        msg: "User not found!",
      });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (accountType) user.accountType = accountType;
    if (profilePicture) user.profilePicture = profilePicture;
    if (status) user.status = status;

    await user.save();
    user.password = undefined;

    return res.status(200).json({
      status: "success",
      msg: "User updated successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({ status: "failed", err });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", msg: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "failed", msg: "Failed to authenticate token." });
    }
    req.user = decoded;
    next();
  });
};
