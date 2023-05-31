import express from "express";
import {
  forgetPassword,
  getMyProfile,
  login,
  logout,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/shipper.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/updateprofile").put(isAuthenticated, updateProfile);

router.route("/updatepassword").put(isAuthenticated, updatePassword);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

export default router;
