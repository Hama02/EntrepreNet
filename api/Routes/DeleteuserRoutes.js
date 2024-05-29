const express = require("express");
const router = express.Router();
const DeleteUserController = require("../Controllers/DeleteuserController");
const AuthController = require("../Controllers/AuthController");

router.delete("/user/:userId", AuthController.protect, DeleteUserController.deleteUser);

module.exports = router;
