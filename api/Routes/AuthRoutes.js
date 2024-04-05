const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/posts", AuthController.protect, (req, res) => {
  return res.status(200).json({
    msg: "this is protected route",
  });
});

module.exports = router;
