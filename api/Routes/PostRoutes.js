const express = require("express");
const PostController = require("../Controllers/PostController");

const router = express.Router();

router.post("/posts", PostController.createPost);
router.post("/posts", PostController.updatePost);
router.get("/posts", PostController.getFeedPosts);
router.get("/:userId/posts", PostController.getUserPosts);

module.exports = router;
