const express = require("express");
const router = express.Router();
const UpdateController = require("../Controllers/UpdateController");
const AuthController = require("../Controllers/AuthController");

router.put("/user/:userId", AuthController.protect, UpdateController.updateUser);

module.exports = router;
