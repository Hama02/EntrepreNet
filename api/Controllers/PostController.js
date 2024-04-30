const Publication = require("../Models/publication");
const mongoose = require("mongoose");
const fs = require("fs");

exports.createPost = async (req, res) => {
  try {
    // const { originalname, picturePath } = req.file;
    // const parts = originalname.split(".");
    // const ext = parts[parts.length - 1];
    // const newPath = picturePath + "." + ext;
    // fs.renameSync(picturePath, newPath);
    const { title, description, domain } = req.body;
    const newPost = new Publication({
      userId: req.user.id,
      title,
      description,
      picturePath: "testPath",
      domain,
    });
    await newPost.save();

    return res.status(201).json({
      status: "success",
      newPost,
    });
  } catch (err) {
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
            .exec()
        : (posts = await Publication.find({
            userId: id,
          })
            .skip(offset)
            .limit(limit)
            .exec());
    } else {
      domain
        ? (posts = await Publication.find({ domain })
            .skip(offset)
            .limit(limit)
            .exec())
        : (posts = await Publication.find().skip(offset).limit(limit).exec());
    }
    if (!posts) {
      return res.status(404).json({ status: "failed", msg: "User Not Found" });
    }

    const totalCount = await Publication.countDocuments();

    return res.status(200).json({
      status: "success",
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
    const { title, limit } = req.query;
    const decodedTitle = title.replace(/_/g, " ");
    const posts = await Publication.find({
      title: { $regex: decodedTitle, $options: "i" },
    }).limit(parseInt(limit));

    return res.status(200).json({ status: "success", posts });
  } catch (error) {
    return res.status(500).json({ status: "failed", msg: error.message });
  }
};
