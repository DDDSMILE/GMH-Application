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
} from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

/* CRUD SHIPPERS */
router.route("/all_shippers").get(getAllShippers);

router.route("/get_shipper/:id").get(getShipper);

router.route("/delete_shipper/:id").delete(deleteShipper);

router.route("/create_shipper").post(createShipper);

router.route("/updated_shipper/:id").post(updateProfileShipper);

export default router;
