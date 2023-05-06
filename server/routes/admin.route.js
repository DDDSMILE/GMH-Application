import express from "express";
import {
  createShipper,
  forgetPassword,
  getAllShippers,
  login,
  logout,
  resetPassword,
  updateProfileShipper,
  getShipper,
  deleteShipper,
  updatedSuppliers,
  updatedDishes,
} from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

/* CRUD SHIPPERS */
router.route("/all_shippers").get(isAuthenticated, getAllShippers);

router.route("/get_shipper/:id").get(isAuthenticated, getShipper);

router.route("/delete_shipper/:id").delete(isAuthenticated, deleteShipper);

router.route("/create_shipper").post(isAuthenticated, createShipper);

router
  .route("/updated_shipper/:id")
  .post(isAuthenticated, updateProfileShipper);

/* UPDATE SUPPLIERS, DISHES */
router.route("/updated_suppliers").post(isAuthenticated, updatedSuppliers);

router.route("/updated_dishes").post(isAuthenticated, updatedDishes);

export default router;
