const Comment = require("../Models/commentaire");
const Publication = require("../Models/publication");

exports.addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const userId = req.user.id;

    const comment = await Comment.create({
      content,
      user: userId,
      post: postId,
    });

    await Publication.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    res.status(201).json({ status: "success", comment });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { post_id } = req.query;
    const comments = await Comment.find({ post: post_id })
      .populate("user")
      .populate("post");

    res.status(200).json({ status: "success", comments });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ status: "error", message: "Comment not found" });
    }

    await Publication.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ status: "success", message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
