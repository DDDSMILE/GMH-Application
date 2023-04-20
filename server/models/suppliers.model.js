import mongoose from "mongoose";

const SuppliersSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export const SuppliersModel = mongoose.model("Suppliers", SuppliersSchema);
