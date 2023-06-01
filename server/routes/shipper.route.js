import express from "express";
import {
  forgetPassword,
  getMyProfile,
  login,
  logout,
  resetPassword,
  updatePassword,
  updateProfile,
  changeAddress,
} from "../controllers/shipper.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/update_profile").put(updateProfile);

router.route("/update_password").put(updatePassword);

router.route("/forget_password").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

router.route("/change_address").put(changeAddress);

export default router;
