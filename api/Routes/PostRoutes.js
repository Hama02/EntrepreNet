const express = require("express");
const PostController = require("../Controllers/PostController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.post("/post", AuthController.protect, PostController.createPost);
router.put("/post/:id", AuthController.protect, PostController.updatePost);
router.get("/:id?", PostController.getFeedPosts);
router.delete("/post/:id", AuthController.protect, PostController.deletePost);
module.exports = router;
