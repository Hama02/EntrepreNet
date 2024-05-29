const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");

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
