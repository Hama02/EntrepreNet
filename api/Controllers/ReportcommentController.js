const jwt = require("jsonwebtoken");
const Publication = require("../Models/Publication");
const Comment = require("../Models/Comment");

exports.reportComment = async (req, res) => {
  const { commentId } = req.params;
  const { reason } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "failed",
        msg: "Comment not found!",
      });
    }

    comment.status = "reported";
    comment.reportReason = reason;
    await comment.save();

    return res.status(200).json({
      status: "success",
      msg: "Comment reported successfully",
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
