import { OrdersModel } from "../models/orders.model.js";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await OrdersModel.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addOrders = async (req, res) => {
  try {
    const { userId, items, total, products, addresses } = req.body;

    const data = await OrdersModel.create({
      userId,
      items,
      total,
      products,
      addresses,
    });
    res.status(200).json({ success: true, message: data });
  } catch (error) {
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
    const shipperId = req.body.shipperId;
    const orderId = req.body.orderId;
    const order = await OrdersModel.findOne({ _id: orderId });
    order.status = "Đang ship";
    order.shipperId = shipperId;
    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
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
