import { OrdersModel } from "../models/orders.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await OrdersModel.find({ status: "Đang chờ" });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addOrders = async (req, res) => {
  try {
    const { userId, items, total, products, addresses } = req.body;

    const user = await UserModel.findById({ _id: userId });
    const data = await OrdersModel.create({
      userId,
      items,
      total,
      products,
      addresses,
      user: user,
      shipperId: "",
      shipper: {},
    });
    res.status(200).json({ success: true, message: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await OrdersModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrdersByShipperId = async (req, res) => {
  try {
    const shipperId = req.params.shipperId;
    const orders = await OrdersModel.find({ shipperId: shipperId }).sort({
      updatedAt: -1,
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orders = await OrdersModel.find({ _id: orderId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { _id, shipper, shipperId, addresses } = req.body.order;
    const order = await OrdersModel.findOne({ _id: _id });

    order.status = "Đang ship";
    if (shipper) order.shipper = shipper;
    if (shipperId) order.shipperId = shipperId;
    if (addresses) order.addresses = addresses;

    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const doneOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const order = await OrdersModel.findOne({ _id: orderId });
    order.status = "Thành công";
    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
