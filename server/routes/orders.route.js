import express from "express";
import {
  addOrders,
  getOrdersByUserId,
} from "../controllers/orders.controller.js";
const router = express.Router();

router.route("/create_orders").post(addOrders);

router.route("/:userId").get(getOrdersByUserId);

export default router;
