const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const UserController = require("../Controllers/UserController");
const AuthController = require("../Controllers/AuthController");

router.get("/profile/:id", UserController.getProfile);
router.post(
  "/update/:id",
  AuthController.protect,
  upload.single("file"),
  UserController.updateProfile
);
router.put(
  "/changePass/:id",
  AuthController.protect,
  UserController.changePass
);
module.exports = router;
