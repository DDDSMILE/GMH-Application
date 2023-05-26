import express from "express";
import {
  acceptOrder,
  addOrders,
  doneOrder,
  getAllOrder,
  getOrderById,
  getOrdersByShipperId,
  getOrdersByUserId,
} from "../controllers/orders.controller.js";
const router = express.Router();

router.route("/").get(getAllOrder);

router.route("/create_orders").post(addOrders);

router.route("/user/:userId").get(getOrdersByUserId);

router.route("/shipper/:shipperId").get(getOrdersByShipperId);

router.route("/shipper/accept_order").post(acceptOrder);

router.route("/shipper/done_order").post(doneOrder);

router.route("/:id").get(getOrderById);

export default router;
