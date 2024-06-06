const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");
const OfferController = require("../Controllers/OfferController");

router.post(
  "/acceptOffer/:id",
  AuthController.protect,
  OfferController.acceptOffer
);

module.exports = router;
