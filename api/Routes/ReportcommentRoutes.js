const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
const ReportCommentController = require("../Controllers/ReportcommentController");

router.post("/comment/:commentId/report", AuthController.protect, ReportCommentController.reportComment);

module.exports = router;
