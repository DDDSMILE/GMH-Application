const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
    supplierId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dishes", dishesSchema);
