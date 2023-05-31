import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    shipperId: {
      type: String,
    },
    user: {
      type: Object,
    },
    shipper: {
      type: Object,
    },
    items: {
      type: Array,
    },
    total: {
      type: Number,
    },
    addresses: {
      user_address: {
        type: String,
      },
      shipper_address: {
        type: String,
      },
      suppliers_address: {
        type: Array,
      },
    },
    products: {
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
