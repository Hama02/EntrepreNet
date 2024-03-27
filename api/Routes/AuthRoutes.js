const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  return res.status(200).json({
    status: "success",
  });
});
router.post("/login", async (req, res) => {
  return res.status(200).json({
    status: "success",
  });
});

module.exports = router;
