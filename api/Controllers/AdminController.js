const User = require("../Models/User");
const Post = require("../Models/publication");
const report = require("../Models/report");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId");
    return res.status(200).json({
      status: "success",
      results: posts.length,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { status: "verified" });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { status: "blocked" });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, {
      status: "notVerified",
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reportedUsers = await report.aggregate([
      {
        $group: {
          _id: "$reportedUser",
          reportCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "reportedUser",
        },
      },
      {
        $unwind: "$reportedUser",
      },
      {
        $project: {
          _id: 0,
          reportedUserId: "$reportedUser._id",
          reportedUserName: "$reportedUser.username",
          reportedUserStatus: "$reportedUser.status",
          reportCount: 1,
        },
      },
    ]);

    return res.status(200).json({ reportedUsers });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
