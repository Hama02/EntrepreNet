const mongoose = require("mongoose");

const AcceptedOfferSchema = mongoose.Schema(
  {
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    acceptedAt: {
      type: Date,
      default: Date.now,
    },
    agreedPrice: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcceptedOffer", AcceptedOfferSchema);
