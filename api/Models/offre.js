const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", OfferSchema);
