import express from "express";
import {
  addOrders,
  getOrdersByUserId,
} from "../controllers/orders.controller.js";
const router = express.Router();

router.route("/").post(addOrders);

router.route("/get_orders/:userId").get(getOrdersByUserId);

export default router;
