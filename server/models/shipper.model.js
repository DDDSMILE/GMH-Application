import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const shipperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters"],
      selected: false,
    },
    phone_number: {
      type: String,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    address: {
      type: String,
    },
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    resetPasswordOtp: {
      type: Number,
    },
    resetPasswordOtpExpiry: { type: Date },
  },
  { timestamps: true }
);

shipperSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

shipperSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

shipperSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const ShipperModel = mongoose.model("Shipper", shipperSchema);
