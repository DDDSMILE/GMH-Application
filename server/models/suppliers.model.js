import mongoose from "mongoose";

const SuppliersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    photo: {
      type: String,
    },
    open_time: {
      type: String
    }
  },
  { timestamps: true }
);

export const SuppliersModel = mongoose.model("Suppliers", SuppliersSchema);
