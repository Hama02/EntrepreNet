const express = require("express");
const MessageController = require("../controllers/messageController.js");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.get("/:id", AuthController.protect, MessageController.getMessages);
router.post("/send/:id", AuthController.protect, MessageController.sendMessage);

module.exports = router;
