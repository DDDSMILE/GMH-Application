import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters"],
      selected: false,
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

    verified: { type: Boolean, default: false },

    otp: {
      type: Number,
    },
    otp_expiry: {
      type: Date,
    },
    resetPasswordOtp: {
      type: Number,
    },
    resetPasswordOtpExpiry: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.index({ otp_expiry: 1, expireAfterSeconds: 0 });

export const UserModel = mongoose.model("User", userSchema);
