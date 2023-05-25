import express from "express";
import {
  addOrders,
  getOrderById,
  getOrdersByUserId,
} from "../controllers/orders.controller.js";
const router = express.Router();

router.route("/create_orders").post(addOrders);

router.route("/user/:userId").get(getOrdersByUserId);

router.route("/:id").get(getOrderById);

export default router;
