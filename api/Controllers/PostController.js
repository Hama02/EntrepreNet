const Publication = require("../Models/publication");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const { title, description, picturePath } = req.body;
    const newPost = new Publication({
      userId: req.user.id,
      title,
      description,
      picturePath,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;
    let posts;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: "failed", msg: "Invalid ID" });
      }
      posts = await Publication.find({ userId: id })
        .skip(offset)
        .limit(limit)
        .exec();
    } else {
      posts = await Publication.find().skip(offset).limit(limit).exec();
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
