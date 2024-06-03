const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/AdminController");
const authController = require("../Controllers/AuthController");

router.use(authController.protect);

router.use(authController.restrictTo("Admin"));
router.get("/reports", adminController.getAllReports);
router.get("/users", adminController.getAllUsers);
router.get("/posts", adminController.getAllPosts);
router.delete("/users/:userId", adminController.deleteUser);
router.patch("/users/:userId/verify", adminController.verifyUser);
router.patch("/users/:userId/block", adminController.blockUser);
router.patch("/users/:userId/unblock", adminController.unblockUser);

module.exports = router;
