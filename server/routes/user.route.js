import express from "express";
import {
  answerChatGPT,
  changeAddress,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  verify,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/verify").post(isAuthenticated, verify);

router.route("/login").post(login);

router.route("/change_address").post(isAuthenticated, changeAddress);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/updateprofile").put(updateProfile);

router.route("/updatepassword").put(updatePassword);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

router.route("/chatgpt").post(answerChatGPT);

export default router;
