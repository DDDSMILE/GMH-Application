import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    shipperId: {
      type: String,
    },
    items: {
      type: Array,
    },
    total: {
      type: Number,
    },
    addresses: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["Đang chờ", "Đang ship", "Thành công", "Bị hủy"],
      default: "Đang chờ",
    },
  },
  { timestamps: true }
);

export const OrdersModel = mongoose.model("Orders", OrdersSchema);
