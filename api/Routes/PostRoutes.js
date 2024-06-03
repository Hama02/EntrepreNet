const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PostController = require("../Controllers/PostController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.post(
  "/post",
  AuthController.protect,
  upload.single("file"),
  PostController.createPost
);
router.get("/search", AuthController.protect, PostController.searchByTitle);
router.post("/report", AuthController.protect, PostController.createReport);
router.put("/post/:id", AuthController.protect, PostController.updatePost);
router.get("/:id?", PostController.getFeedPosts);
router.delete("/post/:id", AuthController.protect, PostController.deletePost);
router.put("/:id/like", AuthController.protect, PostController.like);
router.put("/:id/unlike", AuthController.protect, PostController.unlike);
module.exports = router;
