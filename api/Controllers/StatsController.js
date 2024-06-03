const User = require("../Models/User");
const Post = require("../Models/publication");
const mongoose = require("mongoose");

exports.getStats = async (req, res) => {
  try {
    const totalInvestors = await User.countDocuments({
      accountType: "Investisseur",
    });
    const totalEntrepreneurs = await User.countDocuments({
      accountType: "Entrepreneur",
    });
    const nbOfPosts = await Post.countDocuments();

    res.json({
      totalInvestors,
      totalEntrepreneurs,
      nbOfPosts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", msg: "An error occurred", error: err.message });
  }
};
