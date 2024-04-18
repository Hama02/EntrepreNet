const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/OfferController");
const PostController = require("../Controllers/PostController");
const AuthController = require("../Controllers/AuthController");

router.post("/acceptOffer", OfferController.acceptOffer);
router.post("/suggestNegotiation", OfferController.suggestNegotiation);

module.exports = router;