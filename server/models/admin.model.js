import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    resetPasswordOtp: {
      type: Number,
    },
    resetPasswordOtpExpiry: { type: Date },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model("Admin", adminSchema);
