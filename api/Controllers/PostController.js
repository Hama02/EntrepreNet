const Publication = require("../Models/publication");
const Report = require("../Models/report");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

exports.createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { title, description, domain, budget, type } = req.body;
    const newPost = new Publication({
      userId: req.user.id,
      title,
      description,
      picturePath: newPath,
      domain: domain || undefined,
      budget: budget || undefined,
      type,
    });
    await newPost.save();

    return res.status(201).json({
      status: "success",
      newPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "failed ", msg: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", msg: "Invalid ID" });
    }

    const { description, title, picturePath } = req.body;

    const updatedFields = {};
    if (description) updatedFields.description = description;
    if (title) updatedFields.title = title;
    if (picturePath) updatedFields.picturePath = picturePath;

    const updatedPost = await Publication.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ status: "failed", msg: "Post not found" });
    }

    return res.status(200).json({ status: "success", updatedPost });
  } catch (err) {
    return res.status(500).json({ status: "failed", msg: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", msg: "Invalid ID" });
    }

    await Publication.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ status: "success", msg: "Post deleted successfully." });
  } catch (err) {
    return res.status(409).json({ status: "failed", msg: err.message });
  }
};

exports.getFeedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { domain } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;
    let posts;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: "failed", msg: "Invalid ID" });
      }
      domain
        ? (posts = await Publication.find({ userId: id, domain }))
            .skip(offset)
            .limit(limit)
            .populate({
              path: "userId",
              select: "username profilePicture accountType",
            })
            .exec()
        : (posts = await Publication.find({
            userId: id,
          })
            .skip(offset)
            .limit(limit)
            .populate({
              path: "userId",
              select: "username profilePicture accountType",
            })
            .exec());
    } else {
      domain
        ? (posts = await Publication.find({ domain })
            .skip(offset)
            .limit(limit)
            .populate({
              path: "userId",
              select: "username profilePicture accountType",
            })
            .exec())
        : (posts = await Publication.find()
            .skip(offset)
            .limit(limit)
            .populate({
              path: "userId",
              select: "username profilePicture accountType",
            })
            .exec());
    }
    if (!posts) {
      return res.status(404).json({ status: "failed", msg: "User Not Found" });
    }

    const totalCount = await Publication.countDocuments();

    return res.status(200).json({
      status: "success",
      totalPosts: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      posts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "failed", msg: "Server Error" });
  }
};

exports.like = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Publication.findOneAndUpdate(
      { _id: postId, likedBy: { $ne: userId } },
      { $inc: { likes: 1 }, $push: { likedBy: userId } },
      { new: true }
    );
    if (!post) {
      return res
        .status(400)
        .json({ status: "failed", msg: "User has already liked the post" });
    }
    return res.status(200).json({ status: "success", post });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

exports.unlike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await Publication.findOneAndUpdate(
      { _id: postId, likedBy: userId },
      { $inc: { likes: -1 }, $pull: { likedBy: userId } },
      { new: true }
    );

    if (!post) {
      return res
        .status(400)
        .json({ status: "failed", msg: "User hasn't liked the post" });
    }

    if (post.likes < 0) {
      post.likes = 0;
      await post.save();
    }
    return res.status(200).json({ status: "success", post });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

exports.searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const decodedTitle = title.replace(/_/g, " ");
    const posts = await Publication.find({
      title: { $regex: decodedTitle, $options: "i" },
    }).limit(5);

    return res.status(200).json({ status: "success", posts });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const newReport = await Report.create({
      reportedBy: req.user.id,
      reportedUser: req.body.reportedUser,
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
