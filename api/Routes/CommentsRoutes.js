const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
const CommentController = require("../Controllers/CommentController");

router.post("/create", AuthController.protect, CommentController.addComment);
router.get("/", CommentController.getCommentsByPost);
router.delete(
  "/:commentId/:postId",
  AuthController.protect,
  CommentController.deleteComment
);

module.exports = router;
